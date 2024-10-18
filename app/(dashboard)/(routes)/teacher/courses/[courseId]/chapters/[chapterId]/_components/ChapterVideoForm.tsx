"use client"

import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'


import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react'

import { Chapter, Course, MuxData } from '@prisma/client'
import Image from 'next/image'
import FileUpload from '@/components/FileUpload'
import MuxPlayer from '@mux/mux-player-react'

const formSchema = z.object({
    videoUrl: z.string().min(1)
})

interface ChapterVideoFormProps {

    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string
}

const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current)=>!current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated")
            toggleEdit();
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
        console.log(values)
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Chapter video
                <Button variant='ghost' onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.VideoUrl &&(
                        <>
                            <PlusCircle className='h-4 w-4 mr-2'/>
                            Add an video
                        </>
                    )}
                    {!isEditing &&  initialData.VideoUrl &&(
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit video
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.VideoUrl ? (
                    <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                        <Video className='h-10 w-10 text-slate-500'/>
                    </div>
                ):(
                    <div className='relative aspect-video mt-2'>
                        <MuxPlayer
                            playbackId={initialData.muxData?.playbackId || ""}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url)=>{
                            if(url){
                                onSubmit({videoUrl: url});
                            }
                        }}
                    />
                    <div className='text-xs text-muted-foreground mt-4'>
                        1Upload this chapter's video
                    </div>
                </div>
            )}
            {initialData.VideoUrl && !isEditing && (
                <div className='text-xs text-muted-foreground mt-2'>
                    Videos can take a few minutes to process. Refresh the page if video does not appear.
                </div>
            )}
        </div>
    )
}

export default ChapterVideoForm