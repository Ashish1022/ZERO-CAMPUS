import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DataTable } from './_components/DataTable'
import { columns } from './_components/Columns'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

const page = async () => {
  const { userId } = auth()
  if (!userId) return redirect('/')
  const courses = await db.course.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return (
    <div className='p-6'>
      {/* <Link href='/teacher/create'> */}
        <DataTable columns={columns} data={courses} />
      {/* </Link> */}
    </div>
  )
}

export default page