'use client';

import { Footer } from '@/components/footer';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="px-4 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto prose prose-invert dark:prose">
          <h1>Disclaimer</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>General Disclaimer</h2>
          <p>
            The information provided on the Timely application is for informational purposes only. 
            We make no representations or warranties of any kind, express or implied, about the completeness, 
            accuracy, reliability, suitability, or availability of the information contained on the Service 
            or related graphics.
          </p>

          <h2>1. No Professional Advice</h2>
          <p>
            The Timely application is a scheduling and time management tool. The information, suggestions, 
            and content provided are not professional advice. Timely does not provide medical, legal, 
            financial, or professional advice of any kind. Any reliance you place on such information is 
            strictly at your own risk.
          </p>

          <h2>2. Limitations of Use</h2>
          <p>
            To the fullest extent permissible by law, Timely disclaims all warranties, express or implied, 
            including but not limited to implied warranties of merchantability, fitness for a particular 
            purpose, non-infringement, and title. Timely does not warrant that:
          </p>
          <ul>
            <li>The Service will meet your requirements</li>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results from the Service will be accurate, complete, or reliable</li>
            <li>Any errors in the Service will be corrected</li>
            <li>The Service will be compatible with all devices or browsers</li>
          </ul>

          <h2>3. Third-Party Content</h2>
          <p>
            Timely is not responsible for the accuracy, completeness, or authenticity of any third-party 
            content, links, or resources that may be referenced on the Service. Your use of third-party 
            websites and resources is at your own risk.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall Timely, its directors, employees, or agents be liable to you for any indirect, 
            incidental, special, consequential, or punitive damages resulting from your use of or inability 
            to use the Service, even if Timely has been advised of the possibility of such damages.
          </p>

          <h2>5. Data Loss</h2>
          <p>
            While we implement security measures to protect your data, Timely cannot guarantee the prevention 
            of data loss or unauthorized access. You are responsible for maintaining backups of your important 
            timetable information.
          </p>

          <h2>6. Service Availability</h2>
          <p>
            Timely makes no guarantee regarding the continuous availability of the Service. We may perform 
            maintenance, updates, or improvements that could temporarily interrupt service access. We will 
            endeavor to provide notice of such interruptions when possible.
          </p>

          <h2>7. User-Generated Content</h2>
          <p>
            You are solely responsible for any content you create, upload, or share through the Service. 
            Timely is not responsible for such content and does not endorse, approve, or warrant the accuracy 
            or completeness of any user-generated content.
          </p>

          <h2>8. Accessibility</h2>
          <p>
            While we strive to make our Service accessible, we do not guarantee that the Service is fully 
            compliant with accessibility standards. Some features may not be accessible to users with certain 
            disabilities.
          </p>

          <h2>9. Product Changes</h2>
          <p>
            Timely reserves the right to modify, suspend, or discontinue the Service or any features or 
            functionality at any time, with or without notice. We are not liable to you or any third party 
            for any modifications, suspension, or discontinuation.
          </p>

          <h2>10. No Warranty Against Interference</h2>
          <p>
            Timely does not warrant that the Service will be free from viruses, malware, or other harmful 
            code. Users are responsible for implementing appropriate technical safeguards on their devices.
          </p>

          <h2>11. Severability</h2>
          <p>
            If any portion of this disclaimer is found to be invalid or unenforceable, the remaining portions 
            shall remain in full force and effect.
          </p>

          <h2>12. Acknowledgment</h2>
          <p>
            By using the Timely application, you acknowledge that you have read this disclaimer and agree to 
            be bound by its terms. If you do not agree with any part of this disclaimer, please do not use 
            the Service.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about this disclaimer, please contact us at:
            <br />
            Email: legal@timely.app
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
