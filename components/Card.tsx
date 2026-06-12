"use client";

import React from 'react';
import { AreaChart, RefreshCcw, CircleDollarSign } from 'lucide-react';

export default function Card() {
  return (
    // max-w-400 ko standard max-w-7xl (ya screen-xl) se replace kiya hai taake responsive container sahi behave kare
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-400 mx-auto mb-6 px-4 md:px-10 mt-5">

      {/* 1. BLUE WELCOME CARD */}
      {/* md:col-span-2 lagaya hai taake md screen size par yeh full width cover kare aur layouts collapse na hon */}
      <div className="md:col-span-2 lg:col-span-3 bg-[#0095FF] dark:bg-card dark:border dark:border-border rounded-md p-6 sm:p-8 text-white dark:text-foreground relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-lg shadow-blue-100 dark:shadow-none">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl text-white dark:text-foreground font-bold truncate">Welcome Jonathan Deo</h1>
          <p className="text-blue-100 dark:text-muted-foreground opacity-80 mt-1 text-base sm:text-lg">Check all the statistics</p>
        </div>

        {/* Stats row inside Blue Card */}
        {/* max-w-70 ko standard max-w-xs (320px) kiya hai taake mobile screens par content squeeze na ho */}
        <div className='flex rounded-2xl bg-[#0395eb] dark:bg-secondary w-full max-w-xs items-center py-3 border border-white/10 dark:border-border shadow-inner mt-4'>
          <div className="flex-1 text-center border-r border-white/20 dark:border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-foreground">573</h2>
            <p className="text-blue-100 dark:text-muted-foreground text-[10px] uppercase font-bold tracking-wider mt-0.5">
              New Leads
            </p>
          </div>
          <div className="flex-1 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-foreground">87%</h2>
            <p className="text-blue-100 dark:text-muted-foreground text-[10px] uppercase font-bold tracking-wider mt-0.5">
              Conversion
            </p>
          </div>
        </div>
      </div>

      {/* 2. Sales Card */}
      {/* h-55 ki jagah standard h-56 use kiya hai */}
      <div className="bg-[#f9e8f0] dark:bg-card dark:border dark:border-border rounded-md p-6 flex flex-col justify-between h-56 shadow-sm">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#ff6692] text-white shrink-0">
          <AreaChart size={26} />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-foreground">2358</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-secondary text-gray-500 dark:text-muted-foreground shadow-sm dark:border dark:border-border">+23%</span>
          </div>
          <p className="text-gray-400 dark:text-muted-foreground font-medium text-base mt-1">Sales</p>
        </div>
      </div>

      {/* 3. Refunds Card */}
      <div className="bg-[#ebe8fa] dark:bg-card dark:border dark:border-border rounded-md p-6 flex flex-col justify-between h-56 shadow-sm">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#8965e5] text-white shrink-0">
          <RefreshCcw size={26} />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-foreground">434</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-destructive/20 text-red-500 dark:text-destructive shadow-sm dark:border dark:border-destructive/30">-12%</span>
          </div>
          <p className="text-gray-400 dark:text-muted-foreground font-medium text-base mt-1">Refunds</p>
        </div>
      </div>

      {/* 4. Earnings Card */}
      <div className="bg-[#E7FBF2] dark:bg-card dark:border dark:border-border rounded-md p-6 flex flex-col justify-between h-56 shadow-sm">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-500 text-white shrink-0">
          <CircleDollarSign size={26} />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-foreground">$245k</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-secondary text-gray-500 dark:text-muted-foreground shadow-sm dark:border dark:border-border">+8%</span>
          </div>
          <p className="text-gray-400 dark:text-muted-foreground font-medium text-base mt-1">Earnings</p>
        </div>
      </div>

    </div>
  );
}