// src/app/dashboard/messages/page.tsx
'use client';

import { Card } from '@/components/ui/card';
import { useMessages } from '@/hooks/use-messages';

import { ConversationList } from '@/components/dashboard/conversation-list';
import { ChatWindow, NoConversationSelected } from '@/components/dashboard/chat-window';

export default function MessagesPage() {
  const { 
    conversations,
    selectedConversation,
    selectedConversationId,
    setSelectedConversationId,
    handleSendMessage,
    getParticipantProfile,
  } = useMessages();

  const MOCK_CURRENT_USER_ID = 'alex-doe'; // This should come from an auth context

  return (
    <Card className="h-[80vh] w-full rounded-2xl border-none bg-transparent shadow-neumorphic">
      <div className="flex h-full">
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          setSelectedConversationId={setSelectedConversationId}
          getParticipantProfile={getParticipantProfile}
        />

        {selectedConversation ? (
          <ChatWindow
            selectedConversation={selectedConversation}
            handleSendMessage={handleSendMessage}
            getParticipantProfile={getParticipantProfile}
            MOCK_CURRENT_USER_ID={MOCK_CURRENT_USER_ID}
          />
        ) : (
          <NoConversationSelected />
        )}
      </div>
    </Card>
  );
}