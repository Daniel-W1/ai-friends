import Header from '@/components/header'
import HomeSidebar from '@/components/sidebar'
import React from 'react'

const RootLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <div>
        <Header/>
        <div
          className='hidden md:block w-24 h-screen pt-24 bg-secondary text-primary fixed'
          >
          <HomeSidebar/>
        </div>
        <main className='md:pl-20 pt-16 h-full'>
          {children}
        </main>
    </div>
  )
}

export default RootLayout