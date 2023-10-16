'use client'

import { useEffect, useState } from "react"

const UseDebounce = (value: string, time: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value.trim());
        }, time);
        return () => {
            clearTimeout(timeout);
        }
    }
    , [value, time])
  
  return debouncedValue;
}

export default UseDebounce