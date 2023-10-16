'use client'

import { ChangeEvent, FormEvent } from "react"
import { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface ChatFormProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
  isLoading: boolean;
}


const ChatForm = ({
  value, onChange, onSubmit, isLoading
}: ChatFormProps) => {
  return (
    <form onSubmit={onSubmit} 
      className="flex items-center gap-x-2 px-2 sm:px-6"
    >
      <Input
        placeholder="Type a message..."
        value={value}
        onChange={onChange}
        disabled={isLoading}
        className="rounded-lg bg-primary/10 h-12"
      />

      <Button
        variant='ghost'
        disabled={isLoading}
      >
        <SendHorizonal size={22} />
      </Button>
    </form>
  )
}

export default ChatForm