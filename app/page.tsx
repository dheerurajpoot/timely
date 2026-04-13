'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Calendar, Clock, Share2, Zap, Users, BarChart3 } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              T
            </div>
            <span className="font-bold text-xl hidden sm:inline">Timely</span>
          </Link>
          <div className="flex gap-2 sm:gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Master Your Time with{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Timely
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Create stunning timetables, manage your schedule effortlessly, and collaborate seamlessly with your team. Available offline and synced in real-time across all your devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Today
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Features
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required. Free forever for personal use.
            </p>
          </div>
          <div className="relative">
            <div className="w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-border flex items-center justify-center">
              <div className="text-center">
                <Calendar className="w-16 h-16 mx-auto text-primary mb-4" />
                <p className="text-muted-foreground">Beautiful Timetable Views</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Powerful Features for Productivity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Calendar,
                title: 'Multiple Views',
                description: 'Switch between daily, weekly, monthly, and agenda views to find your perfect workflow.',
              },
              {
                icon: Clock,
                title: 'Real-Time Sync',
                description: 'Changes sync instantly across all your devices. No waiting, no delays.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized for speed with intelligent caching and instant loading.',
              },
              {
                icon: Share2,
                title: 'Easy Sharing',
                description: 'Collaborate with team members with flexible sharing and permission controls.',
              },
              {
                icon: Users,
                title: 'Collaborative Editing',
                description: 'Edit timetables together in real-time with presence indicators.',
              },
              {
                icon: BarChart3,
                title: 'Offline Support',
                description: 'Works offline and syncs when you\'re back online. Perfect for anywhere productivity.',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Take Control of Your Schedule?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are organizing their lives with Timely. Start free today and upgrade when you&apos;re ready.
          </p>
          <Link href="/signup">
            <Button size="lg">Get Started for Free</Button>
          </Link>
        </div>
      </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
