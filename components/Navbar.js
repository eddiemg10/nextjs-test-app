import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  //useSession is a next-auth hook that can be used to globally access the session. To use it, wrap __app
  //with <SessionProvider />
  const { data: session, status } = useSession();

  // console.log({ session, status });
  return (
    <div className="fixed h-[50px] mb-10 w-[100%] text-white bg-red-400 items-center flex gap-x-11 justify-end pr-11">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/comments">
        <a>Comments</a>
      </Link>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
      {status !== "loading" && !session && (
        <Link href="/api/auth/signin">
          <a
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            SIGN IN
          </a>
        </Link>
      )}

      {status === "authenticated" && (
        <>
          <Link href="/api/auth/signout">
            <a
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              SIGN OUT
            </a>
          </Link>

          <div className="flex space-x-5 items-center">
            <p className="font-black">{session.user.name}</p>
            <img
              src={session.user.image}
              className="object-contain w-[40px] h-[40px] rounded-full"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
