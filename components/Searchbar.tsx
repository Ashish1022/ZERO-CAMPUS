'use client'

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter(); 
  const pathname = usePathname();

  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    if(debouncedValue) {
      router.push(`/teachers/students?search=${debouncedValue}`)
    } else if (!debouncedValue && pathname === '/discover') router.push('/discover')
  }, [router, pathname, debouncedValue])

  return (
    <div className="relative block">
      <Input 
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
        placeholder='Search for students'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch('')}
      />
      <Image 
        src="/icons/search.svg"
        alt="search"
        height={20}
        width={20}
        className="absolute left-4 top-3.5"
      />
    </div>
  )
}

export default Searchbar