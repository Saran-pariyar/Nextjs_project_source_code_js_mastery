"use client";

//import all useful things
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;

  //created state
  const [providers, setProviders] = useState(null);

  //this code is for auth
  useEffect(() => {
    const setProviders = async () => {
      //we get getProviders() from the next-auth import
      const response = await getProviders();
      setProviders(response);
    };
    setProviders();
  },[]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* this link will redirect to home  */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>

        {/* Desktop Navigation  */}
        <div className="sm:flex hidden">
          {isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                  // src={session?.user.image}
                  src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
            {
              providers && Object.values(providers).map((provider)=>(
                <button
                type="button"
                key={provider.name}
                onClick={()=>signIn(provider)}
                className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
            </>
          )}
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
