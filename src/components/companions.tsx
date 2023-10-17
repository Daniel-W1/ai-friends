'use client'

import { Companion } from '@prisma/client'
import Image from 'next/image';
import { Card, CardContent, CardFooter } from './ui/card';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CompanionsProps {
    data: (Companion & {
        _count: {
            messages: number
        },
    })[];
}

const Companions = ({ data }: CompanionsProps) => {
    const router = useRouter();

    const handleClick = (id: string) => {
        router.push(`/chat/${id}`)
    }

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-10">
                <Image
                    src={'/empty.png'}
                    width={200}
                    height={200}
                    alt='empty'
                />
                <p className="text-sm text-primary/20">No companions found</p>
            </div>
        )
    }
    return (
        <div
            className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 pb-10 pt-6'
        >
            {data.map((companion) => (
                <Card
                    key={companion.id}
                    className='bg-primary/10 p-4 pb-0 shadow-xl transition-all hover:shadow-2xl'
                >
                        <CardContent
                            className='text-center cursor-pointer'
                            onClick={() => handleClick(companion.id)}
                        >
                            <div
                                style={
                                    {
                                        width: '100%',
                                        height: '150px',
                                        position: 'relative',
                                    }
                                }
                            >
                                <Image
                                    src={companion.src}
                                    alt='companion'
                                    objectFit='contain'
                                    layout='fill'

                                />
                            </div>

                            <h1
                                className='text-primary/80 mt-2'
                            >
                                {companion.name}
                            </h1>

                            <p
                                className='text-xs text-primary/60'
                            >
                                {companion.description}
                            </p>
                        </CardContent>

                        <CardFooter
                            className='flex justify-between items-center w-full'
                        >
                            <p
                                className='text-xs text-primary/60 lowercase'
                            >
                                @{companion.userName}
                            </p>

                            <div className='flex items-center'>
                                {companion._count.messages}
                                <MessageCircle
                                    size={16}
                                    className='ml-1'
                                />
                            </div>
                        </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default Companions