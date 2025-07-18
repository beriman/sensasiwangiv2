import { useState, useCallback, useMemo } from 'react';
import { conversations as initialConversations, Message, Conversation } from '@/data/messages';
import { profiles } from '@/data/profiles';

const MOCK_CURRENT_USER_ID = 'alex-doe';

interface UseMessagesResult {
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
  handleSendMessage: (text: string) => void;
  getParticipantProfile: (participantId: string) => typeof profiles[0] | undefined;
}

export const useMessages = (): UseMessagesResult => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id || null);

  const selectedConversation = useMemo(() => {
    return conversations.find(c => c.id === selectedConversationId);
  }, [conversations, selectedConversationId]);

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim() || !selectedConversationId) return;

    const newMessage: Message = {
      authorId: MOCK_CURRENT_USER_ID,
      text,
      timestamp: new Date().toISOString(),
    };

    setConversations(prevConversations => {
      return prevConversations.map(convo => {
        if (convo.id === selectedConversationId) {
          return {
            ...convo,
            messages: [...convo.messages, newMessage],
          };
        }
        return convo;
      });
    });
  }, [selectedConversationId]);

  const getParticipantProfile = useCallback((participantId: string) => {
    return profiles.find(p => p.slug === participantId);
  }, []);

  return {
    conversations,
    selectedConversation,
    selectedConversationId,
    setSelectedConversationId,
    handleSendMessage,
    getParticipantProfile,
  };
};
