'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InviteForm } from '@/components/features/about/InviteForm';
import { AboutOverview } from '@/components/features/about/AboutOverview';

export default function AboutRecruiterPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      <AboutOverview />

      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">For Recruiters</h2>
        <p className="text-muted-foreground">
          Find the exact talent you need, instantly.
        </p>
      </section>

      <Card className="max-w-4xl mx-auto bg-muted/50 border-none shadow-sm">
        <CardContent className="p-8 md:p-12">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Badge className="mb-2" variant="outline">
              For Companies
            </Badge>
            <h2 className="text-3xl font-bold">Discover Verified Excellence</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Stop sifting through hundreds of unmatched resumes. Protostar's
              verified talent pool gives you deep insights into candidates'
              actual capabilities, not just what they claim. Connect directly
              with high-potential individuals who match your specific technical
              stack.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <li className="flex items-center gap-2">
                ✅ Verified Skill Badges
              </li>
              <li className="flex items-center gap-2">✅ Deep Code Analysis</li>
              <li className="flex items-center gap-2">
                ✅ Predictive Fit Scoring
              </li>
              <li className="flex items-center gap-2">
                ✅ Automated Initial Screening
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <section className="max-w-xl mx-auto pt-8 pb-16">
        <InviteForm defaultRole="recruiter" />
      </section>
    </div>
  );
}
