"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa6";

const SocialSignin = () => {
  const router = useRouter();
  const session = useSession();
  
  const handleSocialLogin = async (provider) => {
    const res = await signIn(provider, {
      redirect: false,
    });
  };
  if (session.status === "authenticated") {
    router.push("/");
  }
  return (
    <div className="flex justify-center items-center space-x-4 mb-8">
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex justify-center items-center bg-[#F5F5F8] rounded-full w-[65px] h-[65px]"
      >
        <FaGoogle className="text-[#3B5998] text-[20px]" />
      </button>
    </div>
  );
};

export default SocialSignin;
