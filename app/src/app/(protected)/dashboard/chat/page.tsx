import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
    return (
        <div className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
                <Link href="/dashboard/chat/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Chat
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/dashboard/chat/1">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle>Resume Review</CardTitle>
                            <CardDescription>Last active: 1 hour ago</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground truncate">
                                Can you check my resume?
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/dashboard/chat/2">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle>Tech Stack Inquiry</CardTitle>
                            <CardDescription>Last active: Yesterday</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground truncate">
                                What is the best stack?
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
