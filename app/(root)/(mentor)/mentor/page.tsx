import HomeBox from '@/components/HomeBox'
import MeetingBox from '@/components/MeetingBox'
import React from 'react'

const Home = () => {

  const now = new Date()

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const date = (new Intl.DateTimeFormat('en-us', { dateStyle: 'full' })).format(now)

  return (
    <section className='flex size-full flex-col gap-3 text-white'>
      <div className='h-[250px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded-xl py-2 text-center text-base font-normal'>Upcoming meeting at 12:30</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-5xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-300'>
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingBox/>
    </section>
  )
}

export default Home