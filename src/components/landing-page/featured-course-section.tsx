import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { courses } from '@/data/courses';

export function FeaturedCourseSection() {
  const featuredCourse = courses[0]; // Assuming courses[0] is always the featured one

  return (
    <section>
      <Card className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl border-none bg-transparent shadow-neumorphic">
        <div className="relative w-full h-64 md:w-1/3 md:h-auto md:aspect-square shrink-0">
          <Image
            src={featuredCourse.imageUrl}
            alt={featuredCourse.title}
            fill
            className="rounded-xl object-cover"
            data-ai-hint={featuredCourse.imageHint}
          />
        </div>
        <div className="flex-grow">
          <p className="font-semibold text-accent mb-2">Kursus Pilihan</p>
          <h3 className="text-3xl font-bold text-foreground/90">{featuredCourse.title}</h3>
          <p className="text-muted-foreground mt-2">oleh {featuredCourse.instructor}</p>
          <p className="mt-4 text-lg text-foreground/80">{featuredCourse.description}</p>
          <Button asChild size="lg" className="mt-6 rounded-xl shadow-neumorphic">
            <Link href={`/school/course/${featuredCourse.slug}`}>
              <BookOpen className="mr-2" />
              Pelajari Selengkapnya
            </Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
