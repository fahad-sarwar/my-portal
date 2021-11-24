import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";

const Nav = () => {
  const [session, loading] = useSession();

  return (
    <header className="bg-white">
      <nav className="p-2 flex flex-row md:container md:mx-auto">
        <div className="pl-6">
          <Link href="/">
            <a>
              <Image
                src="/images/zen-logo.png"
                alt="Zen Internet"
                width={64}
                height={64}
              />
            </a>
          </Link>
        </div>
        <div className="flex-1 flex justify-end">

          <Link href="/orders">
            <a className="m-5">Orders</a>
          </Link>

          <Link href="/services">
            <a className="m-5">Services</a>
          </Link>
          
          <Link href="/bills">
            <a className="m-5">Bills</a>
          </Link>

          {session ? (
            <Link href="#">
              <a className="m-5" onClick={() => signOut()}>
                Sign out
              </a>
            </Link>
          ) : (
            <Link href="#">
              <a className="m-5" onClick={() => signIn()}>
                Sign in
              </a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
