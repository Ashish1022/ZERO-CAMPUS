"use client"

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({children}:{children:React.ReactNode}) => {

    const [videoCall, setVideoCall] = useState<StreamVideoClient>();

    const { user, isLoaded} = useUser()

    useEffect(()=>{
        if(!user || !isLoaded) return;
        if(!apiKey) throw new Error('Stream api key missing')

        const client = new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user?.username || user?.id,
                image: user?.imageUrl
            },
            tokenProvider,
        })
        setVideoCall(client)
    },[user, isLoaded]);

    if(!videoCall) return <Loader/>

    return (
        <StreamVideo client={videoCall}>
            {children}
        </StreamVideo>
    );
};

export default StreamVideoProvider;