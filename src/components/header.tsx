'use client'
import Link from 'next/link'
import React from 'react'

import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Sparkles } from "lucide-react";
import { ModeToggle } from './mode-toggle'
import MobileSidebar from './mobile-sidebar'
import { useProModal } from '@/hooks/use-pro-modal'

const font = Poppins(
    {
        weight: ["600"],
        subsets: ['latin']
    }
)

interface HeaderProps {
    isPro: boolean
}

const Header = ({isPro}: HeaderProps) => {
    const proModal = useProModal()

    return (
        <div className='flex justify-between px-4 fixed top-0 z-10 w-full py-4 bg-secondary border-b-2 border-primary/10'>
            <MobileSidebar />
            <div>
                <Link href='/'>
                    <h1 className={cn(
                        'md:text-3xl font-bold hidden md:block text-primary',
                        font.className
                    )}>Friends.ai</h1>
                </Link>
            </div>

            <div className='flex items-center gap-x-3'>
                {!isPro && <Button variant={
                    'premium'
                } size={'sm'}
                    onClick={proModal.openModal}
                >
                    Upgrade
                    <Sparkles className='ml-2 fill-white w-4 h-4' />
                </Button>}
                <ModeToggle />
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Header