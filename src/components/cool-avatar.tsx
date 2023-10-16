import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface CoolAvatarProps {
    src: string
}

const CoolAvatar = ({
    src
}: CoolAvatarProps) => {
  return (
    <div>
        <Avatar>
            <AvatarImage src={src} />
        </Avatar>
    </div>
  )
}

export default CoolAvatar