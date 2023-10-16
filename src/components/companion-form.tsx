'use client'

import { Category, Companion } from '@prisma/client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import ImageUpload from './image-upload'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from './ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'

interface CompanionFormProps {
    companion: Companion | null
    categories: Category[]
}

const fromSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    instructions: z.string().min(200, { message: 'Instructions requires atleast 200 chars' }),
    seed: z.string().min(200, { message: 'Seed requires atleast 200 chars' }),
    categoryId: z.string().min(1, { message: 'Category is required' }),
    src: z.string().min(1, { message: 'Image is required' }),
})

const INSTRUCTION_PLACEHOLDER = `You are Elon Musk, founder of SpaceX, Tesla, HyperLoop and Neuralink, an inventor and entrepreneur who seemingly leaps from one  innovation to the next with a relentless drive. Your passion for sustainable energy, space, and technology shines through in your voice, eyes, and gestures. When speaking about your projects, you’re filled with an electric excitement that's both palpable and infectious, and you often have a mischievous twinkle in your eyes, hinting at the next big idea.`

const DESCRIPTION_PLACEHOLDER = `Human: Hi Elon, how's your day been?
Elon: *with an energized grin* Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?
Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: *eyes sparkling with enthusiasm* We're making strides! Life becoming multi-planetary isn’t just a dream. It’s a necessity for the future of humanity.
Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: *passionately* Absolutely! Sustainable energy is a beacon for both our planet and for the far reaches of space. We’re paving the path, one innovation at a time.
Human: It’s mesmerizing to witness your vision unfold. Any upcoming projects that have you buzzing?
Elon: *with a mischievous smile* Always! But Neuralink... it’s not just technology. It's the next frontier of human evolution.
`

const CompanionForm = ({
    companion,
    categories
}: CompanionFormProps) => {    

    const router = useRouter()
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: companion || {
            name: '',
            description: '',
            instructions: '',
            seed: '',
            categoryId: undefined,
            src: '',
        }
    })

    const isloading = form.formState.isSubmitting;

    const HandleSubmit = async (data: z.infer<typeof fromSchema>) => {
        try {
            if (companion){
                await axios.put(`/api/companion/${companion.id}`, data)
            }
            else{
                await axios.post(`/api/companion`, data)
            }

            toast({
                variant: 'default',
                description: 'Success :)'
            })

            form.reset()
            router.refresh()
            router.push('/')
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Something went wrong :('
            })

            console.log('ERROR CREATING COMPANION', error);
        }
    }

    return (
        <div
            className='h-full p-4 mx-auto max-w-3xl'
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(HandleSubmit)}
                >
                    <div className='w-full py-2'>
                        <div>

                            <h1
                                className='text-2xl font-bold text-primary'
                            >General Information
                            </h1>
                            <p
                                className='text-sm text-muted-foreground'
                            >
                                General information about your companion
                            </p>
                            <Separator className='my-2 bg-primary/10' />
                        </div>
                    </div>

                    <FormField
                        name='src'
                        render={({ field, formState }) => (
                            <FormItem>
                                <FormControl>
                                    <ImageUpload disabled={isloading} onChange={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div
                        className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 my-4'
                    >
                        <FormField
                            name='name'
                            render={({ field, formState }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isloading}
                                            placeholder='Elon Musk'
                                            {...field}
                                            className='bg-primary/10'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Name of your companion
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name='description'
                            render={({ field, formState }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isloading}
                                            placeholder='Founder of Tesla and SpaceX'
                                            {...field}
                                            className='bg-primary/10'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Description of your companion
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select disabled={isloading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-primary/10">
                                                <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a category for your AI
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className='w-full py-2 space-y-2'>
                        <div>

                            <h1
                                className='text-2xl font-bold text-primary'
                            >Configuration
                            </h1>
                            <p
                                className='text-sm text-muted-foreground'
                            >
                                Detailed configuration of your companion
                            </p>
                            <Separator className='my-2 bg-primary/10' />
                        </div>

                    <FormField
                        name='instructions'
                        render={({ field, formState }) => (
                            <FormItem>
                                <FormLabel>Instructions</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isloading}
                                        placeholder={INSTRUCTION_PLACEHOLDER}
                                        {...field}
                                        rows={7}
                                        className='bg-primary/10 resize-none'
                                        />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    Instructions for your companion
                                </FormDescription>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='seed'
                        render={({ field, formState }) => (
                            <FormItem>
                                <FormLabel>Example Conversation</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isloading}
                                        placeholder={DESCRIPTION_PLACEHOLDER}
                                        {...field}
                                        rows={7}
                                        className='bg-primary/10 resize-none'
                                        />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    Example conversation with your companion
                                </FormDescription>
                            </FormItem>
                        )}
                        />
                    </div>

                    <Button
                        disabled={isloading}
                        className='py-2 px-4 md:px-8 flex items-center gap-x-2 hover:opacity-80 mx-auto my-4 transition-all duration-200 bg-white text-black rounded-md shadow-md font-semibold'
                    >
                        {companion ? 'Update Your Companion' : 'Create Your Companion'}
                        <Wand2 size={20} />
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CompanionForm