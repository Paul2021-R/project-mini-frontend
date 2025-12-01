'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { mockChatService } from '@/services/mock/chat';
import { Message } from '@/services/api';

export function ChatInterface({ chatId }: { chatId: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadMessages();
    }, [chatId]);

    const loadMessages = async () => {
        const data = await mockChatService.getMessages(chatId);
        setMessages(data);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await mockChatService.sendMessage(chatId, input);
            setMessages((prev) => [...prev, response]);
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex h-[calc(100vh-8rem)] flex-col">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''
                                }`}
                        >
                            <Avatar className="h-8 w-8">
                                {msg.role === 'user' ? (
                                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                ) : (
                                    <>
                                        <AvatarImage src="/bot-avatar.png" />
                                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                                    </>
                                )}
                            </Avatar>
                            <div
                                className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t flex gap-2">
                <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} disabled={isLoading}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
}
