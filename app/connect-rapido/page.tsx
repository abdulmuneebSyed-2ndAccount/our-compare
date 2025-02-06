"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import rapido from "@/public/rapido.png"
export default function ConnectRapido() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem(
        "writtenState",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("writtenState") || "{}"),
          rapido: true,
        })
      );
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <Image
        src={rapido}
        width={100}
        height={100}
        alt="Rapido Logo"
      />
      <h1 className="text-2xl mt-4">
        {loading ? "Connecting to Rapido..." : "Connected to Rapido!"}
      </h1>
      {loading && (
        <div className="mt-5 animate-spin w-8 h-8 border-t-2 border-black rounded-full"></div>
      )}
    </div>
  );
}
