'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import useDebounce from '@/hooks/use-debounce'
import qs from 'query-string'


const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const catagoryId = searchParams.get('catagoryId')
    const name = searchParams.get('name')

    const [search, setSearch] = useState('')
    const debouncedValue = useDebounce(search, 500)
    
    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const query = {
            catagoryId: catagoryId,
            name: debouncedValue
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
        
    }, [debouncedValue, catagoryId, name])
    
    return (
        <div
        className='w-full h-16 relative'
        >
            <Search size={22} className='absolute top-3  left-2' />
            <Input placeholder={'Search...'}
                className='bg-primary/10 pl-10 h-12 text-lg'
                value={search}
                onChange={HandleChange}
                />
        </div>
    )
}

export default SearchBar