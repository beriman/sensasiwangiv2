// src/app/info/faq/page.tsx

import { AppHeader } from '@/components/header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { faqItems } from '@/data/faq';

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Frequently Asked Questions</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find answers to common questions about our platform and products.
          </p>
        </div>

        import { FaqAccordion } from '@/components/info/faq-accordion';
// ... other imports ...

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Frequently Asked Questions</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find answers to common questions about our platform and products.
          </p>
        </div>

        <FaqAccordion />

      </main>
    </div>
  );
}
      </main>
    </div>
  );
}
