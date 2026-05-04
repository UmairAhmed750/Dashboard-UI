"use client";

import React from 'react';
import { MoreVertical, Wallet, CreditCard, Landmark, RotateCcw, Send } from 'lucide-react';

export default function ProductSection() {

  const products = [
    { id: 1, name: "MaterialM - Admin", desc: "Dashboard Template", cat: "Mobile", catColor: "bg-cyan-500", sales: "2,350", earn: "$24,235", tech: ["PS"] },
    { id: 2, name: "MatDash - Admin", desc: "Dashboard Template", cat: "Web App", catColor: "bg-emerald-400", sales: "1,630", earn: "$13,699", tech: ["F", "V"] },
    { id: 3, name: "Spike - Admin", desc: "Dashboard Template", cat: "Website", catColor: "bg-violet-500", sales: "480", earn: "$13,699", tech: ["Xd", "B"] },
    { id: 4, name: "Modernize - Admin", desc: "Dashboard Template", cat: "Marketing", catColor: "bg-teal-400", sales: "874", earn: "$10,250", tech: ["A"] },
    { id: 5, name: "MaterialPro - Admin", desc: "Dashboard Template", cat: "SSM", catColor: "bg-amber-500", sales: "3715", earn: "$36,400", tech: ["N", "JS"] },
  ];

  const transactions = [
    { title: "PayPal Transfer", sub: "Money added", amount: "+$6,235", color: "bg-blue-50", iconColor: "text-blue-600", icon: <Send size={18} /> },
    { title: "Wallet", sub: "Bill payment", amount: "+$345", color: "bg-emerald-50", iconColor: "text-emerald-500", icon: <Wallet size={18} /> },
    { title: "Credit Card", sub: "Money reversed", amount: "+$2,235", color: "bg-amber-50", iconColor: "text-amber-500", icon: <CreditCard size={18} /> },
    { title: "Bank Transfer", sub: "Money added", amount: "+$320", color: "bg-blue-50", iconColor: "text-blue-500", icon: <Landmark size={18} /> },
    { title: "Refund", sub: "Bill Payment", amount: "-$32", color: "bg-rose-50", iconColor: "text-rose-500", icon: <RotateCcw size={18} /> },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-400 mx-auto px-10 mt-6 mb-10">

      {/* LEFT: Top Performing Products Table (Spans 2 columns) */}
      <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Top Performing Products</h3>
          <MoreVertical size={20} className="text-slate-400" />
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 text-sm border-b border-slate-50">
              <th className="pb-4 font-semibold">Product Name</th>
              <th className="pb-4 font-semibold">Category</th>
              <th className="pb-4 font-semibold">Sales</th>
              <th className="pb-4 font-semibold">Earnings</th>
              <th className="pb-4 font-semibold text-right">Technology</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center font-bold text-blue-500 text-xs">M</div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`${item.catColor} text-white px-3 py-1 rounded-full text-[10px] font-bold`}>{item.cat}</span>
                </td>
                <td className="py-4 text-slate-500 text-sm">{item.sales}</td>
                <td className="py-4 font-bold text-slate-800 text-sm">{item.earn}</td>
                <td className="py-4">
                  <div className="flex justify-end gap-1">
                    {item.tech.map((t, i) => (
                      <span key={i} className="w-6 h-6 bg-slate-800 text-white rounded text-[8px] flex items-center justify-center font-bold uppercase">{t}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT: Recent Transactions (Spans 1 column) */}
      <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-sm flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
          <MoreVertical size={20} className="text-slate-400" />
        </div>

        <div className="space-y-6 grow">
          {transactions.map((t, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${t.color} ${t.iconColor}`}>
                  {t.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{t.title}</p>
                  <p className="text-xs text-slate-400">{t.sub}</p>
                </div>
              </div>
              <span className={`font-bold text-sm ${t.amount.startsWith('-') ? 'text-rose-500' : 'text-slate-800'}`}>
                {t.amount}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#0095FF] text-white py-4 rounded-2xl font-bold text-sm mt-8 hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 hover:cursor-pointer">
          View All Transactions
        </button>
      </div>

    </div>
  );
}