// src/app/dashboard/messages/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { conversations as initialConversations, Message } from '@/data/messages';
import { profiles } from '@/data/profiles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const MOCK_CURRENT_USER_ID = 'alex-doe';

export default function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id || null);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !selectedConversationId) return;

    const newMessage: Message = {
      authorId: MOCK_CURRENT_USER_ID,
      text,
      timestamp: new Date().toISOString(),
    };

    const updatedConversations = conversations.map(convo => {
      if (convo.id === selectedConversationId) {
        return {
          ...convo,
          messages: [...convo.messages, newMessage],
        };
      }
      return convo;
    });

    setConversations(updatedConversations);
  };

  return (
    <Card className="h-[80vh] w-full rounded-2xl border-none bg-transparent shadow-neumorphic">
      <div className="flex h-full">
        {/* Conversations List */}
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
                const otherParticipant = profiles.find(p => p.slug === convo.participantId);
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

        {/* Chat Window */}
        <div className="flex w-2/3 flex-col">
          {selectedConversation ? (
            <>
              <div className="flex items-center gap-3 border-b p-4">
                <Avatar>
                    <AvatarImage src={profiles.find(p => p.slug === selectedConversation.participantId)?.profilePicture} />
                    <AvatarFallback>{profiles.find(p => p.slug === selectedConversation.participantId)?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground/80">
                  {profiles.find(p => p.slug === selectedConversation.participantId)?.name}
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
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <p className="text-lg">Pilih percakapan</p>
              <p className="text-sm">atau mulai yang baru dari profil pengguna.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
