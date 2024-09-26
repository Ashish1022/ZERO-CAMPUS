"use client"

import Loader from '@/components/Loader'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const StudentDetails = ({ params }: { params: { studentId: Id<'student'> } }) => {

  const studentData = useQuery(api.student.getStudentById, { studentId: params.studentId })

  if (!studentData?.imageUrl) return <Loader />

  return (
    <section className='flex flex-col gap-2'>
      <h1 className="text-[24px] font-bold text-white-1 max-md:text-center">Student Profile</h1>
      <div className='flex'>
        <Image src={studentData?.imageUrl!} alt='student' width={170} height={200} className='aspect-square rounded-xl border-[8px] border-dark-3 mt-1' />
        <div className='flex flex-col pl-4 gap-3'>
          <h1 className='text-[20px] font-bold'>{studentData.firstname} {studentData.fathername} {studentData.lastname}</h1>
          <p className='text-[14px]'>Student Id: {studentData.studentId}</p>
          <p className='text-[14px]'>Branch: {studentData.class}</p>
          <p className='text-[14px]'>DOB: 22/10/2004</p>
          <p className='text-[14px]'><span className='font-bold'>Address:</span> {studentData.address}</p>
        </div>
      </div>
      <h1 className="text-[20px] font-bold text-white-1 max-md:text-center mt-1">Student Attendance</h1>
      <div className='space-y-2'>
        <div className='bg-[#7cf5f9] w-[25%] rounded-2xl text-black p-2 flex relative'>
          <h1 className='font-bold'>Internet Programming: </h1>
          <span className='absolute right-6 font-bold'>{(studentData.ip/10)*100}%</span>
        </div>
        <div className='bg-[#7cf5f9] w-[25%] rounded-2xl text-black p-2 flex relative'>
          <h1 className='font-bold'>Software Engineering: </h1>
          <span className='absolute right-6 font-bold'>{(studentData.se/10)*100}%</span>
        </div>
        <div className='bg-[#7cf5f9] w-[25%] rounded-2xl text-black p-2 flex relative'>
          <h1 className='font-bold'>EEB: </h1>
          <span className='absolute right-6 font-bold'>{(studentData.eeb/10)*100}%</span>
        </div>
        <div className='bg-[#7cf5f9] w-[25%] rounded-2xl text-black p-2 flex relative'>
          <h1 className='font-bold'>Computer Network: </h1>
          <span className='absolute right-6 font-bold'>{(studentData.cns/10)*100}%</span>
        </div>
        <div className='bg-[#7cf5f9] w-[25%] rounded-2xl text-black p-2 flex relative'>
          <h1 className='font-bold'>Advance DSA: </h1>
          <span className='absolute right-6 font-bold'>{(studentData.adsa/10)*100}%</span>
        </div>
      </div>
    </section>
  )
}

export default StudentDetails