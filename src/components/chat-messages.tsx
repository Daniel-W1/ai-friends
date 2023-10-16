'use client'

import { Companion } from "@prisma/client"
import ChatMessage, { ChatMessageProps } from "./chat-message"
import { useEffect, useRef, useState } from "react"

interface ChatMessagesProps {
    messages: ChatMessageProps[],
    isLoading: boolean
    companion: Companion
}

const ChatMessages = ({companion, isLoading, messages}: ChatMessagesProps) => {
  const [fakeLoading, setFakeLoading] = useState(false);
  const lastSpotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(messages.length === 0){
        setFakeLoading(true)
        setTimeout(() => {
            setFakeLoading(false);
        }, 1000);
    }
    }, []);

    useEffect(() => {
        if(!lastSpotRef.current) return;

        lastSpotRef.current.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

  return (
    <div
        className="flex-1 flex-col gap-y-2 overflow-y-auto py-4 px-2 md:px-6 no-scrollbar"
    >
        <ChatMessage
            content={`Hi there! I'm ${companion.name}. ${companion.description}`}
            role="system"
            isLoading={fakeLoading}
            src={companion.src}
        />

        {
            messages.map((message, i) => (
                <ChatMessage
                    key={i}
                    {...message}
                    src={companion.src}
                />
            ))
        }

        {
            isLoading && (
                <ChatMessage
                    role="system"
                    content="Thinking..."
                    isLoading={true}
                    src={companion.src}
                />
            )
        }

        <div ref={lastSpotRef}></div>
    </div>
  )
}

export default ChatMessages