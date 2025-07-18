import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { profiles } from '@/data/profiles';

interface SambatanDiscussionProps {
  // No specific props needed for now, as data is mocked internally
}

export function SambatanDiscussion() {
  const sambatanDiscussion = [
    {
      author: profiles.find(p => p.slug === 'alex-doe')!,
      timestamp: '2 jam yang lalu',
      comment: 'Apa ada yang tahu apakah ini cocok untuk pemula? Saya baru mau coba.',
    },
    {
      author: profiles.find(p => p.slug === 'antoine-leduc')!,
      timestamp: '1 jam yang lalu',
      comment: 'Sangat cocok! Ini bahan baku yang bagus untuk memulai. Saya ikut 1 slot juga.',
    },
  ];

  return (
    <section className="mt-12">
      <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic p-6">
        <CardHeader className="p-0">
          <CardTitle>Diskusi Sambatan</CardTitle>
          <CardDescription>Punya pertanyaan? Tanyakan di sini atau koordinasi dengan calon pembeli lain.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 mt-6">
          <div className="space-y-6">
            {sambatanDiscussion.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={item.author.profilePicture} alt={item.author.name} />
                  <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground/90">{item.author.name}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                  <p className="text-foreground/80">{item.comment}</p>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Alex Doe" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <Textarea placeholder="Tulis komentar Anda..." className="rounded-xl border-none bg-background shadow-neumorphic-inset" />
                <Button className="mt-2">Kirim Komentar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}