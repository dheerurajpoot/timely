'use client';

import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Calendar, Share2, Zap, Users, BarChart3, CheckCircle2, Shield, LayoutDashboard, Sparkles, Download } from 'lucide-react';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { installPrompt, isInstalled, handleInstall } = usePWAInstall();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="flex flex-col font-sans overflow-x-hidden relative selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[120px] -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/20 blur-[120px] -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-8 pb-16 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-8 items-center">
            <div className="relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-500/10 text-blue-500 font-medium text-xs sm:text-sm mb-4 sm:mb-6 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>The ultimate planning tool</span>
              </div>
              <h1 className="text-[2.2rem] leading-[1.15] sm:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight">
                Manage your time, <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  beautifully.
                </span>
              </h1>
              <p className="text-[15px] sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Timely brings all your schedules, tasks, and team collaboration into one vibrant, lightning-fast workspace.
              </p>
              <div className="flex flex-row gap-2.5 sm:gap-4 justify-center lg:justify-start w-full max-w-[340px] sm:max-w-none mx-auto lg:mx-0">
                <Link href="/signup" className="flex-1 sm:flex-none">
                  <Button size="sm" className="w-full sm:w-auto h-11 sm:h-12 px-0 sm:px-8 text-sm sm:text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 transition-transform hover:-translate-y-1 shadow-xl whitespace-nowrap">
                    Get Started Free
                  </Button>
                </Link>
                {!isInstalled && installPrompt && (
                  <Button onClick={handleInstall} variant="outline" size="sm" className="flex-1 sm:flex-none h-11 sm:h-12 px-0 sm:px-8 text-sm sm:text-lg rounded-full border-blue-500/30 text-blue-500 hover:bg-blue-500/10 transition-transform hover:-translate-y-1 flex items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>Get App</span>
                  </Button>
                )}
              </div>
              <div className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[1.5px] sm:border-2 border-background flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-white z-${40 - i * 10}`} style={{backgroundColor: `hsl(${220 + i * 20}, 80%, 60%)`}}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p>Join 10,000+ professionals</p>
              </div>
            </div>
            
            {/* App Mockup UI */}
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none transform lg:translate-x-8 xl:translate-x-12 perspective-1000">
              <div className="relative rounded-3xl overflow-hidden glassmorphism border border-white/10 dark:border-white/5 shadow-2xl shadow-blue-900/20 aspect-[4/3] transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform hover:rotate-y-0 hover:rotate-x-0 duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/50 backdrop-blur-md"></div>
                <div className="relative h-full flex flex-col pt-4">
                  <div className="px-6 flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex-1 px-4 pb-4">
                    <div className="h-full bg-card rounded-xl border border-border/50 shadow-inner overflow-hidden flex">
                      <div className="w-20 bg-muted/30 border-r border-border/50 p-2 flex flex-col gap-4 py-6 items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center"><LayoutDashboard size={20} /></div>
                        <div className="w-10 h-10 rounded-lg text-muted-foreground flex items-center justify-center"><Calendar size={20} /></div>
                        <div className="w-10 h-10 rounded-lg text-muted-foreground flex items-center justify-center"><Users size={20} /></div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="h-8 w-1/3 bg-muted rounded-md mb-6 animate-pulse"></div>
                        <div className="grid grid-cols-4 gap-4 h-full pb-8">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-3">
                              <div className="h-4 w-full bg-muted/50 rounded animate-pulse"></div>
                              <div className={`flex-1 rounded-lg border border-border/50 bg-gradient-to-br p-3 shadow-sm ${i === 1 ? 'from-blue-500/10 to-indigo-500/10' : i === 2 ? 'from-purple-500/10 to-pink-500/10' : 'from-muted/30 to-muted/10'}`}>
                                <div className="h-3 w-1/2 bg-foreground/20 rounded mb-2"></div>
                                <div className="h-2 w-3/4 bg-foreground/10 rounded"></div>
                              </div>
                              <div className={`flex-1 rounded-lg border border-border/50 bg-gradient-to-br p-3 shadow-sm ${i === 0 ? 'from-green-500/10 to-emerald-500/10' : 'from-muted/30 to-muted/10'}`}>
                                <div className="h-3 w-1/2 bg-foreground/20 rounded mb-2"></div>
                                <div className="h-2 w-3/4 bg-foreground/10 rounded"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-24 sm:py-32 bg-card/30 border-y border-border/50 overflow-hidden">
          <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-pink-500/10 blur-[100px] -z-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-blue-500 font-semibold tracking-wide uppercase text-sm mb-3">Everything you need</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Designed to make you <br />
                <span className="italic font-light text-muted-foreground mr-2">insanely</span> 
                productive.
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: LayoutDashboard,
                  title: 'Immersive Views',
                  description: 'Switch seamlessly between daily, weekly, and agenda views. Your schedule looks stunning from every angle.',
                  color: 'text-blue-500',
                  bg: 'bg-blue-500/10',
                  border: 'group-hover:border-blue-500/50'
                },
                {
                  icon: Zap,
                  title: 'Lightning Performance',
                  description: 'Optimized down to the millisecond. No loading spinners, no waiting. It’s productivity at the speed of thought.',
                  color: 'text-yellow-500',
                  bg: 'bg-yellow-500/10',
                  border: 'group-hover:border-yellow-500/50'
                },
                {
                  icon: Users,
                  title: 'Team Sync',
                  description: 'Work together in real-time. Share your availability and align on goals without endless email threads.',
                  color: 'text-purple-500',
                  bg: 'bg-purple-500/10',
                  border: 'group-hover:border-purple-500/50'
                },
                {
                  icon: Shield,
                  title: 'Offline First',
                  description: 'Keep working even when your internet drops. We sync everything seamlessly once you’re back online.',
                  color: 'text-emerald-500',
                  bg: 'bg-emerald-500/10',
                  border: 'group-hover:border-emerald-500/50'
                },
                {
                  icon: Share2,
                  title: 'Smart Sharing',
                  description: 'Generate beautiful public links or embed your timetable. Perfect for educators and event managers.',
                  color: 'text-pink-500',
                  bg: 'bg-pink-500/10',
                  border: 'group-hover:border-pink-500/50'
                },
                {
                  icon: BarChart3,
                  title: 'Insightful Analytics',
                  description: 'Understand exactly where your time goes. Built-in charts help you stay on top of your work-life balance.',
                  color: 'text-orange-500',
                  bg: 'bg-orange-500/10',
                  border: 'group-hover:border-orange-500/50'
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`group p-8 rounded-3xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 ${feature.border} hover:shadow-2xl hover:-translate-y-1`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonial / Social Proof */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 border border-border/50 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"></div>
            <div className="flex flex-col items-center relative z-10">
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <blockquote className="text-2xl sm:text-3xl font-medium mb-8 max-w-3xl leading-snug">
                "Timely has completely transformed how our team works. The colorful interface makes checking the schedule a joy rather than a chore. It's the best tool we've adopted this year."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-400"></div>
                <div className="text-left">
                  <div className="font-bold">Sarah Jenkins</div>
                  <div className="text-sm text-muted-foreground">Product Manager at TechFlow</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 sm:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to take your <br className="hidden sm:block"/> time back?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
              Join thousands of users organizing their lives with Timely. No credit card required. Free forever for personal use.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl shadow-blue-500/25 transition-transform hover:-translate-y-1">
                  Start Your Free Account
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cancel anytime</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free forever</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="border-t border-border/50 bg-background/50">
        <Footer />
      </div>
    </div>
  );
}
