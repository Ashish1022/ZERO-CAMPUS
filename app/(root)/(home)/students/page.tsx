"use client"

import AddModal from '@/components/AddModal'
import Searchbar from '@/components/Searchbar'
import { Button } from '@/components/ui/button'
// import { students } from '@/constants'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Students = ({ searchParams: { search} }: { searchParams : { search: string }}) => {
  const router = useRouter()
  const studentData = useQuery(api.student.getStudentBySearch, {search : search || ''})
  const students = useQuery(api.student.getAllStudents)

  return (
    <section className='flex size-full flex-col gap-3 text-white'>
      {/* <div className='grid grid-cols-5 border'> */}
      <Searchbar/>
      <div className='flex max-md:flex-col gap-3'>
        <div className='md:w-[70%] rounded-2xl bg-dark-3'>
          <div className='grid grid-cols-5 mt-3 pb-3 max-md:grid-cols-3 border-b place-items-center gap-5'>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Student ID</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Student Name</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1 max-md:hidden'>Father Name</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1 max-md:hidden'>Attendance</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Download</h2>
          </div>
          {/* {students?.map(({studentID, name, father, attend }) => ( */}
          {students?.map(({studentId, firstname, lastname, fathername, _id }) => (
            <div className='grid grid-cols-5 max-md:grid-cols-3 gap-5 py-2 place-items-center' key={studentId}>
              <div>
                <p className='max-md:text-[14px]'>{studentId}</p>
              </div>
              <div>
                <p className='max-md:text-[14px] cursor-pointer' onClick={()=>router.push(`student/${_id}`)}>{firstname} {lastname}</p>
              </div>
              <div className='max-md:hidden'>
                <p>{fathername}</p>
              </div>
              <div className='max-md:hidden'>
                <p>Not specified</p>
              </div>
              <div>
                <Button className='bg-orange-1'>Report</Button>
              </div>
            </div>
          ))}
        </div>
        <div className='md:w-[30%] rounded-2xl bg-dark-3 p-2'>
          <AddModal />
        </div>
      </div>
    </section>
  )
}

export default Students