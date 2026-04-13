'use client';

import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowRight, Zap, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              About Timely
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We believe everyone deserves a tool that makes scheduling simple, 
              beautiful, and collaborative. Timely is built for modern teams and 
              individuals who value their time.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  To empower individuals and teams with the most intuitive, 
                  beautiful, and powerful timetable management tool available.
                </p>
                <p className="text-muted-foreground mb-6">
                  We started Timely because we were frustrated with existing 
                  scheduling tools. They were either too complex or lacked 
                  collaboration features. We decided to build something better.
                </p>
                <Link href="/signup">
                  <Button className="gap-2">
                    Get Started
                    <ArrowRight size={20} />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-6 rounded-lg border border-border">
                  <Zap size={32} className="mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimized for speed with real-time updates
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg border border-border">
                  <Users size={32} className="mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Collaborative</h3>
                  <p className="text-sm text-muted-foreground">
                    Share and work together seamlessly
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg border border-border">
                  <Globe size={32} className="mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Works Offline</h3>
                  <p className="text-sm text-muted-foreground">
                    Progressive web app for offline access
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg border border-border">
                  <Zap size={32} className="mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Beautiful UI</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed with attention to detail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">User First</h3>
                <p className="text-muted-foreground">
                  Everything we build is centered around making your life easier 
                  and your workflows more efficient.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Privacy Matters</h3>
                <p className="text-muted-foreground">
                  Your data is yours. We take privacy seriously and will never 
                  sell or misuse your information.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Always Growing</h3>
                <p className="text-muted-foreground">
                  We continuously improve based on your feedback and the latest 
                  technology innovations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to transform your schedule?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of users who are already using Timely to manage their time better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
