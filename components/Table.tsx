"use client";

import React from 'react';
import { useProduct, Product } from '@/app/Api/ProductApi';
import { MoreVertical, Wallet, CreditCard, Landmark, RotateCcw, Send, Star } from 'lucide-react';

export default function ProductSection() {
  const { data: products, isLoading, isError } = useProduct();

  // Transactions array ko safe and dynamic rakha hai, icon colors and dark mode variants handle karne ke liye
  const transactions = [
    { title: "PayPal Transfer", sub: "Money added", amount: "+$6,235", color: "bg-blue-50 dark:bg-blue-500/10", iconColor: "text-blue-600 dark:text-blue-400", icon: <Send size={18} /> },
    { title: "Wallet", sub: "Bill payment", amount: "+$345", color: "bg-emerald-50 dark:bg-emerald-500/10", iconColor: "text-emerald-500", icon: <Wallet size={18} /> },
    { title: "Credit Card", sub: "Money reversed", amount: "+$2,235", color: "bg-amber-50 dark:bg-amber-500/10", iconColor: "text-amber-500", icon: <CreditCard size={18} /> },
    { title: "Bank Transfer", sub: "Money added", amount: "+$320", color: "bg-blue-50 dark:bg-blue-500/10", iconColor: "text-blue-500 dark:text-blue-400", icon: <Landmark size={18} /> },
    { title: "Refund", sub: "Bill Payment", amount: "-$32", color: "bg-rose-50 dark:bg-rose-500/10", iconColor: "text-rose-500", icon: <RotateCcw size={18} /> },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-red-500 font-bold">
        Failed to load inventory products.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-400 mx-auto px-4 md:px-10 mt-6">

      {/* LEFT: Products Table */}
      <div className="lg:col-span-2 bg-white dark:bg-card dark:border dark:border-border p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-foreground">Inventory Products</h3>
          <MoreVertical size={20} className="text-slate-400 dark:text-muted-foreground cursor-pointer" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
            <thead>
              <tr className="text-slate-500 dark:text-muted-foreground text-xs sm:text-sm border-b border-slate-50 dark:border-border">
                <th className="pb-4 font-semibold">Title</th>
                <th className="pb-4 font-semibold hidden md:table-cell">Category</th>
                <th className="pb-4 font-semibold">Price</th>
                <th className="pb-4 font-semibold hidden sm:table-cell">Rating</th>
                <th className="pb-4 font-semibold text-right">Brand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-border">
              {products?.map((item: Product) => (
                <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-secondary/40 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 dark:bg-secondary object-cover border border-slate-100 dark:border-border flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 dark:text-foreground text-xs sm:text-sm truncate max-w-[120px] sm:max-w-full">
                          {item.title}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Array.isArray(item.tags) && item.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-[8px] sm:text-[9px] text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded-md italic font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 hidden md:table-cell">
                    <span className="bg-blue-600 text-white dark:bg-blue-500 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-4 text-slate-500 dark:text-muted-foreground text-xs sm:text-sm font-bold">
                    ${item.price}
                  </td>

                  <td className="py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs sm:text-sm">
                      <Star size={14} fill="currentColor" />
                      {item.rating}
                    </div>
                  </td>

                  <td className="py-4 text-right">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-muted-foreground bg-slate-100 dark:bg-secondary px-2 py-1 rounded-lg inline-block max-w-[80px] sm:max-w-none truncate border dark:border-border">
                      {item.brand || "Generic"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT: Recent Transactions */}
      <div className="lg:col-span-1 bg-white dark:bg-card dark:border dark:border-border p-6 sm:p-8 rounded-[2.5rem] shadow-sm flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-foreground">Recent Transactions</h3>
          <MoreVertical size={20} className="text-slate-400 dark:text-muted-foreground cursor-pointer" />
        </div>

        <div className="space-y-6 grow">
          {transactions.map((t, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${t.color} ${t.iconColor}`}>
                  {t.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-foreground text-sm">{t.title}</p>
                  <p className="text-xs text-slate-400 dark:text-muted-foreground">{t.sub}</p>
                </div>
              </div>
              <span className={`font-bold text-sm ${t.amount.startsWith('-') ? 'text-rose-500' : 'text-slate-800 dark:text-foreground'}`}>
                {t.amount}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#0095FF] text-white py-4 rounded-2xl font-bold text-sm mt-8 hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 dark:shadow-none hover:cursor-pointer">
          View All Transactions
        </button>
      </div>

    </div>
  );
}