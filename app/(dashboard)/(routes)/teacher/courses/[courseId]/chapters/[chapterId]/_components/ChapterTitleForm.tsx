"use client"

import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import {
    Form,
    FormControl,
    FormMessage,
    FormItem,
    FormField
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'

const formSchema = z.object({
    title: z.string().min(1)
})

interface ChapterTitleFormProps {


    initialData: {
        title: string
    };
    courseId: string;
    chapterId: string
}

const ChapterTitleForm = ({ initialData, courseId, chapterId }: ChapterTitleFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current)=>!current);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Course Created")
            toggleEdit();
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
        // console.log(values)
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Chapter Title
                <Button variant='ghost' onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit title
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className='text-sm mt-2'>
                    {initialData.title}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field })=>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center gap-x-2'>
                            <Button
                                disabled={!isValid || isSubmitting}
                                type='submit'
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default ChapterTitleForm