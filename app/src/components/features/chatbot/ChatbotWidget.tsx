'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Plus, Paperclip, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Types
interface Message {
    text: string;
    type: 'bot' | 'user';
    timestamp: string;
    attachments?: { title: string; content: string; url: string; timestamp: string }[];
}

interface Session {
    id: string;
    created_at: string;
    last_updated: string;
    url: string;
    messages: Message[];
}

const MAX_SESSIONS_PER_DAY = 3;
const EXPIRATION_DAYS = 7;

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [sessions, setSessions] = useState<Session[]>([]);
    const [showSessionList, setShowSessionList] = useState(false);
    const [showLimitOverlay, setShowLimitOverlay] = useState(false);
    const [attachments, setAttachments] = useState<{ title: string; content: string; url: string; timestamp: string }[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // --- Helpers ---
    const generateSessionId = () => {
        const timestamp = Date.now();
        const cleanPath = typeof window !== 'undefined' ? window.location.pathname.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10) : 'path';
        return `sess_${timestamp}_${cleanPath}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const isSessionExpired = (lastUpdated: string) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - new Date(lastUpdated).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > EXPIRATION_DAYS;
    };

    const getTodaySessionCount = (currentSessions: Session[]) => {
        const today = new Date().toDateString();
        return currentSessions.filter(s => new Date(s.created_at).toDateString() === today).length;
    };

    // --- Effects ---
    useEffect(() => {
        // Load sessions from localStorage
        const savedSessions = localStorage.getItem('protostar_sessions');
        let loadedSessions: Session[] = savedSessions ? JSON.parse(savedSessions) : [];

        // Filter expired
        loadedSessions = loadedSessions.filter(s => !isSessionExpired(s.last_updated));
        setSessions(loadedSessions);

        // Initial Active Session
        if (loadedSessions.length > 0) {
            // Sort by last updated desc
            loadedSessions.sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime());
            setActiveSessionId(loadedSessions[0].id);
            setMessages(loadedSessions[0].messages);
        } else {
            // We defer creation until user interacting or just create one if none exist?
            // chatbot.js created one if none existed on toggle.
        }
    }, []);

    useEffect(() => {
        // Auto-save sessions whenever they change
        if (sessions.length > 0) {
            localStorage.setItem('protostar_sessions', JSON.stringify(sessions));
        }
    }, [sessions]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);


    const createNewSession = () => {
        if (getTodaySessionCount(sessions) >= MAX_SESSIONS_PER_DAY) {
            setShowLimitOverlay(true);
            return null;
        }

        const newSession: Session = {
            id: generateSessionId(),
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString(),
            url: window.location.pathname,
            messages: [{
                text: "안녕하세요! Paul 님의 커리어 AI 비서 Protostar 입니다. 무엇을 도와드릴까요?",
                type: 'bot',
                timestamp: new Date().toISOString()
            }]
        };

        const updatedSessions = [...sessions, newSession];
        setSessions(updatedSessions);
        setActiveSessionId(newSession.id);
        setMessages(newSession.messages);
        return newSession.id;
    };

    const handleToggleChat = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (newState && !activeSessionId) {
            // Try to create or get latest
            if (sessions.length === 0) {
                createNewSession();
            } else {
                // Should have been set by useEffect, but ensure
                setActiveSessionId(sessions[0].id);
                setMessages(sessions[0].messages);
            }
        }
    };

    const handleSendMessage = () => {
        if ((!inputValue.trim() && attachments.length === 0) || !activeSessionId) return;

        const newMessage: Message = {
            text: inputValue,
            type: 'user',
            timestamp: new Date().toISOString(),
            attachments: attachments.length > 0 ? [...attachments] : undefined
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setAttachments([]);

        // Update session
        const updatedSessions = sessions.map(s => {
            if (s.id === activeSessionId) {
                return { ...s, messages: updatedMessages, last_updated: new Date().toISOString() };
            }
            return s;
        });
        setSessions(updatedSessions);

        // Mock Response
        setTimeout(() => {
            const botMsg: Message = {
                text: "죄송합니다. 현재 데모 버전이라 실제 AI 응답은 연결되지 않았습니다.",
                type: 'bot',
                timestamp: new Date().toISOString()
            };
            const withBot = [...updatedMessages, botMsg];
            setMessages(withBot);

            // Update session again
            const sessionsWithBot = updatedSessions.map(s => {
                if (s.id === activeSessionId) {
                    return { ...s, messages: withBot, last_updated: new Date().toISOString() };
                }
                return s;
            });
            setSessions(sessionsWithBot);

        }, 1000);
    };

    const handleAddAttachment = () => {
        // Mock "Adding current page"
        const title = document.title;
        if (attachments.some(a => a.title === title)) return;

        const newAtt = {
            title,
            content: document.body.innerText.substring(0, 1000), // truncated
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        setAttachments([...attachments, newAtt]);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const headerTitle = React.useMemo(() => {
        if (!activeSessionId) return 'Protostar';
        const session = sessions.find(s => s.id === activeSessionId);
        // If user sent messages, show URL, else Protostar
        const hasUserMsg = session?.messages.some(m => m.type === 'user');
        return hasUserMsg ? session?.url : 'Protostar';
    }, [activeSessionId, sessions]);


    return (
        <>
            {/* Floating Icon */}
            <div
                onClick={handleToggleChat}
                className={`fixed bottom-12 left-16 w-[51px] h-[51px] rounded-full bg-white shadow-lg cursor-pointer flex items-center justify-center transition-transform hover:scale-110 z-50 border-2 border-white overflow-hidden ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
                {/* Placeholder Icon */}
                <div className="bg-black w-full h-full flex items-center justify-center text-white font-bold text-xl">P</div>
            </div>

            {/* Chat Window */}
            <div className={`fixed bottom-28 left-16 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl border flex flex-col transition-all duration-300 transform z-50 overflow-hidden ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>

                {/* Header */}
                <div className="bg-gray-50 p-4 border-b flex justify-between items-center text-gray-800 font-semibold select-none">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <Menu className="w-5 h-5 cursor-pointer hover:text-black text-gray-500" onClick={() => setShowSessionList(!showSessionList)} />
                        <Plus className="w-5 h-5 cursor-pointer hover:text-black text-gray-500" onClick={() => {
                            const newId = createNewSession();
                            if (newId) setShowSessionList(false); // Close list if open
                        }} />
                        <span className="truncate max-w-[150px]">{headerTitle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-600" />
                        </div>
                        <X className="w-5 h-5 cursor-pointer hover:text-black text-gray-500" onClick={() => setIsOpen(false)} />
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-hidden relative flex flex-col bg-gray-50/50">

                    {/* Session List Overlay */}
                    <div className={`absolute inset-0 bg-white z-20 transition-transform duration-300 ${showSessionList ? 'translate-x-0' : '-translate-x-full'} p-4 overflow-y-auto`}>
                        <h4 className="font-bold mb-4">Chat List</h4>
                        <div className="space-y-2">
                            {sessions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(session => (
                                <div
                                    key={session.id}
                                    onClick={() => { setActiveSessionId(session.id); setMessages(session.messages); setShowSessionList(false); }}
                                    className={`p-3 border rounded-lg cursor-pointer hover:shadow-sm transition-all ${session.id === activeSessionId ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}
                                >
                                    <div className="text-xs text-gray-400 mb-1">{new Date(session.created_at).toLocaleString()}</div>
                                    <div className="font-semibold text-sm truncate">{session.url}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Limit Overlay */}
                    {showLimitOverlay && (
                        <div className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center p-6 text-center">
                            <h3 className="text-xl font-bold mb-2">한도 초과</h3>
                            <p className="text-gray-500 text-sm mb-6">Protostar 서비스에 회원가입 하시면<br />더 많은 질문이 가능합니다.</p>
                            <Button className="w-full mb-2" onClick={() => window.open('https://service-protostar.ddns.net/', '_blank')}>등록하러 가기</Button>
                            <Button variant="secondary" className="w-full" onClick={() => setShowLimitOverlay(false)}>취소</Button>
                        </div>
                    )}


                    {/* Message List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.type === 'user' ? 'bg-blue-100 text-blue-900 rounded-br-none' : 'bg-white border text-gray-700 rounded-bl-none'}`}>
                                    {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="mb-2 space-y-1">
                                            {msg.attachments.map((att, i) => (
                                                <div key={i} className="bg-white/50 text-xs px-2 py-1 rounded border flex items-center gap-1">
                                                    <span>📄</span> {att.title}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t">
                        {attachments.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {attachments.map((att, i) => (
                                    <div key={i} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                                        <span>📄 {att.title.substring(0, 15)}...</span>
                                        <button onClick={() => setAttachments(attachments.filter(a => a !== att))} className="hover:text-red-500">×</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <button onClick={handleAddAttachment} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Add Page Context">
                                <Plus size={20} />
                            </button>
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                className="rounded-full bg-gray-50 border-gray-200 focus-visible:ring-1"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() && attachments.length === 0}
                                className={`p-2 transition-colors ${(!inputValue.trim() && attachments.length === 0) ? 'text-gray-300' : 'text-blue-500 hover:scale-110'}`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
