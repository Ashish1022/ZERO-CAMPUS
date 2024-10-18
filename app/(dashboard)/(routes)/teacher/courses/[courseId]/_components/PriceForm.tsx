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
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Course } from '@prisma/client'
import { formatPrice } from '@/lib/format'

const formSchema = z.object({
    price: z.coerce.number()
})

interface PriceFormProps {

    initialData: Course
    courseId: string;
}

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current)=>!current);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
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
                Course price
                <Button variant='ghost' onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit price
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn('text-sm mt-2',!initialData.price && "text-slate-500 italic")}>
                    {initialData.price ? formatPrice(initialData.price) : "No price"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='price'
                            render={({ field })=>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder='Set a price for your course'
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

export default PriceForm