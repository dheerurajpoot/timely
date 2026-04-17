'use client';

import { Footer } from '@/components/footer';
import { AlertTriangle, Info, Scale, Link as LinkIcon, ShieldAlert, CloudOff, ServerOff, UserX, Accessibility, Settings, Smartphone, CheckSquare } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col relative w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-yellow-500/10 via-background to-background pt-20 pb-16 border-b border-border/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-yellow-500/5 rounded-full blur-[100px] -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-2xl mb-6 border border-yellow-500/20 shadow-sm">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">Disclaimer</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Important information about the limitations of liability and use of the Timely application.
          </p>
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-muted/80 backdrop-blur-sm text-foreground text-xs sm:text-sm font-medium border border-border/50 shadow-sm">
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}
          </div>
        </div>
      </div>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background relative z-10">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          
          {/* General Disclaimer Summary */}
          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-yellow-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-4 text-foreground">
              <Info className="w-6 h-6 text-yellow-500 flex-shrink-0" /> General Disclaimer
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              The information provided on the Timely application is for informational purposes only. 
              We make no representations or warranties of any kind, express or implied, about the completeness, 
              accuracy, reliability, suitability, or availability of the information contained on the Service 
              or related graphics.
            </p>
          </section>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-yellow-500/30 transition-colors">
              <h2 className="text-lg font-bold flex items-center gap-3 mb-3 text-foreground">
                <Scale className="w-5 h-5 text-yellow-500 flex-shrink-0" /> 1. No Professional Advice
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Timely is a scheduling tool. The content provided is not professional, medical, legal, or financial advice. Any reliance on such information is strictly at your own risk.
              </p>
            </section>
            
            <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-yellow-500/30 transition-colors">
              <h2 className="text-lg font-bold flex items-center gap-3 mb-3 text-foreground">
                <LinkIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" /> 2. Third-Party Content
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Timely is not responsible for the accuracy or authenticity of third-party content or links referenced on the Service. Use of third-party websites is at your own risk.
              </p>
            </section>
          </div>

          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-yellow-500/30 transition-colors">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 text-foreground">
              <ShieldAlert className="w-6 h-6 text-yellow-500 flex-shrink-0" /> 3. Limitations of Liability & Warranty
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
              To the fullest extent permissible by law, Timely disclaims all warranties, express or implied. In no event shall Timely be liable for indirect, incidental, or consequential damages. Timely does not warrant that:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "The Service will meet your specific requirements.",
                "Service will be completely uninterrupted or error-free.",
                "Results obtained will be perfectly accurate.",
                "Any errors in the software will be corrected.",
                "The platform will be compatible with all devices."
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border/50 shadow-sm p-5 flex flex-col items-center text-center gap-3 hover:border-yellow-500/30 transition-colors">
              <div className="p-2 bg-yellow-500/10 rounded-full"><CloudOff className="w-5 h-5 text-yellow-500"/></div>
              <h3 className="font-semibold text-sm">Data Loss</h3>
              <p className="text-xs text-muted-foreground">We cannot guarantee absolute prevention of data loss. Maintain backups.</p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 shadow-sm p-5 flex flex-col items-center text-center gap-3 hover:border-yellow-500/30 transition-colors">
              <div className="p-2 bg-yellow-500/10 rounded-full"><ServerOff className="w-5 h-5 text-yellow-500"/></div>
              <h3 className="font-semibold text-sm">Availability</h3>
              <p className="text-xs text-muted-foreground">We may perform maintenance interrupting service without guarantees.</p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 shadow-sm p-5 flex flex-col items-center text-center gap-3 hover:border-yellow-500/30 transition-colors">
              <div className="p-2 bg-yellow-500/10 rounded-full"><UserX className="w-5 h-5 text-yellow-500"/></div>
              <h3 className="font-semibold text-sm">User Content</h3>
              <p className="text-xs text-muted-foreground">You are solely responsible for content you share. We don't endorse it.</p>
            </div>
          </div>

          {/* Additional details */}
          <section className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 hover:border-yellow-500/30 transition-colors">
             <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm"><Accessibility className="w-4 h-4 text-yellow-500"/> Accessibility</h3>
                  <p className="text-xs text-muted-foreground">While we strive for accessibility, we don't guarantee full compliance with all standards across all disabilities.</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm"><Settings className="w-4 h-4 text-yellow-500"/> Changes</h3>
                  <p className="text-xs text-muted-foreground">We reserve the right to suspend or discontinue features without notice and without liability.</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm"><Smartphone className="w-4 h-4 text-yellow-500"/> Interference</h3>
                  <p className="text-xs text-muted-foreground">Users are responsible for their device security. We don't warranty against viruses or malware.</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm"><CheckSquare className="w-4 h-4 text-yellow-500"/> Agreement</h3>
                  <p className="text-xs text-muted-foreground">By using Timely, you acknowledge you read and agree to this disclaimer.</p>
                </div>
             </div>
          </section>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              For questions about this disclaimer, contact: <strong className="text-foreground">legal@timely.app</strong>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
