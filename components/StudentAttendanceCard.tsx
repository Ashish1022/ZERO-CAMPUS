import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';

const StudentAttendanceCard = ({ firstname, lastname, imageUrl }: { firstname: string; lastname: string; imageUrl: string }) => {
    return (
        <div className='bg-dark-4 p-4 rounded-xl flex items-center flex-col gap-2'>
            <div className='flex flex-col items-center gap-2'>
                <Image src={imageUrl} alt='student' width={65} height={70} className='aspect-square rounded-xl'/>
                <p className='text-white'>{firstname} {lastname}</p>
            </div>
            <div className='flex gap-5'>
                <Button className='bg-green-600'>P</Button>
                <Button className='bg-gray-600'>A</Button>
            </div>
        </div>
    )
}

export default StudentAttendanceCard