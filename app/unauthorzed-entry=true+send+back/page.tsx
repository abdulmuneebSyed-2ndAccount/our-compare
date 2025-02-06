"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NotAuthenticatedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Update the countdown each second
    const intervalId = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    // After 5 seconds, redirect to the home page
    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-4"
      >
        You are not authenticated
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg text-gray-700 mb-4"
      >
        Redirecting to homepage in...
      </motion.p>
      <AnimatePresence mode="wait">
        <motion.div
          key={countdown}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800"
        >
          {countdown}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
