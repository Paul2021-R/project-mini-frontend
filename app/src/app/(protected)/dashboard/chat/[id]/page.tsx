import { ChatInterface } from '@/components/features/chat/ChatInterface';

export default async function ChatPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <div className="h-full mt-6">
            <ChatInterface chatId={id} />
        </div>
    );
}
