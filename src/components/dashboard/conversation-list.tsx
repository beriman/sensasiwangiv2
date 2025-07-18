import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Conversation } from '@/data/messages';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
  getParticipantProfile: (participantId: string) => any; // Replace 'any' with actual Profile type
}

export function ConversationList({
  conversations,
  selectedConversationId,
  setSelectedConversationId,
  getParticipantProfile,
}: ConversationListProps) {
  return (
    <div className="flex w-1/3 flex-col border-r">
      <div className="p-4">
        <h2 className="text-xl font-bold text-foreground/80">Obrolan</h2>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Cari pesan..." className="rounded-xl border-none bg-background pl-10 shadow-neumorphic-inset" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {conversations.map(convo => {
            const otherParticipant = getParticipantProfile(convo.participantId);
            const lastMessage = convo.messages[convo.messages.length - 1];

            return (
              <button
                key={convo.id}
                onClick={() => setSelectedConversationId(convo.id)}
                className={cn(
                  'w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors',
                  selectedConversationId === convo.id
                    ? 'bg-accent/20'
                    : 'hover:bg-muted/50'
                )}
              >
                <Avatar>
                  <AvatarImage src={otherParticipant?.profilePicture} alt={otherParticipant?.name} />
                  <AvatarFallback>{otherParticipant?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold text-foreground/90">{otherParticipant?.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{lastMessage?.text}</p>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
