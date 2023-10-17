'use client'

import axios from "axios"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { useState } from "react"
import { Sparkles } from "lucide-react"

interface SettingsButtonProps {
    isPro: boolean
}

const SettingsButton = ({isPro}: SettingsButtonProps) => {

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/stripe');
            window.location.href = response.data.url;
        } catch (error) {
            toast({
                description: 'Something went wrong. Please try again later.',
                variant: 'default',
                duration: 3000,
            })

            console.log('ERROR SUBSCRIBING', error);

        } finally{
            setLoading(false);
        }
    }
  return (
    <Button
        variant={isPro ? 'default' : 'premium'}
        size={'sm'}
        disabled={loading}
        onClick={handleClick}
    >
        {isPro ? 'Manage Subscription' : 'Upgrade'}
        {!isPro && <Sparkles className='ml-2 fill-white w-4 h-4' />}
    </Button>
  )
}

export default SettingsButton