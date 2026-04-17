'use client';

import { Footer } from '@/components/footer';
import { FileText, CheckCircle2, ShieldOff, ShieldAlert, FileWarning, ExternalLink, RefreshCw, Scale, Users, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex flex-col relative w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-purple-500/10 via-background to-background pt-20 pb-16 border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-purple-500/10 rounded-2xl mb-6 border border-purple-500/20 shadow-sm">
            <FileText className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using the Timely application. Your access to and use of the Service is conditioned on your acceptance of these Terms.
          </p>
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-muted/80 backdrop-blur-sm text-foreground text-xs sm:text-sm font-medium border border-border/50 shadow-sm">
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}
          </div>
        </div>
      </div>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background relative z-10">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          
          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-purple-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-4 text-foreground">
              <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0" /> 1. Agreement to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              By accessing and using the Timely application (the &quot;Service&quot;), you accept and 
              agree to be bound by and comply with these Terms of Service. If you do not agree to 
              abide by the above, please do not use this service.
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-purple-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 text-foreground">
              <ShieldCheck className="w-6 h-6 text-purple-500 flex-shrink-0" /> 2. Use License
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
              Permission is granted to temporarily download one copy of the materials (information 
              or software) on Timely&apos;s Service for personal, non-commercial transitory viewing only. 
              Under this license you may <strong>not</strong>:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Modify or copy the materials.",
                "Use materials for commercial purpose or public display.",
                "Decompile or reverse engineer any software.",
                "Remove any copyright or proprietary notations.",
                "Transfer materials to another person or 'mirror' them.",
                "Sell, trade, or exploit the Service."
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-muted-foreground p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-purple-500/30 transition-colors">
              <h2 className="text-lg font-bold flex items-center gap-3 mb-3 text-foreground">
                <ShieldOff className="w-5 h-5 text-purple-500 flex-shrink-0" /> 3. Disclaimer
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Materials are provided &apos;as is&apos;. Timely disclaims all implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </section>
            
            <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-purple-500/30 transition-colors">
              <h2 className="text-lg font-bold flex items-center gap-3 mb-3 text-foreground">
                <ShieldAlert className="w-5 h-5 text-purple-500 flex-shrink-0" /> 4. Limitations
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In no event shall Timely be liable for damages (including loss of data or profit) arising out of the use or inability to use the materials.
              </p>
            </section>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-purple-500/30 transition-colors">
              <h2 className="text-lg font-bold flex items-center gap-3 mb-3 text-foreground">
                <FileWarning className="w-5 h-5 text-purple-500 flex-shrink-0" /> 5. Accuracy
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Materials could include technical, typographical, or photographic errors. Timely does not warrant that materials are accurate or current.
              </p>
            </section>
            
            <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-purple-500/30 transition-colors">
              <h2 className="text-lg font-bold flex items-center gap-3 mb-3 text-foreground">
                <ExternalLink className="w-5 h-5 text-purple-500 flex-shrink-0" /> 6. Links
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Timely has not reviewed all linked sites and is not responsible for their contents. Inclusion of a link does not imply endorsement.
              </p>
            </section>
          </div>

          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-purple-500/30 transition-colors">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2"><RefreshCw className="w-4 h-4 text-purple-500"/> 7. Modifications</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Timely may revise these terms at any time. By continuing to use the Service, you agree to be bound by the current version of these terms.
                </p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2"><Scale className="w-4 h-4 text-purple-500"/> 8. Governing Law</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of Timely's operating jurisdiction, and you submit to the exclusive jurisdiction of those courts.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-purple-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 text-foreground">
              <Users className="w-6 h-6 text-purple-500 flex-shrink-0" /> 9. User Responsibilities & Security
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <h3 className="font-semibold text-foreground mb-1">Code of Conduct</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">You agree to use the Service only for lawful purposes. Prohibited behavior includes harassing, transmitting obscene content, or disrupting the normal flow of the Service.</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <h3 className="font-semibold text-foreground mb-1">Account Security</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">You are strictly responsible for maintaining the confidentiality of your account information. You must notify us immediately of any unauthorized use.</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
