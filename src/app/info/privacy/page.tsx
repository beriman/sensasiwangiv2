// src/app/info/privacy/page.tsx

import { AppHeader } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import privacyPolicyContent from '@/content/privacy-policy.md'; // Import the markdown file

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Kebijakan Privasi</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <Card className="mt-10 rounded-2xl border-none bg-transparent p-6 shadow-neumorphic md:p-8">
            <CardContent className="prose prose-lg max-w-none text-foreground/80">
                <div dangerouslySetInnerHTML={{ __html: privacyPolicyContent }} />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}

