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
    <section className='flex flex-col'>
      <h1 className="text-[24px] font-bold text-white-1 max-md:text-center">Student Profile</h1>
      <div className='flex mt-4'>
        <Image src={studentData?.imageUrl!} alt='student' width={200} height={200} className='aspect-square rounded-xl border-[8px] border-dark-3'/>
        <h1 className='pl-4'>{studentData.firstname} {studentData.lastname}</h1>
      </div>
    </section>
  )
}

export default StudentDetails