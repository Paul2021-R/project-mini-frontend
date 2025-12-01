import { ChatSession, Message } from '../api';

const MOCK_CHATS: ChatSession[] = [
    { id: '1', title: 'Resume Review', lastMessage: 'Can you check my resume?', updatedAt: new Date().toISOString() },
    { id: '2', title: 'Tech Stack Inquiry', lastMessage: 'What is the best stack?', updatedAt: new Date(Date.now() - 86400000).toISOString() },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
    '1': [
        { id: 'm1', role: 'user', content: 'Can you check my resume?', createdAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 'm2', role: 'assistant', content: 'Sure! Please upload your resume.', createdAt: new Date(Date.now() - 3500000).toISOString() },
    ],
    '2': [],
};

export const mockChatService = {
    getChats: async (): Promise<ChatSession[]> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return MOCK_CHATS;
    },

    getMessages: async (chatId: string): Promise<Message[]> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_MESSAGES[chatId] || [];
    },

    sendMessage: async (chatId: string, content: string): Promise<Message> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            id: `m-${Date.now()}`,
            role: 'assistant',
            content: `[Mock AI Response] You said: "${content}". This is a demo response.`,
            createdAt: new Date().toISOString(),
        };
    },
};
