'use client'
import Image from "next/image";
import { Input } from "./Input";
import logo from "../assets/logo.svg";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export function LoginCard() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries = Object.fromEntries(data.entries());
    try {
      const {data} = await api.post("auth/login/", entries);
      localStorage.setItem("token", data.tokens.access);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className=" w-[438px] h-[534px] rounded-[18px] shadow-[0px_0px_64px_0px_#00000040] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mt-14 mb-[34.87px]">
        <Image
          className="w-80 h-[94px]"
          src={logo}
          width={400}
          height={400}
          alt="b2bit logo"
        ></Image>
      </h1>
      <form className="flex flex-col items-center justify-center gap-7" onSubmit={handleSubmit}>
        <Input
          label="E-mail"
          classLabel="gap-[9px] font-bold text-lg"
          className="w-[385.88px] h-[54.25] rounded-[9px] p-[18px_18px_20.25px_18px] bg-[#f1f1f1] text-base font-normal"
          placeholder="@gmail.com"
          type="text"
          name="email"
        />
        <Input
          label="Password"
          classLabel="gap-[9px] font-bold text-lg"
          className="w-[385.88px] h-[54.25] rounded-[9px] p-[18px_18px_20.25px_18px] bg-[#f1f1f1] text-base font-normal"
          placeholder="*****************"
          type="password"
          name="password"
        />
        <button className="w-[385.88px] h-[54px] bg-[#02274F] text-[#FAFAFA] font-bold flex justify-center items-center text-lg rounded-[9px]">
          Sign In
        </button>
      </form>
    </section>
  );
}
