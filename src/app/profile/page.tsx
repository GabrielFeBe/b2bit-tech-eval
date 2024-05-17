"use client";
import { useEffect } from "react";
import Image from "next/image";
import api from "@/lib/api";
import { useState } from "react";
import { ProfileTextBox } from "../components/ProfileTextBox";
import { useRouter } from "next/navigation";
import profileDefault from "../assets/profileDefault.jpg";

interface PrfileOmit {
  name: string;
  email: string;
  avatar: string;
}

export default function Home() {
  const [profile, setProfile] = useState({} as PrfileOmit);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("auth/profile/");
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <header className="h-[70px] bg-[#ffffff] flex justify-end items-center fixed w-full">
        <button
          onClick={logout}
          data-testid="logout-button"
          className="w-[272px] h-[44px] bg-[#02274F] mr-[34px] rounded-[6.33px] flex items-center justify-center text-white font-bold text-base"
        >
          Logout
        </button>
      </header>
      <main className="flex min-h-screen items-center justify-center bg-[#f1f5f9]">
        <section className="shadow-[0px_2px_10px_0px_#0000001A] w-[356px] h-[330px] rounded-[16px] flex items-center flex-col bg-[#fdfdfd]">
          <h2 className="text-center mt-7 mb-2 font-semibold text-xs text-[#2F2F2F]">
            Profile picture
          </h2>
          {/* Vou estar usando img só para garantir que a imagem vai carregar, sem precisar alterar o next.config */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar || profileDefault.src}
            alt="Profile picture"
            className="rounded-[8px] w-[58px] h-[56px] mb-7"
            data-testid="avatar"
          />
          {/* <Image
            src={profile.avatar || ""}
            alt="Profile picture"
            width={58}
            height={56}
            className="rounded-[8px] w-[58px] h-[56px] mb-7"
          /> */}
          <ProfileTextBox
            text="Your"
            boldText="Name"
            contentText={profile.name}
            data_testid="name"
          />
          <ProfileTextBox
            text="Your"
            boldText="E-mail"
            contentText={profile.email}
            divPosition="mt-5"
            data_testid="email"
          />
        </section>
      </main>
    </>
  );
}
