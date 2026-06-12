"use client";

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function AddProductForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ title: '', price: '' });

  // --- 1. Direct Mutation Logic ---
  const { mutate, isPending, data, isSuccess, isError, error } = useMutation({
    mutationFn: async (newProduct: { title: string; price: number }) => {
      // Direct API call
      const res = await axios.post('https://dummyjson.com/products/add', newProduct);
      return res.data;
    },
    onSuccess: () => {
      // List ko refresh karne ke liye
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    mutate({ 
      title: formData.title, 
      price: Number(formData.price) 
    });
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Enter product title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Price</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Enter price"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 rounded-lg text-white font-bold shadow-lg transition-all transform active:scale-95 ${
            isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isPending ? 'Saving...' : 'Submit Data'}
        </button>
      </form>

      {/* --- 2. Behtar Error Handling Display --- */}
      {isError && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700">l
          <p className="font-bold flex items-center gap-2">
            <span>⚠️</span> Error Occurred
          </p>
          <p className="text-sm mt-1">
            {/* Asli error message nikaalne ka tareeka */}
            {axios.isAxiosError(error) 
              ? error.response?.data?.message || error.message 
              : "Something went wrong"}
          </p>
        </div>
      )}

      {/* --- 3. Success Message --- */}
      {isSuccess && (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-700">
          <p className="font-bold">Success!</p>
          <p className="text-sm">Product added with ID: {data?.id}</p>
          <pre className="text-[10px] mt-2 bg-white p-2 rounded border border-green-100 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}