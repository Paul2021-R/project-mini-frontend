'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InviteForm } from '@/components/features/about/InviteForm';
import { AboutOverview } from '@/components/features/about/AboutOverview';

export default function AboutSeekerPage() {
    return (
        <div className="container mx-auto py-12 px-4 space-y-16">
            <AboutOverview />

            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">For Job Seekers</h2>
                <p className="text-muted-foreground">Your career narrative, amplified by AI.</p>
            </section>

            <Card className="max-w-4xl mx-auto bg-muted/50 border-none shadow-sm">
                <CardContent className="p-8 md:p-12">
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Badge className="mb-2" variant="outline">For Talent</Badge>
                        <h2 className="text-3xl font-bold">Showcase Your True Potential</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            Protostar helps you maintain a living portfolio that evolves with your career.
                            Our AI agents analyze your projects, code, and writings to highlight your unique strengths
                            to the right employers. Stop applying into the void—let opportunities find you.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <li className="flex items-center gap-2">✅ AI-Enhanced Resume Parsing</li>
                            <li className="flex items-center gap-2">✅ Automatic Skill Verification</li>
                            <li className="flex items-center gap-2">✅ Privacy-First Data Sharing</li>
                            <li className="flex items-center gap-2">✅ Direct connection with Recruiters</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <section className="max-w-xl mx-auto pt-8 pb-16">
                <InviteForm defaultRole="seeker" />
            </section>
        </div>
    );
}
