"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { MoreVertical, MousePointer2, TrendingUp, History, Play } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function BottomCharts() {
  
  // 1. Marketing Report Donut
  const marketingOptions: any = {
    chart: { type: 'donut' },
    colors: ['#0095FF', '#10B981', '#FF5B7D'],
    labels: ['Organic', 'Referral', 'Ads'],
    plotOptions: { pie: { donut: { size: '75%', labels: { show: true, total: { show: true, label: '', formatter: () => '24.3k' } } } } },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 0 }
  };

  // 2. Payments Bar Chart
  const paymentsOptions: any = {
    chart: { type: 'bar', toolbar: { show: false } },
    colors: ['#0095FF'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '30%', distributed: false } },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: { categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false }
  };

  // 3. Annual Profit Area Chart
  const annualOptions: any = {
    chart: { type: 'area', toolbar: { show: false }, sparkline: { enabled: true } },
    colors: ['#0095FF'],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-400 mx-auto px-10 mt-6">
      
      {/* CARD 1: Marketing Report */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm flex flex-col h-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Marketing Report</h3>
          <MoreVertical size={20} className="text-slate-400" />
        </div>
        
        <div className="flex items-center justify-between grow">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-50 text-rose-500 rounded-xl"><TrendingUp size={18}/></div>
              <div><p className="text-xs text-slate-400">Google Ads</p><p className="font-bold text-slate-800">+2.9k</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl"><MousePointer2 size={18}/></div>
              <div><p className="text-xs text-slate-400">Referral</p><p className="font-bold text-slate-800">1.22</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl"><History size={18}/></div>
              <div><p className="text-xs text-slate-400">Organic</p><p className="font-bold text-slate-800">24.3K</p></div>
            </div>
          </div>
          <div className="w-45">
            <Chart options={marketingOptions} series={[60, 20, 20]} type="donut" />
          </div>
        </div>

        <div className="mt-4 p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
          <p className="text-xs text-slate-500 font-medium">Learn insights how to manage</p>
          <button className="bg-blue-500 text-white p-2 rounded-full shadow-lg shadow-blue-200"><Play size={14} fill="white" /></button>
        </div>
      </div>

      {/* CARD 2: Payments */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm flex flex-col h-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-slate-800">Payments</h3>
          <MoreVertical size={20} className="text-slate-400" />
        </div>
        <p className="text-2xl font-bold text-slate-800">12,389 <span className="text-xs bg-rose-50 text-rose-500 px-2 py-1 rounded-full">-3.8%</span></p>
        <p className="text-xs text-slate-400 mb-4">Last 7 days</p>

        <div className="grow">
          <Chart options={paymentsOptions} series={[{name: 'Pay', data: [40, 60, 35, 90, 50, 70, 55]}]} type="bar" height="100%" />
        </div>

        <div className="mt-4 pt-4 border-t flex justify-between text-xs font-medium">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full" /> Paypal</div>
          <span className="text-slate-400">52%</span>
        </div>
        <div className="mt-2 flex justify-between text-xs font-medium">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-100 rounded-full" /> Credit Card</div>
          <span className="text-slate-400">48%</span>
        </div>
      </div>

      {/* CARD 3: Annual Profit */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm flex flex-col h-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Annual Profit</h3>
          <MoreVertical size={20} className="text-slate-400" />
        </div>

        <div className="bg-blue-50 rounded-3xl p-6 relative overflow-hidden h-48">
          <div className="flex justify-between relative z-10">
            <span className="text-sm text-slate-500">Conversion Rate</span>
            <span className="text-xl font-bold text-slate-800">18.4%</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <Chart options={annualOptions} series={[{data: [30, 70, 40, 90, 50, 80, 40]}]} type="area" height={100} />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <div><p className="text-sm font-medium text-slate-800">Added to Cart</p><p className="text-[10px] text-slate-400">5 clicks</p></div>
            <div className="text-right"><p className="font-bold text-slate-800">$21,120.70</p><p className="text-[10px] text-emerald-500">+13.2%</p></div>
          </div>
          <div className="flex justify-between items-center">
            <div><p className="text-sm font-medium text-slate-800">Reached to Checkout</p><p className="text-[10px] text-slate-400">12 clicks</p></div>
            <div className="text-right"><p className="font-bold text-slate-800">$16,100.00</p><p className="text-[10px] text-rose-500">-7.4%</p></div>
          </div>
        </div>
      </div>

    </div>
  );
}