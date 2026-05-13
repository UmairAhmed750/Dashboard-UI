"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from './store/hooks';
import { setUserData } from './store/slices/userSlice';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation Error Popup
    if (!email || !name) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill the inputs',
        icon: 'warning',
        confirmButtonColor: '#2563eb',
        confirmButtonText: 'OK'
      });
      return;
    }

    // 2. Success Popup (Login Successfully)
    Swal.fire({
      title: 'Success!',
      text: 'Login Successfully!',
      icon: 'success',
      timer: 1500, // 1.5 seconds mein khud khatam ho jayega
      showConfirmButton: false,
      timerProgressBar: true,
    });

    // Redux mein data bhej rahe hain
    dispatch(setUserData({
      name: name,
      email: email
    }));

    // 3. Chota sa delay taake user success popup dekh sake, phir dashboard par navigate karein
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to Dashboard</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Your Email"
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button 
            type="submit"
            className="relative group overflow-hidden px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
            <span className="relative text-lg">Login to Dashboard</span>
          </button>
        </form>
      </div>
    </div>
  );
}