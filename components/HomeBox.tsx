"use client"



import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'

const HomeBox = () => {

    const [meetingState, setMeetingState] = useState();

    return (
        <section className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img='/icons/student.svg'
                title='2'
                description='Students'
                handleClick={() => { }}
                className='bg-green-400'
            />
            <HomeCard
                img='/icons/teacher.svg'
                title='2'
                description='Teachers'
                handleClick={() => { }}
                className='bg-purple-400'
            />
            <HomeCard
                img='/icons/classes.svg'
                title='2'
                description='Classes'
                handleClick={() => { }}
                className='bg-orange-400'
            />
            <HomeCard
                img='/icons/profile.svg'
                title='2'
                description='Students present today'
                handleClick={() => { }}
                className='bg-yellow-400'
            />
        </section>
    )
}

export default HomeBox