'use client';

import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="px-4 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto prose prose-invert dark:prose">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using the Timely application (the &quot;Service&quot;), you accept and 
            agree to be bound by and comply with these Terms of Service. If you do not agree to 
            abide by the above, please do not use this service.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information 
            or software) on Timely&apos;s Service for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on Timely&apos;s Service</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
            <li>Sell, trade, or otherwise exploit the Service for commercial use</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on Timely&apos;s Service are provided on an &apos;as is&apos; basis. Timely makes no 
            warranties, expressed or implied, and hereby disclaims and negates all other warranties 
            including, without limitation, implied warranties or conditions of merchantability, 
            fitness for a particular purpose, or non-infringement of intellectual property or other 
            violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall Timely or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising 
            out of the use or inability to use the materials on Timely&apos;s Service, even if Timely or 
            an authorized representative has been notified orally or in writing of the possibility of 
            such damage.
          </p>

          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on Timely&apos;s Service could include technical, typographical, or 
            photographic errors. Timely does not warrant that any of the materials on its Service are 
            accurate, complete, or current. Timely may make changes to the materials contained on its 
            Service at any time without notice.
          </p>

          <h2>6. Links</h2>
          <p>
            Timely has not reviewed all of the sites linked to its Internet web site and is not 
            responsible for the contents of any such linked site. The inclusion of any link does not 
            imply endorsement by Timely of the site. Use of any such linked web site is at the user&apos;s 
            own risk.
          </p>

          <h2>7. Modifications</h2>
          <p>
            Timely may revise these terms of service for its Service at any time without notice. By 
            using this Service, you are agreeing to be bound by the then current version of these 
            terms of service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of 
            the jurisdiction where Timely is located, and you irrevocably submit to the exclusive 
            jurisdiction of the courts in that location.
          </p>

          <h2>9. User Responsibilities</h2>
          <p>
            You agree to use the Service only for lawful purposes and in a way that does not infringe 
            upon the rights of others or restrict their use and enjoyment of the Service. Prohibited 
            behavior includes harassing or causing distress or inconvenience to any person, transmitting 
            obscene or offensive content, or disrupting the normal flow of dialogue within our Service.
          </p>

          <h2>10. Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information and 
            password. You agree to accept responsibility for all activities that occur under your 
            account. You must notify us immediately of any unauthorized use of your account.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
