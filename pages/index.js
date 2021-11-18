import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/client";

const Index = () => {
  const [session, loading] = useSession();

  if (loading) return null;

  if(session) {
    <div>
      <Head>
        <title>My Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome {session.user.name}</h1>
    </div>
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
}

export default Index;