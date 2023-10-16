'use client'

import { Companion, Message } from "@prisma/client"
import ChatHeader from "./chat-header"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { useCompletion } from 'ai/react';
import ChatForm from "./chat-form"
import ChatMessages from "./chat-messages"


interface ChatPageProps {
    data: Companion & {
        messages: Message[],
        _count: {
            messages: number
    }}
}

const ChatPage = ({data}: ChatPageProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any>(data.messages);

  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput
  } =  useCompletion({
    api: `/api/chat/${data.id}`,
    onFinish: (_prompt, completion) => {    
      
      console.log(completion);
      
      const systemMessage = {
        role: "system",
        content: completion
      };

      setMessages((current: any)=> [...current, systemMessage]);
      setInput("");

      router.refresh();
    }
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const usermessage = {
      role: "user",
      content: input
    };

    setMessages((current: any)=> [...current, usermessage]);
    setInput("");
    handleSubmit(e);
  }


  return (
    <div
        className="flex flex-col h-screen max-w-4xl mx-auto pb-6"
    > 
        <ChatHeader companion={data} />

        <ChatMessages
            companion={data}
            isLoading={isLoading}
            messages={messages}
        />

        <ChatForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            onChange={handleInputChange}
            value={input}
        />
    </div>
  )
}

export default ChatPage