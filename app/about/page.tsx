'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap, Users, Globe, User, Heart, Shield, Sparkles, Code2, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      {/* Background ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[40%] text-center right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 z-10">
        
        {/* Modern Hero Section */}
        <section className="text-center pt-6 pb-16 sm:pt-20 sm:pb-32 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center justify-center p-2.5 sm:p-3 mb-4 sm:mb-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground balance-text">
            We are building the <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              future of scheduling
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed pt-2 sm:pt-4">
            Everyone deserves a tool that makes managing time simple, beautiful, and highly collaborative. Timely is built for modern teams and individuals who value their focus.
          </p>
        </section>

        {/* Meet the Founder Section - Highlighted */}
        <section className="py-12 sm:py-24">
          <div className="relative bg-card rounded-[2rem] border border-border/50 shadow-xl p-6 sm:p-12 md:p-16 overflow-hidden">
             {/* Decorative Background for Card */}
             <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[60px] rounded-full" />
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-16">
               <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 flex-shrink-0 relative group mt-4 md:mt-0">
                 {/* Avatar Placeholder / Initial */}
                 <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl shadow-xl transition-transform group-hover:scale-105 duration-300">
                    <span className="font-bold tracking-tight shadow-sm">DR</span>
                 </div>
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 bg-background border border-border/50 rounded-full shadow-lg">
                   <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                     <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[10px] sm:text-xs font-semibold text-foreground">Founder</span>
                   </div>
                 </div>
               </div>

               <div className="text-center md:text-left space-y-3 sm:space-y-4 flex-1">
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
                   Hi, I'm Dheeru Rajpoot
                 </h2>
                 <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
                   "I started Timely because existing scheduling tools were either too complex, outdated, or lacked the seamless collaboration I needed. I wanted to build something that was lightning-fast, visually stunning, and truly empowered people to take control of their time without friction."
                 </p>
                 <div className="flex flex-wrap gap-2.5 pt-3 sm:pt-4 justify-center md:justify-start">
                   <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs sm:text-sm font-medium border border-blue-500/20">
                     <Code2 className="w-3 h-3 sm:w-4 sm:h-4" /> Lead Developer
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-purple-500/10 text-purple-500 text-xs sm:text-sm font-medium border border-purple-500/20">
                     <Rocket className="w-3 h-3 sm:w-4 sm:h-4" /> Visionary
                   </span>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* Mission & Features */}
        <section className="py-12 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border/50 text-xs sm:text-sm font-medium text-foreground">
                 🚀 Our Mission
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-foreground">
                Empowering individuals and teams worldwide.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                We believe that time is your most valuable asset. Timely is meticulously crafted to be the most intuitive, beautiful, and powerful timetable management tool available—allowing you to focus on what truly matters.
              </p>
              <Link href="/signup" className="inline-block mt-4">
                <Button size="lg" className="rounded-full px-6 sm:px-8 h-10 sm:h-12 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-1 gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
                  Join the Mission <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed with real-time updates.", color: "text-amber-500", bg: "bg-amber-500/10" },
                { icon: Users, title: "Collaborative", desc: "Share and work together effortlessly.", color: "text-blue-500", bg: "bg-blue-500/10" },
                { icon: Globe, title: "Works Offline", desc: "PWA support built deeply into the core.", color: "text-green-500", bg: "bg-green-500/10" },
                { icon: Heart, title: "Beautiful UI", desc: "Designed meticulously with attention to detail.", color: "text-pink-500", bg: "bg-pink-500/10" }
              ].map((feature, i) => (
                <div key={i} className="bg-card/50 backdrop-blur-xl p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border/50 shadow-sm hover:border-border transition-colors group">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${feature.bg} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 sm:py-24">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Built on Core Values</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">We don't just build software, we build trust through our core operating principles.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 text-center hover:shadow-xl transition-shadow">
               <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                 <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
               </div>
               <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">User First</h3>
               <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Everything we build is centered around making your life easier and your workflows more efficient.</p>
            </div>
            <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 text-center hover:shadow-xl transition-shadow">
               <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                 <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
               </div>
               <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">Privacy Matters</h3>
               <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Your data is yours. We take privacy seriously and will never sell or misuse your information.</p>
            </div>
            <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 text-center hover:shadow-xl transition-shadow sm:col-span-2 md:col-span-1">
               <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-pink-500/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                 <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
               </div>
               <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">Always Growing</h3>
               <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">We continuously improve based on your feedback and the latest technology innovations.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-32">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl sm:rounded-[3rem] p-8 sm:p-16 md:p-20 overflow-hidden text-center shadow-2xl">
            {/* Ambient Background Glow inside CTA */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            <div className="relative z-10 space-y-4 sm:space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Ready to transform your schedule?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
                Join thousands of users who are already using Timely to regain control of their time and boost their daily productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-white text-blue-600 hover:bg-white/90 text-base sm:text-lg shadow-xl shadow-black/20 hover:scale-105 transition-transform">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-full border-blue-200 hover:text-white hover:bg-white/10 text-base sm:text-lg hover:scale-105 transition-transform backdrop-blur-sm">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
