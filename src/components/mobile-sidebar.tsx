import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import HomeSidebar from './sidebar'

const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger className='md:hidden'>
            <Menu size={24} />
        </SheetTrigger>
        <SheetContent side={'left'} className="p-0 bg-secondary pt-10 w-28">
            <HomeSidebar/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar