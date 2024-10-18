import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const StudentAttendanceCard = ({ firstname, lastname, imageUrl, studentId }: { firstname: string; lastname: string; imageUrl: string; studentId: Id<'student'> }) => {

    const updateAttendance = useMutation(api.student.markAttendance)
    const cancelAttendance = useMutation(api.student.cancelAttendance)

    const handleUpdateClick = () => {
        updateAttendance({studentId})
    }

    const handleCancelClick = () => {
        cancelAttendance({studentId})
    }

    return (
        <div className='bg-dark-3 p-4 rounded-xl flex items-center flex-col gap-2'>
            <div className='flex flex-col items-center gap-2'>
                <Image src={imageUrl} alt='student' width={65} height={70} className='aspect-square rounded-xl'/>
                <p className='text-white truncate'>{firstname} {lastname}</p>
            </div>
            <div className='flex gap-5'>
                <Button className='bg-green-500 border' onClick={handleUpdateClick}>P</Button>
                <Button className='bg-red-500 border' onClick={handleCancelClick}>A</Button>
            </div>
        </div>
    )
}

export default StudentAttendanceCard