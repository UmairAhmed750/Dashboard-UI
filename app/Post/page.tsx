"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks"; 
import { useRouter } from "next/navigation";       
import PutForm from "@/components/PutForm";

export default function PostPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // 1. Redux store se user ka role nikala
  const { role } = useAppSelector((state) => state.user);

  useEffect(() => {
    // 2. Refresh ke waqt pehle localStorage se role check karein
    const savedRole = localStorage.getItem("userRole") || role || "";
    const currentRole = String(savedRole).toLowerCase().trim();

    // 🚨 Sirf aur sirf GUEST (khali role) ko block karo
    if (currentRole === "") {
      router.push("/dashboard"); 
    } else {
      // Agar Admin, Editor ya Buyer hai toh page dikhao
      setIsChecking(false);
    }
  }, [role, router]);

  // Jab tak checking chal rahi ho, posts leak nahi hongi
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-muted-foreground">
        <p className="text-sm font-medium">Checking permissions...</p>
      </div>
    );
  }

  // ✅ Sahi users ke liye posts ka page load ho jayega
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <PutForm />
    </div>
  );
}