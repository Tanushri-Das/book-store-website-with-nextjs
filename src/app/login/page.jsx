"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialSignin from "@/components/shared/SocialSignin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);
    if (res.status === 200) {
      e.target.reset();
      toast.success("Login successfully");
      router.push("/");
    }
  };
  return (
    <div className="container mx-auto p-24">
      <div className="grid grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/assets/images/login/login.svg"
            width="460"
            height="502"
            alt="login-img"
          />
        </div>
        <div className="border-2 w-full max-w-xl mx-auto flex flex-col items-center justify-center p-8">
          <h2 className="font-semibold text-[40px] mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block font-semibold text-[18px]"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="your email"
                className="input input-bordered w-full mt-2"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block font-semibold text-[18px]"
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                placeholder="your password"
                className="input input-bordered w-full mt-2"
              />
            </div>
            <button className="btn btn-primary font-semibold text-[20px] text-white w-full">
              Sign In
            </button>
            <h3 className="text-[#444444] text-center my-5">Or Sign In with</h3>
            <SocialSignin />
            <p className="text-lg text-[#737373] text-center">
              Have an account?{" "}
              <Link href="/signup" className="text-primary">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
