"use client"

import AddModal from '@/components/AddModal'
import Searchbar from '@/components/Searchbar'
import { Button } from '@/components/ui/button'
// import { students } from '@/constants'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CSVLink } from 'react-csv'

const Students = ({ searchParams: { search } }: { searchParams: { search: string } }) => {
  const router = useRouter()
  const studentData = useQuery(api.student.getStudentBySearch, { search: search || '' })
  const students = useQuery(api.student.getAllStudents)

  const [attendance, setAttendance] = useState([])

  return (
    <section className='flex size-full flex-col gap-3 m-2 text-white'>
      {/* <div className='grid grid-cols-5 border'> */}
      <Searchbar />
      <div className='flex max-md:flex-col gap-2'>
        <div className='md:w-[68%] rounded-2xl bg-dark-3'>
          <div className='grid grid-cols-5 mt-3 pb-3 max-md:grid-cols-3 border-b place-items-center gap-5'>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Student ID</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Student Name</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1 max-md:hidden'>Father Name</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1 max-md:hidden'>Attendance</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Download</h2>
          </div>
          {/* {students?.map(({studentID, name, father, attend }) => ( */}
          {students?.map(({ studentId, firstname, lastname, fathername, _id, cns, eeb, se, adsa, ip }) => (
            <div className='grid grid-cols-5 max-md:grid-cols-3 gap-5 py-2 place-items-center' key={studentId}>
              <div>
                <p className='max-md:text-[14px]'>{studentId}</p>
              </div>
              <div>
                <p className='text-[14px] cursor-pointer' onClick={() => router.push(`/teacher/student/${_id}`)}>{firstname} {lastname}</p>
              </div>
              <div className='max-md:hidden'>
                <p>{fathername}</p>
              </div>
              <div className='max-md:hidden'>
                <p>{((cns + eeb + se + adsa + ip) / 5) * 10}%</p>
              </div>
              <div>
                <Button className='bg-orange-1'>
                  <CSVLink data={`
                  Software Engineering:      ${se}
                  Advance Data Structure:    ${adsa}
                  Internet Programming:      ${ip} 
                  Computer Network Security: ${cns} 
                  Entrepreneurship:          ${eeb}
                  `} filename={`${firstname} ${lastname}`}>
                    Report
                  </CSVLink>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className='md:w-[30%] rounded-2xl bg-dark-3 p-2 mr-2'>
          <AddModal />
        </div>
      </div>
    </section>
  )
}

export default Students