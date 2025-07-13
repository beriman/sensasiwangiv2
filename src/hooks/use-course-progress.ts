'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from '@/hooks/use-toast';

interface CourseProgressState {
  completedLessons: string[];
  toggleLessonCompletion: (lessonId: string, lessonTitle: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getCourseProgress: (lessonIds: string[]) => number;
}

export const useCourseProgress = create(
  persist<CourseProgressState>(
    (set, get) => ({
      completedLessons: [],

      toggleLessonCompletion: (lessonId, lessonTitle) => {
        const { completedLessons } = get();
        const isCompleted = completedLessons.includes(lessonId);

        if (isCompleted) {
          // This case is unlikely with the current UI but good to have
          set({ completedLessons: completedLessons.filter((id) => id !== lessonId) });
        } else {
          set({ completedLessons: [...completedLessons, lessonId] });
          toast({
            title: 'Lesson Completed!',
            description: `You've completed "${lessonTitle}".`,
          });
        }
      },

      isLessonCompleted: (lessonId) => {
        return get().completedLessons.includes(lessonId);
      },

      getCourseProgress: (lessonIds) => {
        const { completedLessons } = get();
        if (lessonIds.length === 0) return 0;

        const completedInCourse = lessonIds.filter(id => completedLessons.includes(id));
        return (completedInCourse.length / lessonIds.length) * 100;
      }
    }),
    {
      name: 'course-progress-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
