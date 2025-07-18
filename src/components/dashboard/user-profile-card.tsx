import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { profiles } from '@/data/profiles';

interface UserProfileCardProps {
  userId: string; // Or user object from auth context
}

export function UserProfileCard({ userId }: UserProfileCardProps) {
  // In a real app, this would come from an authentication context or fetched dynamically
  const currentUser = profiles.find(p => p.slug === userId); // Using slug as a mock ID

  if (!currentUser) {
    return null; // Or a loading/error state
  }

  return (
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic p-4 text-center">
      <Avatar className="h-24 w-24 mx-auto shadow-neumorphic-inset">
        <AvatarImage src={currentUser.profilePicture} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <CardHeader className="p-2 pb-0">
        <CardTitle className="text-xl">{currentUser.name}</CardTitle>
        <CardDescription>{currentUser.username}</CardDescription>
      </CardHeader>
    </Card>
  );
}
