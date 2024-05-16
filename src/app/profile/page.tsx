"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { useState } from "react";

interface PrfileOmit {
  name: string;
  email: string;
  avatar: string;
}

export default function Home() {
  const [profile, setProfile] = useState({} as PrfileOmit);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("auth/profile/");
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <header className="h-[70px] bg-[#ffffff] flex justify-end items-center fixed w-full">
        <Link
          href={"/api/logout"}
          className="w-[272px] h-[44px] bg-[#02274F] mr-[34px] rounded-[6.33px] flex items-center justify-center text-white font-bold text-base"
        >
          Logout
        </Link>
      </header>
      <main className="flex min-h-screen items-center justify-center bg-[#f1f5f9]">
        <section className="shadow-[0px_2px_10px_0px_#0000001A] w-[356px] h-[315px] rounded-[16px] flex items-center flex-col">
          <h2 className="text-center mt-7 mb-2 font-semibold text-xs text-[#2F2F2F]">Profile picture</h2>
          <Image
            src={profile.avatar || ""}
            alt="Profile picture"
            width={58}
            height={56}
            className="rounded-[8px] w-[58px] h-[56px] mb-7"
          />
        </section>
      </main>
    </>
  );
}
