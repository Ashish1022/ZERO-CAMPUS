"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import StudentAttendanceModal from "@/components/StudentAttendanceModal"
import { useState } from "react"
import { useQueries, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import StudentAttendanceCard from "@/components/StudentAttendanceCard"

const formSchema = z.object({
  class: z.string(),
  date: z.string(),
})

const Attendence = () => {

  const [date, setDate] = React.useState<Date>();
  const [showStudents, setShowStudents] = useState(false);

  const [stuClass, setStuClass] = useState('')

  const students = useQuery(api.student.getAllStudents);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class: "",
      date: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const handleClick = () => {
    setShowStudents(!showStudents)
  }

  return (
    <section className='flex size-full flex-col gap-3 p-2 m-2'>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-5 w-full max-md:flex-col">
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem className="md:w-[25%]">
                    <FormLabel className="font-bold tracking-wide text-[16px]">Select Class</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select Class"/>
                        </SelectTrigger>
                        <SelectContent className="bg-dark-1">
                          <SelectItem value="ip" className="text-white">IP</SelectItem>
                          <SelectItem value="cns" className="text-white">CNS</SelectItem>
                          <SelectItem value="adsa" className="text-white">ADSA</SelectItem>
                          <SelectItem value="se" className="text-white">SE</SelectItem>
                          <SelectItem value="eeb" className="text-white">EEB</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="md:w-[25%] flex flex-col">
                    <FormLabel className="font-bold tracking-wide text-[16px]">Attendance Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-dark-2 md:mx-2 md:w-[25%] md:mt-8 max-md:mt-2 border" onClick={handleClick}>Take Attendence</Button>
            </div>
          </form>
        </Form>
        <div>
          {showStudents ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-5 mt-12">
              {students?.map(({_id, firstname, lastname, imageUrl})=>(
                <StudentAttendanceCard firstname={firstname} lastname={lastname} imageUrl={imageUrl} studentId={_id}/>
              ))}
            </div>
          ):(
            <></>
          )}
        </div>
      </div>
    </section>
  )
}

export default Attendence