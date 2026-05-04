
import Card from '@/components/Card'
import Charts from '@/components/TopCharts'


import Navbar from '@/components/Navbar'
import React from 'react'
import BottomCharts from '@/components/BottomCharts'
import ProductSection from '../../components/Table'

const page = () => {
  return (
    <div>
      <Navbar />
      <Card />
      <Charts />
      <BottomCharts />
      <ProductSection />
    </div>
  )
}

export default page
