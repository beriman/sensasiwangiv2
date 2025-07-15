
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
import { CheckCircle2, PlayCircle, FileText, ShoppingCart, CalendarPlus, UserPlus, MapPin, Clock } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatRupiah } from '@/lib/utils';
import type { Product, ProductVariant } from '@/lib/types';
import { useCourseProgress } from '@/hooks/use-course-progress';
import { AddToCalendar } from '@/components/add-to-calendar';


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
  
  const isEvent = course.eventType && course.eventType !== 'Self-Paced';

  const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
  const progress = getCourseProgress(allLessonIds);

  const handleBuyOrRegister = () => {
    if (!course || !course.price) return;
    
    const productType = isEvent ? 'Event Registration' : 'Course Access';

    const courseAsProduct: Product = {
        id: `course-${course.slug}`,
        name: `${productType}: ${course.title}`,
        description: `Akses untuk ${course.title}`,
        variants: [{ id: `course-${course.slug}-variant`, name: 'Full Access', price: course.price, stock: 1 }],
        category: 'Course',
        imageUrl: course.imageUrl,
        imageHint: course.imageHint,
        properties: { Instructor: course.instructor, Level: course.level },
        isListed: true, // Courses should be listable to be bought
    };
    const variant: ProductVariant = courseAsProduct.variants[0];
    addItem(courseAsProduct, variant);
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
  
  const renderCourseContent = () => {
    if (isEvent) {
      return (
        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold text-foreground/80">Detail Acara</h2>
           <div className="flex items-center gap-3 text-lg">
                <Clock className="h-5 w-5 text-accent" />
                <span>{course.eventDuration} menit</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
                <MapPin className="h-5 w-5 text-accent" />
                <span>{course.eventLocation}</span>
            </div>
        </div>
      );
    }

    return (
      <>
        <h2 className="mt-10 mb-4 text-2xl font-bold text-foreground/80">Isi Kursus</h2>
        <Accordion type="multiple" defaultValue={[`module-${course.modules[0]?.id}`]} className="w-full">
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
      </>
    )
  }


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
                Diselenggarakan oleh {course.instructor}
            </p>

            {isEvent && course.eventDate && (
                <div className="mt-4 flex items-center gap-2 text-xl font-semibold text-accent">
                    <CalendarPlus className="h-6 w-6"/>
                    {new Date(course.eventDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            )}

            {course.price && !isEvent && (
                <p className="mt-4 text-3xl font-bold text-foreground/80">{formatRupiah(course.price)}</p>
            )}

            <p className="mt-4 text-base text-foreground/80">
                {course.longDescription}
            </p>

            {renderCourseContent()}
          </div>

          {/* Right Column: Image & Progress Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-28 overflow-hidden rounded-2xl border-none shadow-neumorphic">
                <div className="relative h-56 w-full">
                   {renderPreview()}
                </div>
                <CardContent className="p-6">
                    {course.price ? (
                         <>
                            <p className="text-3xl font-bold text-center text-foreground/80 mb-4">{formatRupiah(course.price)}</p>
                            <Button size="lg" className="h-14 w-full rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active" onClick={handleBuyOrRegister}>
                                {isEvent ? <UserPlus className="mr-2 h-6 w-6" /> : <ShoppingCart className="mr-2 h-6 w-6" />}
                                {isEvent ? 'Daftar Sekarang' : 'Beli Akses'}
                            </Button>
                         </>
                    ) : (
                        <>
                             <div>
                                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                                    <span>Progres Anda</span>
                                    <span>{Math.round(progress)}% Selesai</span>
                                </div>
                                <Progress value={progress} className="mt-2 h-3" />
                            </div>
                            <Button size="lg" className="mt-6 h-14 w-full rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                                Lanjutkan Belajar
                            </Button>
                        </>
                    )}
                    {isEvent && course.eventDate && (
                        <AddToCalendar 
                            title={course.title}
                            description={course.longDescription}
                            location={course.eventLocation || 'Detail akan dikirim via email'}
                            startDateTime={new Date(course.eventDate)}
                            durationInMinutes={course.eventDuration || 60}
                        />
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
