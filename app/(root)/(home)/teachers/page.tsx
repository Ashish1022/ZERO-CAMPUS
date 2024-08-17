
import Searchbar from '@/components/Searchbar'
import TeacherAddModal from '@/components/TeacherAddModal'
import { Button } from '@/components/ui/button'
import { teacher } from '@/constants'
import React from 'react'

const Teachers = () => {
  return (
    <section className='flex size-full flex-col gap-3 text-white'>
      {/* <div className='grid grid-cols-5 border'> */}
      <Searchbar/>
      <div className='flex max-md:flex-col gap-3 overflow-y-auto'>
        <div className='md:w-[70%] rounded-2xl bg-dark-3'>
          <div className='grid grid-cols-4 mt-3 pb-3 max-md:grid-cols-3 border-b place-items-center gap-5'>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Teacher Name</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1 max-md:hidden'>Email</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Contact</h2>
            <h2 className='max-md:text-[14px] font-bold text-orange-1'>Action</h2>
          </div>
          {teacher?.map(({name, email, contact, teacherId}) => (
          // {students?.map(({studentId, firstname, lastname, fathername }) => (
            <div className='grid grid-cols-4 max-md:grid-cols-3 gap-5 py-2 place-items-center' key={teacherId}>
              <div>
                <p className='max-md:text-[14px]'>{name}</p>
              </div>
              <div className='max-md:hidden'>
                <p>{email}</p>
              </div>
              <div className=''>
                <p>{contact}</p>
              </div>
              <div>
                <Button className='bg-orange-1'>Delete</Button>
              </div>
            </div>
          ))}
        </div>
        <div className='md:w-[30%] rounded-2xl bg-dark-3 p-2 h-fit'>
          <TeacherAddModal />
        </div>
      </div>
    </section>
  )
}

export default Teachers