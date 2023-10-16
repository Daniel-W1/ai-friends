import ChatPage from '@/components/chat-page'
import db from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface ChatPageProps {
    params: {
        chatId: string
    }
}

const ChatRootPage = async ({ params }: ChatPageProps) => {
    const { userId } = auth();

    if(!userId) {
        return redirectToSignIn();
    }

    const companion = await db.companion.findUnique({
        where: {
            id: params.chatId
        },

        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc'
                },
                where: {
                    userId: userId!
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    if (!companion) {
        return redirect("/");
    }
    

    return (
        <ChatPage data={companion!}/>
    )
}

export default ChatRootPage
