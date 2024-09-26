"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import PictureModal from "./PictureModal"
import { useState } from "react"
import { Id } from "@/convex/_generated/dataModel"
import { Loader } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "./ui/use-toast"
const formSchema = z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    fathername: z.string().min(2),
    fathercontact: z.string().min(2),
    studentid: z.string().min(2),
    class: z.string().min(2),
    address: z.string().min(2),
})

const AddModal = () => {

    const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [IsSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const createStudent = useMutation(api.student.createStudent)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            fathername: "",
            fathercontact: "",
            studentid: "",
            class: "",
            address: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            if (!imageUrl) {
                toast({ title: 'Please upload student photo', variant: 'destructive' })
                setIsSubmitting(false)
                throw new Error("Please upload student photo")
            }

            const student = createStudent({
                firstname: data.firstname,
                lastname: data.lastname,
                fathername: data.fathername,
                fathercontact: data.fathercontact,
                studentId: data.studentid,
                class: data.class,
                address: data.address,
                imageUrl: imageUrl,
                ip: 0,
                adsa: 0,
                eeb: 0,
                se: 0,
                cns: 0
            })
            toast({ title: "Student added" })
            setIsSubmitting(false)

        } catch (error) {
            console.log(error)
            toast({ title: 'Error', variant: 'destructive' })
            setIsSubmitting(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div className="flex gap-6">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} className="input-class focus-visible:ring-offset-orange-1" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} className="input-class focus-visible:ring-offset-orange-1" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="fathername"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Father Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Father Name" {...field} className="input-class" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fathercontact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Father Contact</FormLabel>
                            <FormControl>
                                <Input placeholder="Father Contact" {...field} className="input-class" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-6">
                    <FormField
                        control={form.control}
                        name="studentid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Student ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Student ID" {...field} className="input-class" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="class"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Class</FormLabel>
                                <FormControl>
                                    <Input placeholder="Class" {...field} className="input-class" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Student Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Student Address" {...field} className="input-class" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <PictureModal
                    setImage={setImageUrl}
                    setImageStorageId={setImageStorageId}
                    image={imageUrl}
                />
                <div className="mt-2 w-full">
                    <Button type="submit" className="text-16 w-full bg-orange-1 rounded-lg py-2 font-extrabold transition-all duration-500 hover:bg-black-1 max-md:mb-8">
                        {IsSubmitting ? (
                            <>
                                Submitting
                                <Loader size={20} className="animate-spin ml-3" />
                            </>
                        ) : (
                            "Add student"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default AddModal