import { useSession, signIn, signOut } from "next-auth/client";
import Head from "next/head";

const Index = () => {
  const [session, loading] = useSession();

  if (loading) return null;

  if (session) {
    console.log(session);

    return (
      <div>
        <Head>
          <title>My Portal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Welcome {session.user.name}</h1>
        <div>Access Token: {session.accessToken}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>My Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default Index;
