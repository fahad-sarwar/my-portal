import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { redirect } from "next/dist/server/api-utils";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";

async function refreshAccessToken(token) {
  try {
    const AUTH_BASE_URL = `https://${process.env.AUTHENTICATION_SERVER}`;

    const client = axios.create({
      baseURL: AUTH_BASE_URL,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const requestData = {
      client_id: process.env.AUTHENTICATION_CLIENT,
      client_secret: process.env.AUTHENTICATION_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
      scope: process.env.AUTHENTICATION_SCOPE,
    };

    const response = await client.post(
      "/connect/token",
      qs.stringify(requestData)
    );
    const refreshedTokens = await response.data;

    console.log(`status: ${response.status}`);

    if (response.status !== 200) {
      log.error("REFRESH TOKEN ERROR", refreshedTokens);
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log("ID SERVER REFRESH TOKEN ERROR", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    Providers.IdentityServer4({
      id: "oidc",
      name: "OpenIdConnect",
      issuer: process.env.AUTHENTICATION_SERVER,
      domain: process.env.AUTHENTICATION_SERVER,
      clientId: process.env.AUTHENTICATION_CLIENT,
      clientSecret: process.env.AUTHENTICATION_SECRET,
      scope: process.env.AUTHENTICATION_SCOPE,
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async signIn(
      user,
      account,
      profile,
      session,
      accessToken,
      refreshToken,
      params,
      req,
      res
    ) {
      console.log(`signIn: user='${user}'`);
      // Do something with the user
      // For example, store the user ID in the session
      session.userId = user.id;
      // Or if you want to keep the user's email address,
      // you can store it in the session
      session.email = user.email;
      return true;
    },
    async redirect(url, req, res) {
      console.log(`redirect: url='${url}'`);
      return url;
    },
    async session(session, token) {
      console.log(`session: sessionInfo='${session}'`);
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      session.environment = process.env.NEXT_PUBLIC_ENV;

      return Promise.resolve(session);
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log(`jwt: token='${token}'`);
      console.log(`jwt: user='${user}'`);

      if (account) {
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
        token.expires = Date.now() + account.expiresIn * 1000;
      }

      if (Date.now() < +token.expires) {
        console.log("Token date valid.");
        return token;
      }

      console.log("Token expired");
      return refreshAccessToken(token);
    },
  },
  events: {
    async signIn() {
      console.log("nextauth.signIn (event)");
    },
    async signOut() {
        console.log("nextauth.signOut (event)");
    },
    async createUser() {
        console.log("nextauth.createUser (event)");
    },
    async linkAccount() {
        console.log("nextauth.linkAccount (event)");
    },
    async session(session) {
        console.log({ username: session?.user?.name }, "nextauth.session (event)");
    },
    async error(err) {
        console.log(err, "NEXTJS EVENT ERROR CAPTURE");
    },
  },
  debug: true
});