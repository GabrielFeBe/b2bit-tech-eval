'use client'
import { useRouter } from "next/navigation";
import { LoginCard } from "./components/LoginCard";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/profile");
    }
  }, [router]);
  return (
    <main className="flex min-h-screen items-center justify-center">
      
      <LoginCard />

    </main>
  );
}
