"use client"

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'


const MobileNav = () => {

    const pathName = usePathname();

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image src='/icons/hamburger.svg' width={34} height={34} alt='hamburger' className='cursor-pointer sm:hidden'/>
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-dark-1'>
                    <Link href='/' className='flex items-center gap-1'>
                        <p className='text-[24px] font-extrabold text-white tracking-wider max-md:text-[20px]'>ZERO | CAMPUS</p>
                    </Link>
                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map(({ route, label, imgUrl }) => {

                                    const isActive = pathName === route || route.startsWith(`${route}/`)

                                    return (
                                        <SheetClose asChild key={route}>
                                            <Link href={route} key={route} className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                                                'bg-blue-1': isActive
                                            })}>
                                                <Image src={imgUrl} alt='img' width={20} height={20} />
                                                <p className='text-md font-normal text-white'>{label}</p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>

                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav