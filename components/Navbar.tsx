"use client";

import React, { useState, useEffect } from "react";
import { Menu, Search, Moon, Sun, Bell } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../app/store/hooks"; // 🔌 Added useAppDispatch
import { setUserData, clearUser } from "../app/store//slices/userSlice"; // 👈 Apne slice ka sahi path check karlein
import { useTheme } from "next-themes"; 
import Link from 'next/link'; 
  
export default function Navbar() {
  const dispatch = useAppDispatch(); // 🔌 Dispatch initialize kiya
  const { userName, email, role } = useAppSelector((state) => state.user);

  // 🔌 Safe check ke liye role ko string banaya taake condition crash na ho
  const currentRole = role ? String(role).toLowerCase().trim() : "";

  // 🔥 Shadcn Official Theme State Hooks
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Next.js hydration error se bachne ke liye (Shadcn standard rule)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔄 REFRESH HO TO RE-LOGIN AUTOMATION (SESSION RESTORE)
  useEffect(() => {
    // Agar page refresh hoa aur Redux khali ho gaya (no role), lekin localStorage mein data para hai
    if (!role) {
      const savedName = localStorage.getItem("userName");
      const savedEmail = localStorage.getItem("userEmail");

      if (savedName && savedEmail) {
        // Chup-chap Redux store ko dobara bhar do
        dispatch(setUserData({ name: savedName, email: savedEmail }));
      }
    }
  }, [role, dispatch]);

  // 🧹 Proper Logout Handler
  const handleLogout = () => {
    dispatch(clearUser()); // Yeh Redux ko bhi khali karega aur localStorage ko bhi saaf kardega
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background text-foreground shadow-sm border-b border-border transition-colors duration-200">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary transition-colors" />
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-1.5 bg-secondary text-foreground border border-border rounded-lg text-sm outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* 🔒 POSTS BUTTON GUARD: Agar role khali "" hoga (Guest), toh yeh button poori tarah hide ho jayega */}
        {currentRole !== "" && (
          <Link href="/Post">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer text-xs font-bold transition-all active:scale-95">
              Posts
            </button>
          </Link>
        )}

        {/* 🚪 LOGOUT BUTTON */}
        <Link href="/">
          <button 
            className="bg-blue-600  text-white px-6 py-2 rounded-md cursor-pointer text-xs font-bold transition-all active:scale-95" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </Link>

        {/* 🌙 Official Shadcn Dark Mode Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 hover:bg-secondary rounded-full cursor-pointer transition-colors border-0 bg-transparent flex items-center justify-center outline-none active:scale-95"
          title="Toggle Theme"
        >
          {/* Hydration complete hone ke baad hi sahi icon dikhega */}
          {mounted && theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {/* 🔔 Notification */}
        <div className="relative p-2 hover:bg-secondary rounded-full cursor-pointer transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
        </div>

        <div className="h-6 w-[1px] bg-border mx-2"></div>

        {/* 👤 Profile & Role Section */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-foreground leading-none">
              {userName || "Guest"}
            </span>
            {email && (
              <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${role === "owner"
                  ? "bg-red-500/10 text-red-500 border border-red-500/20"
                  : "bg-green-500/10 text-green-500 border border-green-500/20"
                }`}>
                {role}
              </span>
            )}
          </div>

          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm transition-transform hover:scale-105 cursor-pointer ${role === "owner" ? "bg-gradient-to-br from-red-500 to-orange-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"
            }`}>
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

      </div>
    </div>
  );
}