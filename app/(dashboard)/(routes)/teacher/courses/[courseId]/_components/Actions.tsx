"use client"

import ConfirmModal from '@/components/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { useConfetti } from '@/hooks/useConfetti';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean
}

const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const confetti = useConfetti()

    const onClick = async() => {
        try {
            setIsLoading(true);

            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("Course unpublished")
            } else{
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course published")
            }

        } catch (error) {
            confetti.onOpen()
            router.refresh()
            toast.success("Updated")
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async() => {
        try {
            setIsLoading(true)

            await axios.delete(`/api/courses/${courseId}`)
            toast.success("Course deleted")
            router.refresh()
            router.push(`/teacher/courses`)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex items-center gap-x-2'>
            <Button onClick={onClick} disabled={disabled || isLoading} variant="outline" size='sm'>
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size='sm' disabled={isLoading}>
                    <Trash className='h-4 w-4' />
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default Actions