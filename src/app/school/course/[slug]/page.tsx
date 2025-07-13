
// src/app/school/course/[slug]/page.tsx
'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { courses, getCourseBySlug, Module, Lesson } from '@/data/courses';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, PlayCircle, FileText, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatRupiah } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useCourseProgress } from '@/hooks/use-course-progress';


const getLessonIcon = (type: 'video' | 'text') => {
    return type === 'video' ? PlayCircle : FileText;
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const course = getCourseBySlug(slug);
  const { addItem } = useCart();
  const { isLessonCompleted, getCourseProgress } = useCourseProgress();


  if (!course) {
    notFound();
  }

  const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
  const progress = getCourseProgress(allLessonIds);

  const handleBuyClick = () => {
    if (!course || !course.price) return;
    const courseAsProduct: Product = {
        id: `course-${course.slug}`,
        name: `Akses: ${course.title}`,
        description: `Akses selamanya untuk kursus ${course.title}`,
        variants: [{ id: `course-${course.slug}-variant`, name: 'Full Access', price: course.price, stock: 1 }],
        price: course.price,
        category: 'Course',
        imageUrl: course.imageUrl,
        imageHint: course.imageHint,
        properties: { Instructor: course.instructor, Level: course.level },
        isListed: true, // Courses should be listable to be bought
    };
    addItem(courseAsProduct, courseAsProduct.variants[0]);
  }
  
  const renderPreview = () => {
    if (course.price && course.previewVideoUrl) {
      return (
        <video
          src={course.previewVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      );
    }
    return (
      <Image
        src={course.imageUrl}
        alt={course.title}
        fill
        className="object-cover"
        data-ai-hint={course.imageHint}
      />
    );
  };


  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Course Details & Content */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground/90 md:text-4xl">
              {course.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Taught by {course.instructor}
            </p>

            {course.price && (
                <p className="mt-4 text-3xl font-bold text-foreground/80">{formatRupiah(course.price)}</p>
            )}

            <p className="mt-4 text-base text-foreground/80">
                {course.longDescription}
            </p>

            <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground/80">Course Content</h2>
            <Accordion type="multiple" defaultValue={[`module-${course.modules[0].id}`]} className="w-full">
              {course.modules.map((moduleItem, index) => (
                <AccordionItem key={moduleItem.id} value={`module-${moduleItem.id}`} className="mb-4 rounded-xl border-none shadow-neumorphic">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground">Module {index + 1}</p>
                        <p className="text-lg font-bold text-foreground/80">{moduleItem.title}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 px-6 pb-4">
                      {moduleItem.lessons.map((lesson) => {
                        const Icon = getLessonIcon(lesson.type);
                        const completed = isLessonCompleted(lesson.id);
                        return(
                            <li key={lesson.id}>
                                <Link href={`/school/course/${course.slug}/lesson/${lesson.id}`} 
                                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-base text-foreground/90">{lesson.title}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground">{lesson.duration} min</span>
                                    {completed ? (
                                        <CheckCircle2 className="h-5 w-5 text-accent" />
                                    ) : (
                                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/50" />
                                    )}
                                </div>
                                </Link>
                            </li>
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column: Image & Progress Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 overflow-hidden rounded-2xl border-none shadow-neumorphic">
                <div className="relative h-56 w-full">
                   {renderPreview()}
                </div>
                <CardContent className="p-6">
                    {course.price ? (
                         <Button size="lg" className="h-14 w-full rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active" onClick={handleBuyClick}>
                            <ShoppingCart className="mr-2 h-6 w-6" />
                            Buy Access
                        </Button>
                    ) : (
                        <>
                             <div>
                                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                                    <span>Your Progress</span>
                                    <span>{Math.round(progress)}% Complete</span>
                                </div>
                                <Progress value={progress} className="mt-2 h-3" />
                            </div>
                            <Button size="lg" className="mt-6 h-14 w-full rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                                Continue Learning
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
