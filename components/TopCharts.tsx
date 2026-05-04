"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { LayoutGrid, DollarSign, MoreVertical, Zap } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Charts() {
  const [activeTab, setActiveTab] = useState<'profit' | 'expenses'>('profit');

  // 1. Profit Chart Options (Area Chart)
  const profitOptions: any = {
    chart: { type: 'area', toolbar: { show: false }, offsetY: -10 },
    colors: ['#0095FF', '#E0E7FF'],
    stroke: { curve: 'smooth', width: 2 },
    grid: { padding: { top: -20, bottom: 0 }, strokeDashArray: 5, borderColor: '#f1f5f9' },
    xaxis: { 
      categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'], 
      labels: { style: { colors: '#94A3B8' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { style: { colors: '#94A3B8' } } },
    dataLabels: { enabled: false },
    legend: { show: false },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] }
    }
  };

  // 2. Expense Chart Options (Bar Chart - As per image_aa9538.png)
  const expenseOptions: any = {
    chart: { type: 'bar', toolbar: { show: false } },
    colors: ['#0095FF', '#8B5CF6'], // Blue and Purple from your image
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '40%',
        endingShape: 'rounded'
      }
    },
    grid: { strokeDashArray: 5, borderColor: '#f1f5f9' },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { style: { colors: '#94A3B8' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { style: { colors: '#94A3B8' } } },
    legend: { show: false },
  };

  const productOptions: any = {
    chart: { type: 'donut', offsetY: -20 },
    colors: ['#0095FF', '#10B981', '#8B5CF6', '#FF5B7D'],
    plotOptions: {
      pie: {
        startAngle: -90, endAngle: 90,
        donut: { size: '80%', labels: { show: true, total: { show: true, label: '', formatter: () => "8364" } } }
      }
    },
    grid: { padding: { bottom: -100 } },
    dataLabels: { enabled: false },
    legend: { show: false },
  };
// Chota helper component legend ke liye
  function LegendItem({ color, label, percentage }: { color: string, label: string, percentage: string }) {
  return (
    <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} /> 
      <span className="font-bold text-slate-800">{percentage}</span> {label}
    </div>
  );
}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-400 mx-auto px-4 md:px-10 mt-6">

      {/* Left Section: Sales Profit / Expenses */}
      <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm flex flex-col h-auto lg:h-120">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h3 className="text-xl font-bold text-slate-800">Sales Profit</h3>
          
          <div className="flex gap-1 bg-slate-50 p-1 rounded-xl w-full sm:w-auto ">
            <button 
              onClick={() => setActiveTab('profit')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-xs font-bold transition-all hover:cursor-pointer ${
                activeTab === 'profit' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'
              }`}
            >
              Profit
            </button>
            <button 
              onClick={() => setActiveTab('expenses')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-xs font-bold transition-all hover:cursor-pointer ${
                activeTab === 'expenses' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'
              }`}
            >
              Expenses
            </button>
          </div>
        </div>

        {/* Chart Display Area */}
        <div className="grow -mt-2 min-h-75">
          {activeTab === 'profit' ? (
            <Chart 
              key="profit"
              options={profitOptions} 
              series={[
                { name: 'Profit', data: [25, 40, 20, 30, 45, 50, 75, 60, 40] }, 
                { name: 'Exp', data: [50, 30, 40, 25, 30, 35, 40, 45, 60] }
              ]} 
              type="area" 
              height="100%" 
            />
          ) : (
            <Chart 
              key="expenses"
              options={expenseOptions} 
              series={[
                { name: 'Marketing', data: [70, 40, 25, 55, 40, 90, 30] }, // Blue bars
                { name: 'Development', data: [45, 25, 80, 38, 30, 45, 45] } // Purple bars
              ]} 
              type="bar" 
              height="100%" 
            />
          )}
        </div>

        {/* Footer Stats */}
        <div className="flex flex-col xl:flex-row items-center justify-between mt-4 pt-6 border-t border-slate-50 gap-6">
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="bg-[#D1FAE5] text-[#10B981] p-3 rounded-2xl shrink-0"><LayoutGrid size={24} /></div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-slate-800">$63,489.50 <span className="text-[10px] bg-[#D1FAE5] px-2 py-1 rounded-full">+8%</span></p>
                <p className="text-sm text-slate-400">Profit this year</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 shrink-0"><DollarSign size={24} /></div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-slate-800">$38,496.00</p>
                <p className="text-sm text-slate-400">Expenses this year</p>
              </div>
            </div>
          </div>

          <button className="w-full xl:w-auto bg-[#0095FF] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 hover:cursor-pointer">
            View Details
          </button>
        </div>
      </div>

      {/* Right Section: Product Sales */}
      <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm flex flex-col h-auto lg:h-120">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Product Sales</h3>
          <MoreVertical size={24} className="text-slate-400 cursor-pointer" />
        </div>
        
        <div className="relative grow flex flex-col items-center justify-center -mt-10">
          <Chart options={productOptions} series={[36, 17, 22, 31]} type="donut" width="100%" />
          <div className="absolute top-[65%] bg-[#D1FAE5] text-[#10B981] px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm uppercase tracking-wider">
            <Zap size={14} fill="currentColor" /> Best Seller
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
          <LegendItem color="#0095FF" label="Modernize" percentage="36%" />
          <LegendItem color="#10B981" label="Spike" percentage="17%" />
          <LegendItem color="#8B5CF6" label="Ample" percentage="22%" />
          <LegendItem color="#FF5B7D" label="MaterialM" percentage="31%" />
        </div>
      </div>
    </div>
  );
}


