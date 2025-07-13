
// src/app/school/course/[slug]/lesson/[lessonId]/page.tsx
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { getLessonByIds, findNextLesson } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { ContentRenderer } from '@/components/content-renderer';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCourseProgress } from '@/hooks/use-course-progress';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { toggleLessonCompletion } = useCourseProgress();
  const courseSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;
  
  const lessonData = getLessonByIds(courseSlug, lessonId);

  if (!lessonData) {
    notFound();
  }

  const { lesson, moduleTitle, courseTitle } = lessonData;

  const handleComplete = () => {
    // Mark the current lesson as complete
    toggleLessonCompletion(lesson.id, lesson.title);

    // Find the next lesson
    const nextLesson = findNextLesson(courseSlug, lesson.id);

    if (nextLesson) {
      // Navigate to the next lesson
      router.push(`/school/course/${nextLesson.courseSlug}/lesson/${nextLesson.lessonId}`);
    } else {
      // This was the last lesson, navigate back to the course page
      router.push(`/school/course/${courseSlug}`);
    }
  }

  const renderContent = () => {
    if (lesson.type === 'video') {
      return (
        <div className="aspect-video w-full">
            <iframe
                src={`https://www.youtube.com/embed/${lesson.content}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-lg"
            ></iframe>
        </div>
      );
    }
    return <ContentRenderer content={lesson.content} />;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/school">School</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/school/course/${courseSlug}`}>{courseTitle}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="rounded-2xl border-none bg-transparent p-6 shadow-neumorphic md:p-8">
            <h1 className="mb-4 text-3xl font-bold text-foreground/90">{lesson.title}</h1>
            <p className="mb-8 text-muted-foreground">{moduleTitle}</p>
            
            <div className="prose prose-lg max-w-none text-foreground/80">
                {renderContent()}
            </div>
        </div>

        <div className="mt-8 flex justify-between">
            <Button variant="outline" className="rounded-xl px-6 py-6 shadow-neumorphic transition-all hover:shadow-neumorphic-active" onClick={() => router.back()}>
                <ChevronLeft className="mr-2 h-5 w-5" />
                Previous
            </Button>
            <Button onClick={handleComplete} className="rounded-xl bg-accent-gradient px-6 py-6 text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                Complete & Continue
                <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
      </main>
    </div>
  );
}
