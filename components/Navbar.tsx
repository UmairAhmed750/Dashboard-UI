"use client";

import { Menu, Search, Moon, Bell } from "lucide-react";
// Hook ko import karein
import { useAppSelector } from "../app/store/hooks"; 

export default function Navbar() {
  // Redux se name, email aur role nikalna
  const { userName, email, role } = useAppSelector((state) => state.user);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-100">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors" />
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* 🌙 Dark Mode Icon */}
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          <Moon className="w-5 h-5 text-gray-700" />
        </div>

        {/* 🔔 Notification */}
        <div className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

        {/* 👤 Profile & Role Section */}
        <div className="flex items-center gap-3">
          
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-gray-800 leading-none">
              {userName || "Guest"}
            </span>
            {/* Email Based Role Tag */}
            {email && (
              <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                role === "owner" 
                ? "bg-red-100 text-red-600 border border-red-200" 
                : "bg-green-100 text-green-600 border border-green-200"
              }`}>
                {role}
              </span>
            )}
          </div>
          
          {/* Avatar Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm transition-transform hover:scale-105 cursor-pointer ${
            role === "owner" ? "bg-gradient-to-br from-red-500 to-orange-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"
          }`}>
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
        </div>
        
      </div>
    </div>
  );
}