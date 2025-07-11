// src/app/info/terms/page.tsx

import { AppHeader } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Terms of Service</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="mt-10 rounded-2xl border-none bg-transparent p-6 shadow-neumorphic md:p-8">
          <CardContent className="prose prose-lg max-w-none text-foreground/80">
            <h2>1. Agreement to Terms</h2>
            <p>By using our services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the services. We may modify the Terms at any time, and such modifications shall be effective immediately upon posting of the modified Terms.</p>
            
            <h2>2. Accounts</h2>
            <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>
            
            <h2>3. Marketplace Transactions</h2>
            <p>sensasiwangi.id provides a platform for buyers and sellers to complete transactions. We are not a party to the transaction between you and the seller. We do not have control over and do not guarantee the quality, safety, or legality of items advertised, the truth or accuracy of sellers' content or listings, the ability of sellers to sell items, or the ability of buyers to pay for items.</p>
            
            <h2>4. Content</h2>
            <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>

            <h2>5. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            
            <h2>6. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of Indonesia, without regard to its conflict of law provisions.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
