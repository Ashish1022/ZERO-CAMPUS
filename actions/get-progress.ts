import { db } from "@/lib/db";

export const getProgress = async (
    userId: string,
    courseId: string,
): Promise<number> => {
    try {
        const publishChapter = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true
            },
            select: {
                id: true
            }
        })

        const publishedChapterId = publishChapter.map((chapter)=>chapter.id)

        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {in: publishedChapterId},
                isCompleted: true
            },
        })

        const progressPercentage = (validCompletedChapters/publishedChapterId.length) * 100

        return progressPercentage

    } catch (error) {
        console.log("[GET_PROGRESS]",error)
        return 0;
    }
}