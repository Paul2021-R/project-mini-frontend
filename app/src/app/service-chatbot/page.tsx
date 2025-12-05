import ChatbotWidget from '@/components/features/chatbot/ChatbotWidget';

export default function ServiceChatbotPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
            <h1 className="text-2xl text-gray-400">Chatbot Demo Page</h1>
            <p className="absolute bottom-20 text-gray-400 text-sm">Click the icon on the bottom left</p>

            {/* The widget is fixed positioned, so it can just be rendered here */}
            <ChatbotWidget />
        </div>
    );
}
