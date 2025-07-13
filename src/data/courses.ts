// src/data/courses.ts

export type LessonType = 'video' | 'text';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: number; // in minutes
  content: string; // For text, it's markdown. For video, it's the YouTube video ID.
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Perfumery Basics' | 'Raw Materials' | 'Formulation Techniques';
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  previewVideoUrl?: string;
  modules: Module[];
  price?: number; // Optional price for paid courses
}

export const courses: Course[] = [
  {
    slug: 'intro-to-natural-perfumery',
    title: 'Intro to Natural Perfumery',
    instructor: 'Antoine Leduc',
    level: 'Beginner',
    category: 'Perfumery Basics',
    description: 'Learn the foundational principles of creating fragrances with natural ingredients.',
    longDescription: 'Dive into the art and science of natural perfumery. This course covers the history of perfume, safety guidelines, understanding scent families, and how to build a basic fragrance accord. Perfect for absolute beginners with a passion for scent.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'natural ingredients herbs',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Basics',
        lessons: [
          { id: 'l1-1', title: 'Welcome to the World of Perfumery', type: 'video', duration: 8, content: 'dQw4w9WgXcQ', isCompleted: true },
          { id: 'l1-2', title: 'Essential Tools & Safety', type: 'text', duration: 10, content: 'Safety is paramount. You will need:\n- Beakers\n- Digital Scale\n- Perfumer\'s Alcohol\n- Pipettes\n- Testing Strips\n\nAlways work in a well-ventilated area and wear gloves when handling pure essences.' },
          { id: 'l1-3', title: 'Understanding Scent Notes (Top, Middle, Base)', type: 'video', duration: 12, content: '3q-r8t_vC-s' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Building Your First Accord',
        lessons: [
          { id: 'l2-1', title: 'The Classic Citrus Accord', type: 'video', duration: 15, content: 'your-video-id-here' },
          { id: 'l2-2', title: 'A Simple Floral Accord', type: 'text', duration: 18, content: 'Combine Jasmine, Rose, and a touch of Ylang-Ylang to create a basic white floral heart. We will explore ratios in the next lesson.' },
        ],
      },
    ],
  },
  {
    slug: 'advanced-formulation-techniques',
    title: 'Advanced Formulation Techniques',
    instructor: 'Alex Doe',
    level: 'Advanced',
    category: 'Formulation Techniques',
    description: 'Master complex formulation techniques and elevate your creations.',
    longDescription: 'This course is for those who have a solid understanding of the basics and want to push their creative boundaries. We will explore advanced layering, the use of nuanced aroma chemicals, and how to create signature scents that truly stand out.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'perfume lab chemistry',
    previewVideoUrl: 'https://videos.pexels.com/video-files/3209210/3209210-hd_1920_1080_25fps.mp4',
    price: 1500000,
    modules: [
        {
          id: 'm1',
          title: 'Module 1: Deconstructing Classics',
          lessons: [
            { id: 'l1-1', title: 'Analyzing a Chypre Structure', type: 'video', duration: 20, content: 'your-video-id-here' },
            { id: 'l1-2', title: 'The Modern Fougère', type: 'text', duration: 25, content: 'The modern fougère moves beyond the classic lavender/oakmoss/coumarin structure...' },
          ],
        },
      ],
  },
];

// Helper functions
export const getCourseBySlug = (slug: string) => {
    return courses.find(c => c.slug === slug);
};

export const getLessonByIds = (courseSlug: string, lessonId: string) => {
    const course = getCourseBySlug(courseSlug);
    if (!course) return null;
  
    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        // Find module and course info for breadcrumbs
        const moduleTitle = module.title;
        const courseTitle = course.title;
        return { lesson, moduleTitle, courseTitle, courseSlug };
      }
    }
    return null;
  };
