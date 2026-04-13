'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function ContentPage() {
  const pages = [
    { slug: 'about', title: 'About Page', icon: FileText },
    { slug: 'privacy', title: 'Privacy Policy', icon: FileText },
    { slug: 'terms', title: 'Terms of Service', icon: FileText },
    { slug: 'disclaimer', title: 'Disclaimer', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Content Pages</h2>
        <p className="text-muted-foreground">Edit static pages content</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {pages.map(page => {
          const Icon = page.icon;
          return (
            <Card key={page.slug} className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{page.title}</h3>
                    <p className="text-xs text-muted-foreground">/{page.slug}</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Edit Content
              </Button>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-muted/50 border-dashed">
        <p className="text-sm text-muted-foreground mb-4">
          Edit the content and styling of your public-facing pages from here.
        </p>
        <p className="text-xs text-muted-foreground">
          Changes are saved automatically and published immediately.
        </p>
      </Card>
    </div>
  );
}
