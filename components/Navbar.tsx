import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
        <p className='text-[24px] font-extrabold text-white tracking-wider max-md:text-[20px]'>ZERO | CAMPUS</p>
      </Link>
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <MobileNav />
      </div>
    </div>
  )
}

export default Navbar