"use client";

import React from 'react'
import { useSelector } from 'react-redux' 
import HasPermission from '@/components/HasPermission' 

import Card from '@/components/Card'
import Charts from '@/components/TopCharts'
import Navbar from '@/components/Navbar'
import BottomCharts from '@/components/BottomCharts'
import ProductSection from '../../components/Table'
import PutForm from '@/components/PutForm'

const Page = () => {
  // 1. Redux ke state.user se data uthaya
  const userState = useSelector((state: any) => state.user);
  
  // 2. Aapke slice ke mutabiq direct role nikalna (Kyunkstate.user ke andar hi direct 'role' save ho raha hai)
  const currentRole = userState?.role || ""; 

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* 🟢 Screen par role verify karne ke liye text */}
      <div className="px-6 pt-4 text-xs font-bold text-muted-foreground">
        Logged in as: <span className="text-indigo-600 dark:text-indigo-400 uppercase">{currentRole || "Guest"}</span>
      </div>

      <Card />
      <Charts />
      <BottomCharts />
      
      {/* Product Table (Buttons iske andar khud hidden/show honge) */}
      <ProductSection />
      
      {/* 🔒 MANAGEMENT FORM: Sirf 'owner' ko dikhega, 'buyer' ko nahi */}
      {/* Humne permission 'view_post' rakhi hai jo sirf owner ke paas hai */}
      {/* <HasPermission userRole={currentRole as any} permission="view_post">
        <div className="mt-6 p-6 border-t dark:border-border">
          <h3 className="text-sm font-bold text-muted-foreground mb-4">
            Management Actions (Owner Only)
          </h3>
          <PutForm />
        </div>
      </HasPermission> */}
      
    </div>
  )
}

export default Page;