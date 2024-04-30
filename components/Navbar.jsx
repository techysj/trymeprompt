"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const mobMenu = useRef(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const closeOpenMenus = (e) => {
    if (showMenu && !mobMenu.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };
  if (typeof window !== "undefined") {
    document.addEventListener("mousedown", closeOpenMenus);
  }

  return (
    <div className="flex-between w-full mb-10 sm:mb-16 p-4 shadow-sm items-center">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="text-base uppercase font-medium">Try Me prompt</p>
      </Link>

      {/* Desktop Nvigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 items-center">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>
            <button
              className="outline_btn"
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              Sign Out
            </button>
            <Image
              src={session.user.image}
              alt="user"
              width={35}
              height={35}
              className="rounded-full"
            />
            <Link href="/profile" className="dropdown_link">
              My Profile
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex justify-end">
        {session?.user ? (
          <>
            <Image
              src="/assets/icons/menu.svg"
              width={20}
              height={20}
              alt="menu"
              onClick={() => setShowMenu((prev) => !prev)}
            />

            <div className="flex relative" ref={mobMenu}>
              {showMenu && (
                <div className="dropdown shadow-md z-20">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={session.user.image}
                      alt="user"
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setShowMenu(false)}
                    >
                      My Profile
                    </Link>
                  </div>
                  <Link
                    href="/create-post"
                    className="black_btn"
                    onClick={() => setShowMenu(false)}
                  >
                    Create Post
                  </Link>
                  <button
                    className="outline_btn"
                    onClick={() => {
                      setShowMenu(false);
                      signOut({ callbackUrl: "/", redirect: true });
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
