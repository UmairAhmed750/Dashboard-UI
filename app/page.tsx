
"use client";

import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  const handleNavigation = () => {
    // Aap yahan koi bhi logic likh sakte hain
    router.push('/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <button onClick={handleNavigation} className="
  relative group overflow-hidden
  px-8 py-3 
  bg-linear-to-r from-blue-600 to-indigo-600 
  text-white font-bold rounded-xl
  transition-all duration-300 ease-out
  hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]
  active:scale-95
">
  {/* Shine effect jo hover par left se right jayega */}
  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
  
  <span className="relative">Explore Dashboard</span>
</button>
    </div>
  );
}
