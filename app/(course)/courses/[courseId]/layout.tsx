


import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react"
import CourseSidebar from "./_components/CourseSidebar";
import { CourseNavBar } from "./_components/CourseNavbar";

const CourseLayout = async ({ children, params }: { children: React.ReactNode; params: { courseId: string } }) => {

    const { userId } = auth();
    if (!userId) {
        return redirect('/')
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        },
    })

    if (!course) {
        return redirect('/')
    }

    const progressCount = await getProgress(userId, course.id)

    return (
        <div className="h-full">
            <div className="h-[80px] fixed inset-y-0 w-full z-50 md:pl-80">
                <CourseNavBar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0">
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 h-full pt-[80px]">
                {children}
            </main>
        </div>
    )
}

export default CourseLayout