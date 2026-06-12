"use client";

import React, { useState, useEffect } from "react";
import { Menu, Search, Moon, Sun, Bell } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../app/store/hooks"; 
import { setUserData, clearUser } from "../app/store/slices/userSlice"; 
import { useTheme } from "next-themes";
import Link from 'next/link';

export default function Navbar() {
  const dispatch = useAppDispatch(); 
  const { userName, email, role } = useAppSelector((state) => state.user);

  const currentRole = role ? String(role).toLowerCase().trim() : "";

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!role) {
      const savedName = localStorage.getItem("userName");
      const savedEmail = localStorage.getItem("userEmail");

      if (savedName && savedEmail) {
        dispatch(setUserData({ name: savedName, email: savedEmail }));
      }
    }
  }, [role, dispatch]);

  const handleLogout = () => {
    dispatch(clearUser()); 
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-6 py-4 bg-background text-foreground shadow-sm border-b border-border transition-colors duration-200">

      {/* ─── LEFT SECTION ─── */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 sm:flex-initial">
        <Menu className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary transition-colors flex-shrink-0" />
        
        {/* Search: Mobile par input hide ho jata hai space bachane ke liye */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 sm:absolute sm:left-3 sm:top-1/2 sm:-translate-y-1/2 text-muted-foreground cursor-pointer sm:cursor-default" />
          <input
            type="text"
            placeholder="Search..."
            className="hidden sm:block pl-10 pr-4 py-1.5 bg-secondary text-foreground border border-border rounded-lg text-sm outline-none focus:border-primary transition-all w-40 md:w-60"
          />
        </div>
      </div>

      {/* ─── RIGHT SECTION ─── */}
      <div className="flex items-center gap-1.5 sm:gap-4 max-w-full justify-end">

        {/* 🔒 POSTS BUTTON: Mobile responsive padding */}
        {currentRole !== "" && (
          <Link href="/Post">
            <button
              className="
                bg-gradient-to-r from-blue-500 to-blue-600 
                text-white 
                px-3 py-1.5 sm:px-6 sm:py-2.5 
                rounded-lg 
                cursor-pointer 
                text-[10px] sm:text-xs 
                font-bold 
                shadow-md shadow-blue-500/20
                transition-all 
                duration-300
                ease-in-out
                hover:from-blue-600 hover:to-blue-700
                hover:shadow-lg hover:shadow-blue-500/40
                hover:-translate-y-0.5
                active:scale-95 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              "
            >
              Posts
            </button>
          </Link>
        )}

        {/* 🚪 LOGOUT BUTTON: Mobile responsive padding */}
        <Link href="/">
          <button
            className="
              bg-gradient-to-r from-blue-600 to-blue-700 
              text-white 
              px-3 py-1.5 sm:px-6 sm:py-2.5 
              rounded-lg 
              cursor-pointer 
              text-[10px] sm:text-xs 
              font-bold 
              shadow-lg shadow-blue-600/20
              transition-all 
              duration-300
              ease-in-out
              hover:from-blue-700 hover:to-blue-800
              hover:shadow-blue-600/40
              hover:-translate-y-0.5
              active:scale-95 active:translate-y-0
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
            "
            onClick={handleLogout}
          >
            Logout
          </button>
        </Link>

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-1.5 sm:p-2 hover:bg-secondary rounded-full cursor-pointer transition-colors border-0 bg-transparent flex items-center justify-center outline-none active:scale-95 flex-shrink-0"
          title="Toggle Theme"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          )}
        </button>

        {/* 🔔 Notification */}
        <div className="relative p-1.5 sm:p-2 hover:bg-secondary rounded-full cursor-pointer transition-colors flex-shrink-0">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
        </div>

        {/* Vertical Divider */}
        <div className="h-5 sm:h-6 w-[1px] bg-border mx-1 sm:mx-2 flex-shrink-0"></div>

        {/* 👤 Profile Section */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-foreground leading-none">
              {userName || "Guest"}
            </span>
            {email && (
              <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                role === "owner"
                  ? "bg-red-500/10 text-red-500 border border-red-500/20"
                  : "bg-green-500/10 text-green-500 border border-green-500/20"
              }`}>
                {role}
              </span>
            )}
          </div>

          {/* Avatar size responsive optimized */}
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-sm transition-transform hover:scale-105 cursor-pointer ${
            role === "owner" ? "bg-gradient-to-br from-red-500 to-orange-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"
          }`}>
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

      </div>
    </div>
  );
}