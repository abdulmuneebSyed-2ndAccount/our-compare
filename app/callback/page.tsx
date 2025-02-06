// app/callback/page.js (or pages/callback.js depending on your Next.js setup)
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
    const router =useRouter()
  useEffect(() => {
  const fetchAccessToken = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        throw new Error("Authorization code missing");
      }

      const response = await fetch("/api/get-access-token", { ... });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Token exchange failed");
      }

      localStorage.setItem("access_token", data.access_token);
      router.push("/booking");
    } catch (error) {
      console.error("OAuth Error:", error);
      router.push("/error"); // Redirect to an error page
    }
  };

  fetchAccessToken();
}, []);

  return <div>Loading...</div>;
}
