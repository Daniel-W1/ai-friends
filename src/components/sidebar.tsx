'use client'

import { cn } from '@/lib/utils';
import { Home, Plus, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const HomeSidebar = () => {

    const router = useRouter();
    const pathname = usePathname();

    const onNavigate = (href: string, pro: boolean) => {

        // TODO: Add pro check
        router.push(href);
    }

    const routes = [
        {
            icon: Home,
            href: '/',
            label: "Home",
            pro: false,
        },
        {
            icon: Plus,
            href: '/companions/new',
            label: "Create",
            pro: true,
        },
        {
            icon: Settings,
            href: '/settings',
            label: "Settings",
            pro: false,
        },
    ];

    return (
        <div
            className='w-full flex flex-col items-center justify-center gap-y-2'
        >
            {
                routes.map((route, index)=>(
                    <div
                        className={cn('flex flex-col gap-y-1 justify-center items-center w-20 h-20 hover:bg-primary/10 cursor-pointer rounded-xl transition-all duration-300',
                            pathname === route.href ? 'bg-primary/10' : ''
                        )}
                        onClick={
                            ()=>onNavigate(route.href, route.pro)
                        }
                        key={index}
                    >
                        <route.icon
                            size={24}
                        />
                        <span
                        >
                            {route.label}
                            
                        </span>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default HomeSidebar