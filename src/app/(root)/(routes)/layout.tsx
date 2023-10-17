import Header from '@/components/header'
import HomeSidebar from '@/components/sidebar'
import { checkSubscription } from '@/lib/subscription'
import React from 'react'

const RootLayout =  async ({
    children
}:{
    children: React.ReactNode
}) => {
  const hasSubscribed = await checkSubscription();

  return (
    <div>
        <Header isPro={hasSubscribed}/>
        <div
          className='hidden md:block w-24 h-screen pt-24 bg-secondary text-primary fixed'
          >
          <HomeSidebar isPro = {hasSubscribed}/>
        </div>
        <main className='md:pl-20 pt-16 h-full'>
          {children}
        </main>
    </div>
  )
}

export default RootLayout