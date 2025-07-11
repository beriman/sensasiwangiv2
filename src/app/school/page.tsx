
// src/app/school/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { courses, Course } from '@/data/courses';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

function CourseCard({ course }: { course: Course }) {
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  return (
    <Link href={`/school/course/${course.slug}`} className="block h-full">
      <Card className="group flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="relative p-0">
          <div className="relative h-48 w-full">
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={course.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
            <div className="mb-2 flex items-center justify-between">
                <Badge variant="secondary" className="bg-accent/50 text-accent-foreground">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
            </div>
          <CardTitle className="text-lg font-bold text-foreground/90">{course.title}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">by {course.instructor}</p>
          <CardDescription className="mt-2 text-sm text-foreground/80 line-clamp-2">
            {course.description}
          </CardDescription>
        </CardContent>
        <div className="flex items-center justify-between p-4 pt-0 text-sm text-muted-foreground">
            <span>{course.modules.length} Modules</span>
            <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span>{totalLessons} Lessons</span>
            </div>
        </div>
      </Card>
    </Link>
  );
}


export default function SchoolPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground/90">School of Scent</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Expand your knowledge, from beginner basics to advanced techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
