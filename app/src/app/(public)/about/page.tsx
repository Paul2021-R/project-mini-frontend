import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-140px)] flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold">About Protostar</h1>
            <p className="text-muted-foreground">This is a placeholder for the About page.</p>
            <Link href="/">
                <Button>Go Home</Button>
            </Link>
        </div>
    );
}
