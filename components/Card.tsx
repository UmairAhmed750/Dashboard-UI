"use client";

import React from 'react';
import { AreaChart, RefreshCcw, CircleDollarSign } from 'lucide-react';

export default function Card() {
return (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-400 mx-auto mb-6 px-4 md:px-10 mt-5">

    {/* 1. BLUE WELCOME CARD */}
    <div className="lg:col-span-3 bg-[#0095FF] rounded-md p-8 text-white relative overflow-hidden flex flex-col justify-between h-55 shadow-lg shadow-blue-100">
      <div className="relative z-10">
        <h1 className="text-3xl  text-white font-bold">Welcome Jonathan Deo</h1>
        <p className="text-blue-100 opacity-80 mt-1 text-lg">Check all the statistics</p>
      </div>

      {/* Stats row inside Blue Card */}
      <div className='flex rounded-3xl bg-[#0395eb] w-full max-w-70 items-center py-4 border border-white/10 shadow-inner mt-3'>
        <div className="flex-1 text-center border-r-4 border-white/20">
          <h2 className="text-2xl font-bold text-white">573</h2>
          <p className="text-blue-100 text-[10px] uppercase font-bold tracking-wider mt-1">
            New Leads
          </p>
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold text-white">87%</h2>
          <p className="text-blue-100 text-[10px] uppercase font-bold tracking-wider mt-1">
            Conversion
          </p>
        </div>
      </div>
    </div>

    {/* 2. Sales Card */}
    <div className="bg-[#f9e8f0] rounded-md p-6 flex flex-col justify-between h-55 shadow-sm">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#ff6692] text-white">
        <AreaChart size={26} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-slate-800">2358</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-gray-500 shadow-sm">+23%</span>
        </div>
        <p className="text-gray-400 font-medium text-base">Sales</p>
      </div>
    </div>

    {/* 3. Refunds Card */}
    <div className="bg-[#ebe8fa] rounded-md p-6 flex flex-col justify-between h-55 shadow-sm">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#8965e5] text-white">
        <RefreshCcw size={26} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-slate-800">434</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-500">-12%</span>
        </div>
        <p className="text-gray-400 font-medium text-base">Refunds</p>
      </div>
    </div>

    {/* 4. Earnings Card */}
    <div className="bg-[#E7FBF2] rounded-md p-6 flex flex-col justify-between h-55 shadow-sm">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-500 text-white">
        <CircleDollarSign size={26} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-slate-800">$245k</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-gray-500 shadow-sm">+8%</span>
        </div>
        <p className="text-gray-400 font-medium text-base">Earnings</p>
      </div>
    </div>

  </div>
);
}