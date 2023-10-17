'use client'

import { ChevronLeft, Edit, MoreVertical, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import CoolAvatar from "./cool-avatar";
import { Companion } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import axios from "axios";
import { toast } from "./ui/use-toast";

interface ChatHeaderProps {
    companion: Companion
}

const ChatHeader = ({ companion }: ChatHeaderProps) => {
    const router = useRouter();
    const {user} = useUser();


    const onDelete = async () => {
        try {
            await axios.delete(`/api/companion/${companion.id}`)
            router.refresh();
            router.push('/');

            toast({
                description: 'Companion deleted',
                variant: 'default'
            })
        } catch (error) {
            console.log('ERROR DELETING COMPANION', error);
            toast({
                description: 'Error deleting companion, please try again',
                variant: 'default'
            })
        }
    }

    return (
        <div
            className="border-b-2 border-primary/10 h-16 flex items-center justify-between sm:px-4"
        >
            <div className="flex items-center">
                <Button
                    variant={'ghost'}
                    onClick={() => router.back()}
                    size={'sm'}
                >
                    <ChevronLeft size={24} />
                </Button>

                <div
                    className="flex items-center gap-x-2 pl-2"
                >
                    <CoolAvatar src={companion.src} />

                    <div
                        className="flex flex-col justify-center"
                    >
                        <h1
                            className="text-primary/80 text-lg font-semibold"
                        >{companion.name}</h1>
                        <p
                            className="text-primary/40 text-sm"
                        >
                            created by {companion.userName}
                        </p>
                    </div>
                </div>
            </div>

            {
                companion.userId === user?.id && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant={'ghost'}
                                size={'sm'}
                            >
                                <MoreVertical size={24} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                                <DropdownMenuItem
                                    className="flex items-center cursor-pointer"
                                    onClick={() => router.push(`/companion/${companion.id}`)}
                                >
                                        <Edit size={16} className="mr-2" />
                                        Edit
                                </DropdownMenuItem>
                            
                            <DropdownMenuItem
                                className="flex items-center cursor-pointer"
                                onClick={onDelete}
                            >
                                    <Trash size={16} className="mr-2" />
                                    Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        </div>
    )
}

export default ChatHeader