"use client"

import React from 'react'

import * as z from 'zod';
import axios, { formToJSON } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import {
    Form,
    FormControl,
    FormLabel,
    FormDescription,
    FormField,
    FormMessage,
    FormItem
} from '@/components/ui/form'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})

const page = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: ""
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post('/api/courses', values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course Created")
        }catch(error){
            toast.error("Something went wrong")
        }
        // console.log(values)
    }

  return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 '>
        <div>
            <h1 className='text-2xl'>Name Your Course</h1>
            <p className='text-sm text-slate-600'>
                What would you like to name your course? 
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Course Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Advanced Web Development'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What you will teach in this course?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-x-2'>
                        <Link href='/'>
                            <Button variant='ghost' type='button'>
                                Cancel
                            </Button>
                        </Link>
                        <Button type='submit' disabled={!isValid || isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default page