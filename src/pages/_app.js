import React from "react";
import { Provider } from "next-auth/client";
import { HelmetProvider } from "react-helmet-async";
import Head from "next/head";
import ThemeConfig from "../theme";
import GlobalStyles from "../theme/globalStyles";
import NavBar from "../components/nav-bar";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ThemeConfig>
        <HelmetProvider>
          <div>
            <Head>
              <title>My Portal</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar />

            <GlobalStyles />
            <Component {...pageProps} />
          </div>
        </HelmetProvider>
      </ThemeConfig>
    </Provider>
  );
}
