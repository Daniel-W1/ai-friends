'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from './ui/use-toast'

const ProModal = () => {
    const proModal = useProModal()
    const [loading, setLoading] = useState(false)
    

    const onSubscribe = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe');

            window.location.href = response.data.url;
        } catch (error) {
            toast({
                variant: 'destructive',
                description:'Something went wrong. Please try again later.'
            })

            console.log('ERROR SUBSCRIBING', error);
            
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.closeModal}
        >
            <DialogContent>
                <DialogHeader
                    className='flex flex-col justify-center items-center'
                >
                    <DialogTitle>Upgrade to Pro</DialogTitle>
                    <DialogDescription
                        className='text-sm text-primary/50'
                    >
                        create
                        <span
                            className='text-blue-600 mx-2'
                        >
                            Custom AI
                        </span>
                        components!
                    </DialogDescription>
                </DialogHeader>

                <Separator />

                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        $9<span className="text-sm font-normal ">.99 / mo</span>
                    </p>
                    <Button onClick={onSubscribe} disabled={loading} variant="premium">
                        Subscribe
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default ProModal