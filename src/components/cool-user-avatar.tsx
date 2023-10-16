'use client'

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs";

const CoolUserAvatar = () => {
  const {user} = useUser();
    
  return (
    <div>
        <Avatar>
            <AvatarImage src={user?.imageUrl} />
        </Avatar>
    </div>
  )
}

export default CoolUserAvatar