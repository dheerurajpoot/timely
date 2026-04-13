'use client';

import { Footer } from '@/components/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="px-4 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto prose prose-invert dark:prose">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>Introduction</h2>
          <p>
            At Timely, we are committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you visit our application.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, and other information you provide</li>
            <li><strong>Device Data:</strong> Browser type, IP address, and operating system</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, and features accessed</li>
            <li><strong>Timetable Data:</strong> Your schedules, events, and calendar information</li>
            <li><strong>Communication Data:</strong> Messages, support requests, and feedback</li>
          </ul>

          <h2>2. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul>
            <li>Create and manage your account</li>
            <li>Email you regarding your account or order</li>
            <li>Fulfill and send out orders, and send related information</li>
            <li>Generate a personal profile about you</li>
            <li>Increase the efficiency and operation of the Site</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site</li>
            <li>Notify you of updates to the Site</li>
            <li>Offer new products, services, and/or recommendations to you</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share or disclose your information in the following situations:
          </p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information is necessary</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with vendors who assist us in operating our Site</li>
            <li><strong>Business Transfers:</strong> Your information may be transferred as part of a merger, acquisition, or sale</li>
          </ul>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to protect your personal information. 
            However, no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@timely.app</li>
            <li>Address: 123 Schedule Street, Time City, TC 12345</li>
          </ul>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to modify this privacy policy at any time, so please review it frequently. 
            Changes and clarifications will take effect immediately upon their posting to the Website. 
            If we make material changes to this policy, we will notify you here about the change.
          </p>

          <h2>7. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Service and hold 
            certain information. You can instruct your browser to refuse all cookies or to indicate when 
            a cookie is being sent.
          </p>

          <h2>8. Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have the following rights:
          </p>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate data</li>
            <li>Right to erasure of your data</li>
            <li>Right to restrict processing of your data</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at privacy@timely.app
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites. We are not responsible for the privacy 
            practices of these websites. We encourage you to review the privacy policies of any third-party 
            site before providing your personal information.
          </p>

          <h2>10. Children&apos;s Privacy</h2>
          <p>
            Our Service is not intended for children under the age of 13. We do not knowingly collect 
            personal information from children under 13. If we become aware that a child under 13 has 
            provided us with personal information, we will delete such information immediately.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
