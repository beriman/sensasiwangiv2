'use client';

import { AppHeader } from '@/components/header';
import { HeroSection } from '@/components/landing-page/hero-section';
import { FeaturedProductsSection } from '@/components/landing-page/featured-products-section';
import { FeaturedCourseSection } from '@/components/landing-page/featured-course-section';
import { CommunityAndPerfumersSection } from '@/components/landing-page/community-and-perfumers-section';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-16 space-y-20">
          <FeaturedProductsSection />
          <FeaturedCourseSection />
          <CommunityAndPerfumersSection />
        </div>
      </main>
    </div>
  );
}
