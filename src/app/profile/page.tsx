import Link from "next/link";
import { Profile } from "../components/Profile";

export default async function Home() {
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

      <Profile/>
      </main>
    </>
  );
}
