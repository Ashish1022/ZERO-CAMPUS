import { auth } from "@clerk/nextjs/server";
import { File } from "lucide-react";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import { getChapter } from "@/actions/get-chapter";
import Preview from "@/components/Preview";

import { VideoPlayer } from "./_components/VideoPlayer";
import { CourseEnrollButton } from "./_components/CourseEnrollButton";
import { CourseProgressButton } from "./_components/CourseProgressButton";
import { db } from "@/lib/db";
import Banner from "@/components/Banner";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  
  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  const database = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already completed this chapter." variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter"
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            // @ts-ignore
            initialData={database}
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.chapterId}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
              
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    href={attachment.url}
                    key={attachment.id}
                    target="_blank"
                  >
                    <File className="mr-2 h-4 w-4" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;