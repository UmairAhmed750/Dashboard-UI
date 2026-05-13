"use client";

import { Menu, Search, Moon, Bell } from "lucide-react";
// 1. Hook ko import karein
import { useAppSelector } from "../app/store/hooks"; // Path check karlein apne folder ke mutabiq

export default function Navbar() {

const name = useAppSelector((state) => state.user.userName);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5 cursor-pointer text-gray-700" />
        <Search className="w-5 h-5 cursor-pointer text-gray-700" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* 🌙 Dark Mode Icon */}
        <div className="cursor-pointer">
          <Moon className="w-5 h-5 text-gray-700" />
        </div>

        {/* 🌍 Flag */}
        <img
          src="https://flagcdn.com/w40/gb.png"
          alt="flag"
          className="w-6 h-6 rounded-full cursor-pointer"
        />

        {/* 🔔 Notification */}
        <div className="relative">
          <Bell className="w-5 h-5 cursor-pointer text-gray-700" />
        </div>

        {/* 👤 Profile Section */}
        <div className="flex items-center gap-3">
          {/* Naam yahan show hoga */}
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            {name}
          </span>
          
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {/* Pehla word dikhane ke liye (e.g., Umair ka 'U') */}
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>
        
      </div>
    </div>
  );
}