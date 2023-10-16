'use client'

import { cn } from "@/lib/utils";
import CoolAvatar from "./cool-avatar";
import { useTheme } from "next-themes";

import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import CoolUserAvatar from "./cool-user-avatar";

export interface ChatMessageProps {
    role: "user" | "system";
    content: string;
    isLoading?: boolean;
    src: string;
}


const ChatMessage = ({role, content, isLoading, src}: ChatMessageProps) => {
  const {theme} = useTheme();

  const onCopy = () => {
    if(!content) return;

    navigator.clipboard.writeText(content);

    toast({
        description: "Copied to clipboard",
        duration: 2000
    })
  }

  return (
    <div className={cn("flex group my-2",
        role === "user" ? "justify-end" : "justify-start",
        "gap-x-2"
    )}>
        {
            role === "user" ? (
                <>
                    <p
                        className="rounded-md px-4 py-2 bg-primary/10 text-primary/80 text-sm max-w-sm flex items-center"
                    >
                        {!isLoading ? content : <BeatLoader color={theme === "light" ? "black" : "white"} size={8} />}
                    </p>
                   
                    <CoolUserAvatar/>
                </>
            ): 
            (
                <>
                    <CoolAvatar src={src} />
                    <p
                        className="rounded-md px-4 py-2 bg-primary/10 text-primary/80 text-sm max-w-sm flex items-center"
                    >
                        {!isLoading ? content : <BeatLoader color={theme === "light" ? "black" : "white"} size={8} />}
                    </p>
                </>
            )
        }

        <Button
            variant="ghost"
            className={cn("text-primary/60 opacity-0 transition-all duration-200",
                role === "user" ? "hidden" : "group-hover:opacity-100"
            )}
            onClick={onCopy}
        >
            <Copy size={16} />
        </Button>
    </div>
  )
}

export default ChatMessage