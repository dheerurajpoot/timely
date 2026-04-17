'use client';

import { Footer } from '@/components/footer';
import { Shield, Info, Database, Activity, Lock, Mail, RefreshCw, Cookie, UserCheck, Smartphone } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col relative w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-blue-500/10 via-background to-background pt-20 pb-16 border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-2xl mb-6 border border-blue-500/20 shadow-sm">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our services.
          </p>
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-muted/80 backdrop-blur-sm text-foreground text-xs sm:text-sm font-medium border border-border/50 shadow-sm">
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}
          </div>
        </div>
      </div>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background relative z-10">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Introduction */}
          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-blue-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-4 text-foreground">
              <Info className="w-6 h-6 text-blue-500 flex-shrink-0" /> Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              At Timely, we are committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you visit our application.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-blue-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 text-foreground">
              <Database className="w-6 h-6 text-blue-500 flex-shrink-0" /> 1. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50 flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">Personal Data</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Name, email address, and other information you securely provide to us.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50 flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">Device Data</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Browser type, IP address, operating system, and hardware details.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50 flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">Usage Data</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Pages visited, time spent, interaction analytics, and features accessed.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50 flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">Timetable Data</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Your schedules, events, classes, and shared calendar information.</p>
              </div>
            </div>
          </section>

          {/* 2. Use of Your Information */}
          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-blue-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 text-foreground">
              <Activity className="w-6 h-6 text-blue-500 flex-shrink-0" /> 2. Use of Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience:</p>
            <ul className="space-y-3">
              {[
                "Create and manage your account seamlessly.",
                "Email you regarding your account, updates, or alerts.",
                "Increase the efficiency and operation of the core application.",
                "Monitor and analyze usage and trends to improve your experience.",
                "Notify you of critical updates to our services."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm sm:text-base text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Disclosure */}
          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-blue-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 text-foreground">
              <UserCheck className="w-6 h-6 text-blue-500 flex-shrink-0" /> 3. Disclosure of Info
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">We prioritize your privacy and will only share or disclose your information in these specific situations:</p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <h3 className="font-semibold text-foreground mb-1">By Law or to Protect Rights</h3>
                <p className="text-sm text-muted-foreground">If we believe the release of information is strictly necessary to respond to legal process.</p>
              </div>
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <h3 className="font-semibold text-foreground mb-1">Third-Party Service Providers</h3>
                <p className="text-sm text-muted-foreground">We securely share information with verified vendors who assist us in operating our platform (e.g. secure database hosting).</p>
              </div>
            </div>
          </section>

          {/* 4. Security */}
          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-blue-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-4 text-foreground">
              <Lock className="w-6 h-6 text-blue-500 flex-shrink-0" /> 4. Security
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              We use administrative, technical, and physical security measures to protect your personal information. 
              While we have taken reasonable steps to secure the personal information you provide to us, please be aware that internet security is continuously evolving, and no method of data transmission can be guaranteed completely against interception.
            </p>
          </section>

          {/* 5. Contact & Additional info */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-xl font-bold flex items-center gap-3 mb-4 text-foreground">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" /> 5. Contact Us
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>If you have questions about this policy, contact us:</p>
                <div className="p-3 bg-muted/30 rounded-lg border border-border/50 space-y-2">
                  <p className="flex items-center gap-2"><strong className="text-foreground">Email:</strong> privacy@timely.app</p>
                  <p className="flex items-start gap-2"><strong className="text-foreground">Address:</strong> 123 Schedule Street,<br/>Time City, TC 12345</p>
                </div>
              </div>
            </section>
            
            <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-blue-500/30 transition-colors">
              <h2 className="text-xl font-bold flex items-center gap-3 mb-4 text-foreground">
                <RefreshCw className="w-5 h-5 text-blue-500 flex-shrink-0" /> 6. Changes
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                We reserve the right to modify this privacy policy at any time. Changes take effect immediately upon posting to the Website.
              </p>
              <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-500 rounded-md text-xs font-semibold">Will notify on material changes</div>
            </section>
          </div>

          {/* 7, 8, 9, 10 sections compressed into collapsible style or small cards */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
             <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 hover:border-blue-500/30 transition-colors">
               <h2 className="text-lg font-bold flex items-center gap-2 mb-3 text-foreground">
                 <Cookie className="w-5 h-5 text-blue-500 flex-shrink-0" /> Cookies
               </h2>
               <p className="text-sm text-muted-foreground">We use tracking technologies to hold information. You can instruct your browser to refuse all cookies, which may affect features.</p>
             </section>
             <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 hover:border-blue-500/30 transition-colors">
               <h2 className="text-lg font-bold flex items-center gap-2 mb-3 text-foreground">
                 <Smartphone className="w-5 h-5 text-blue-500 flex-shrink-0" /> Children's Privacy
               </h2>
               <p className="text-sm text-muted-foreground">Our Service is not intended for children under 13. We do not knowingly collect their data and will immediately delete it if found.</p>
             </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
