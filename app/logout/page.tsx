"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import uber from "@/public/download.png";
import ola from "@/public/ola.png";
import rapido from "@/public/rapido.png";
import Image from "next/image";
export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.clear();
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-64 overflow-hidden relative">
        <div className="flex animate-slider">
          <Image
            src={rapido}
            alt="Rapido Logo"
            className="w-16 h-16 mx-2 object-contain"
          />
          <Image
            src={ola}
            alt="Ola Logo"
            className="w-16 h-16 mx-2 object-contain"
          />
          <Image
            src={uber}
            alt="Uber Logo"
            className="w-16 h-16 mx-2 object-contain"
          />
          {/* Repeat logos to create a continuous sliding effect */}
          <Image
            src={rapido}
            alt="Rapido Logo"
            className="w-16 h-16 mx-2 object-contain"
          />
          <Image
            src={ola}
            alt="Ola Logo"
            className="w-16 h-16 mx-2 object-contain"
          />
          <Image
            src={uber}
            alt="Uber Logo"
            className="w-16 h-16 mx-2 object-contain"
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold animate-pulse mb-8">Logging Out...</h1>
      {/* Custom keyframes for the slider animation */}
      <style jsx>{`
        @keyframes slider {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slider {
          animation: slider 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
