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
    name: z.string().min(2),
    subject: z.string().min(2),
    email: z.string().min(2),
    salary: z.string().min(2),
    contact: z.string().min(2),
    class: z.string().min(2),
    address: z.string().min(2),
    teacherid: z.string().min(2),
    password: z.string().min(8),
})

const AddModal = () => {

    const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [IsSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const createTeacher = useMutation(api.teacher.createTeacher);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            email: "",
            salary: "",
            contact: "",
            address: "",
            teacherid: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            if (!imageUrl) {
                toast({ title: 'Please upload teacher photo', variant: 'destructive' })
                setIsSubmitting(false)
                throw new Error("Please upload teacher photo")
            }

            const teacher = createTeacher({
                name: data.name,
                subject: data.subject,
                email: data.email,
                salary: data.salary,
                contact: data.contact,
                address: data.address,
                imageUrl: imageUrl,
                teacherId: data.teacherid,
                password: data.password
            })
            toast({ title: "Teacher added" })
            setIsSubmitting(false)

        } catch (error) {
            console.log(error)
            toast({ title: 'Error', variant: 'destructive' })
            setIsSubmitting(false)
        }
        console.log(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teacher Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Teacher Name" {...field} className="input-class focus-visible:ring-offset-orange-1" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-6">
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="Subject" {...field} className="input-class focus-visible:ring-offset-orange-1" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="teacherid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teacher Id</FormLabel>
                                <FormControl>
                                    <Input placeholder="Teacher Id" {...field} className="input-class focus-visible:ring-offset-orange-1" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} className="input-class" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-6">
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Salary</FormLabel>
                                <FormControl>
                                    <Input placeholder="Salary" {...field} className="input-class" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contact" {...field} className="input-class" />
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
                            <FormLabel>Teacher Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Teacher Address" {...field} className="input-class" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} className="input-class" />
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
                {/* <div className="mt-2 w-full">
                    <Button type="submit" className="text-16 w-full bg-orange-1 rounded-lg py-2 font-extrabold transition-all duration-500 hover:bg-black-1 max-md:mb-8">
                        {IsSubmitting ? (
                            <>
                                Submitting
                                <Loader size={20} className="animate-spin ml-3" />
                            </>
                        ) : (
                            "Add teacher"
                        )}
                    </Button>
                </div> */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default AddModal