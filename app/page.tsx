"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [written, setWritten] = useState({
    uber: false,
    ola: false,
    rapido: false,
  });
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const savedState = localStorage.getItem("writtenState");
      if (savedState) {
        setWritten(JSON.parse(savedState));
      }
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem("writtenState", JSON.stringify(written));
    }
  }, [written]);

  const handleClick = (service: "uber" | "ola" | "rapido") => {
    if (written[service]) return;
    setTimeout(() => {
      setWritten((prev) => ({ ...prev, [service]: true }));
    }, 3000);
  };

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>

      <div className="p-8 bg-white rounded-lg shadow-lg flex flex-col gap-5 w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Welcome</h1>

        <Link
          href={written.uber ? "#" : "/connect-uber"}
          onClick={() => handleClick("uber")}
          className={`w-full ${
            written.uber
              ? "bg-gray-800 hover:cursor-not-allowed pointer-events-auto"
              : "bg-black hover:bg-gray-900"
          } text-center text-white py-2 rounded-md`}
        >
          {written.uber ? "Connected to Uber" : "Connect to Uber"}
        </Link>

        <Link
          href={written.ola ? "#" : "/connect-ola"}
          onClick={() => handleClick("ola")}
          className={`w-full ${
            written.ola
              ? "bg-yellow-500 hover:cursor-not-allowed pointer-events-auto"
              : "bg-yellow-400 hover:bg-yellow-500"
          } text-center border-[5px] border-gray-700 text-black py-2 rounded-lg`}
        >
          {written.ola ? "Connected to Ola" : "Connect to Ola"}
        </Link>

        <Link
          href={written.rapido ? "#" : "/connect-rapido"}
          onClick={() => handleClick("rapido")}
          className={`w-full ${
            written.rapido
              ? "bg-yellow-500 hover:cursor-not-allowed pointer-events-auto"
              : "bg-yellow-500 hover:bg-yellow-400 "
          } text-center text-black border-[2px] border-yellow-600 py-2 rounded-md`}
        >
          {written.rapido ? "Connected to Rapido" : "Connect to Rapido"}
        </Link>

        <Link
          href={"/booking"}
          className={`${
            written.ola && written.rapido && written.uber ? "block" : "hidden"
          }`}
        >
          <button className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg">
            Let's Book a Ride
          </button>
        </Link>
      </div>
    </div>
  );
}
