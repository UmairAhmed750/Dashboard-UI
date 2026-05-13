"use client";

import { useAppSelector } from "@/app/store/hooks"; // Apna sahi path check karein
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { email } = useAppSelector((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Agar user login nahi hai aur wo login page (/) ke ilawa kahin aur hai
    if (!email && pathname !== "/") {
      router.push("/");
    } else {
      setIsChecking(false);
    }
  }, [email, pathname, router]);

  // Jab tak check ho raha ho, halka sa loading ya khali screen dikhayein
  if (isChecking && pathname !== "/") {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}