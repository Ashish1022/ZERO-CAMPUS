"use client"


import React, { useState } from 'react'
import MeetingCard from './MeetingCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';


const MeetingBox = () => {

    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const [callDetails, setCallDetails] = useState<Call>()

    const router = useRouter();

    const {user} = useUser()

    const client = useStreamVideoClient();

    const [values, setValues] = useState({
        dateTime: new Date,
        description:'',
        link:''
    })

    const createMeeting = async() => {
        if(!client || !user) return;

        try{
            const id = crypto.randomUUID();
            const call = client.call('default', id)

            if(!call) throw new Error('Failed to create call')

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()

            const description = values.description || 'InstantMeeting'

            await call.getOrCreate({
                data:{
                    starts_at: startsAt,
                    custom:{
                        description
                    }
                }
            })

            setCallDetails(call)

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <section className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'>
            <MeetingCard
                img='/icons/add-meeting.svg'
                title='New Meeting'
                description='Start an instant meeting'
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-1'
            />
            <MeetingCard
                img='/icons/schedule.svg'
                title='Schedule Meeting'
                description='Plan your meeting'
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-blue-1'
            />
            <MeetingCard
                img='/icons/recordings.svg'
                title='View recordings'
                description='Check out your recording'
                handleClick={() => router.push('/recordings')}
                className='bg-purple-1'
            />
            <MeetingCard
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                description='Via invitation link'
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className='bg-yellow-1'
            />
            <MeetingModal
                isOpen={meetingState==='isInstantMeeting'}
                onClose={()=>setMeetingState(undefined)}
                title='Start an instant meeting'
                className='text-center'
                buttonText='Start meeting'
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingBox