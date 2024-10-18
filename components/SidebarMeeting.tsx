"use client"


import {  sidebarLinksMeeting } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

  const pathName = usePathname();

  return (
    <section className='sticky left-0 top-0 flex rounded-xl h-[85vh] ml-2 mt-2 bg-dark-1 w-fit flex-col justify-between p-3 text-white-1 max-sm:hidden lg:w-[250px]'>
      <div className='flex flex-1 flex-col gap-2'>
        {sidebarLinksMeeting.map(({route, label, imgURL})=>{

          const isActive = pathName === route || route.startsWith(`${route}/`)

          return <Link href={route} key={route} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',{
            'bg-blue-1':isActive
          })}>
            <Image src={imgURL} alt='img' width={23} height={23}/>
            <p className='text-md font-normal max-lg:hidden text-white'>{label}</p>
          </Link>
        })}
      </div>
    </section>
  )
}

export default Sidebar