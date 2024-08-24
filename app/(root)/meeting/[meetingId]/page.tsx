"use client"


import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const page = ({params}:{params:{meetingId:string}}) => {

  const {user, isLoaded} = useUser();

  const [isSetupComplete, setIsSetupComplete] = useState(false)

  return (
    <main className='h-screen w-full'>
      <StreamCall>
        <StreamTheme>
          {isSetupComplete ? (
            <MeetingSetup/>
          ):(
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default page