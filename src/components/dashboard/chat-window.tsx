import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Conversation, Message } from '@/data/messages';

interface ChatWindowProps {
  selectedConversation: Conversation;
  handleSendMessage: (text: string) => void;
  getParticipantProfile: (participantId: string) => any; // Replace 'any' with actual Profile type
  MOCK_CURRENT_USER_ID: string;
}

export function ChatWindow({
  selectedConversation,
  handleSendMessage,
  getParticipantProfile,
  MOCK_CURRENT_USER_ID,
}: ChatWindowProps) {
  return (
    <div className="flex w-2/3 flex-col">
      <div className="flex items-center gap-3 border-b p-4">
        <Avatar>
          <AvatarImage src={getParticipantProfile(selectedConversation.participantId)?.profilePicture} />
          <AvatarFallback>{getParticipantProfile(selectedConversation.participantId)?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold text-foreground/80">
          {getParticipantProfile(selectedConversation.participantId)?.name}
        </h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {selectedConversation.messages.map((message, index) => {
            const isCurrentUser = message.authorId === MOCK_CURRENT_USER_ID;
            return (
              <div
                key={index}
                className={cn(
                  'flex items-end gap-2',
                  isCurrentUser ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-xs rounded-2xl p-3 md:max-w-md',
                    isCurrentUser
                      ? 'rounded-br-none bg-accent-gradient text-accent-foreground'
                      : 'rounded-bl-none bg-muted'
                  )}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
            handleSendMessage(input.value);
            input.value = '';
          }}
          className="flex items-center gap-2"
        >
          <Input name="message" placeholder="Ketik pesan..." className="h-12 flex-1 rounded-xl border-none bg-background shadow-neumorphic-inset" autoComplete="off" />
          <Button type="submit" size="icon" className="h-12 w-12 rounded-xl bg-accent-gradient shadow-neumorphic">
            <SendHorizonal />
          </Button>
        </form>
      </div>
    </div>
  );
}

export function NoConversationSelected() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
      <p className="text-lg">Pilih percakapan</p>
      <p className="text-sm">atau mulai yang baru dari profil pengguna.</p>
    </div>
  );
}
