// src/data/messages.ts
import { profiles } from './profiles';

export interface Message {
  authorId: string; // Should match a perfumer's slug
  text: string;
  timestamp: string; // ISO 8601
}

export interface Conversation {
  id: string;
  participantId: string; // The other person in the chat
  messages: Message[];
}

const MOCK_CURRENT_USER_ID = 'alex-doe';

export const conversations: Conversation[] = [
  {
    id: 'convo-1',
    participantId: 'antoine-leduc',
    messages: [
      {
        authorId: 'antoine-leduc',
        text: 'Hello Alex, I saw your latest perfume listing. The notes sound fascinating!',
        timestamp: '2024-05-20T10:00:00Z',
      },
      {
        authorId: MOCK_CURRENT_USER_ID,
        text: "Hi Antoine! Thanks for reaching out. I'm glad you think so. I was inspired by a recent trip to the coast.",
        timestamp: '2024-05-20T10:02:00Z',
      },
       {
        authorId: 'antoine-leduc',
        text: 'Wonderful. I have a question about the sandalwood oil you are selling. Is it suitable for a beginner to work with?',
        timestamp: '2024-05-20T10:05:00Z',
      },
    ],
  },
];
