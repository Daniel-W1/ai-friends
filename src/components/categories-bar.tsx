'use client'

import { Category } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

interface CategoriesBarProps {
    categories: Category[]
}

const CategoriesBar = ({
    categories
}: CategoriesBarProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get('categoryId')
    const name = searchParams.get('name')

    const HandleClick = (id: string | null) => {
        const query = {
            categoryId: id,
            name: name
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query: query
        },
            {
                skipEmptyString: true,
                skipNull: true
            }
        )

        router.push(url)
    }

    
    return (
        <div
            className='flex items-center gap-x-2 overflow-x-auto no-scrollbar'
        >
            <button
                className={cn('px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm rounded-lg hover:opacity-80 ',
                    categoryId === null ? 'bg-primary/40' : 'bg-primary/10')}

                onClick={() => HandleClick(null)}
            >
                Newest
            </button>

            {
                categories.map((category) => (
                    <button
                        className={cn('px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm rounded-lg hover:opacity-80',
                            categoryId === category.id ? 'bg-primary/40' : 'bg-primary/10'
                        )}
                        key={category.id}
                        onClick={
                            () => HandleClick(category.id)
                        }
                    >
                        {category.name}
                    </button>
                ))
            }
        </div>
    )
}

export default CategoriesBar