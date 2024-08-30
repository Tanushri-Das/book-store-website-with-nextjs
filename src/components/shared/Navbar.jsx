"use client";
import React from "react";
import Link from "next/link";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  console.log(session);
  return (
    <div className="bg-base-100 text-slate-900 border-b-[1px] px-10 py-2">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <Link href={"/"}>
            <Image alt="logo" src="/assets/logo.svg" height={60} width={100} />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                className="font-semibold hover:text-primary duration-300"
                href={item.path}
                key={item.path}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex space-x-3 items-center">
            <IoCartOutline className="text-xl" />
            <IoSearchSharp className="text-xl" />
            {session?.status === "loading" && <h6>Loading....</h6>}
            {session?.status === "unauthenticated" && (
              <Link href="/login">
                <button className="btn border border-primary font-semibold text-lg text-primary">
                  Login
                </button>
              </Link>
            )}
            {session?.status === "authenticated" && (
              <button
                onClick={() => signOut()}
                className="btn border border-primary font-semibold text-lg text-primary"
              >
                LogOut
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "MyBookings",
    path: "/my-bookings",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contacts",
    path: "/contacts",
  },
];
export default Navbar;
