import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data collection details for Dev-Roy Personal Space.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information from you when you subscribe to our newsletter, respond to a survey, or fill out a form. 
          When commenting or submitting forms on our site, you may be asked to enter your name, email address, or other details to help you with your experience.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          Any of the information we collect from you may be used in one of the following ways:
        </p>
        <ul>
          <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
          <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
          <li>To send periodic emails (if you opt-in to our mailing list)</li>
        </ul>

        <h2>3. Google AdSense & DoubleClick Cookie</h2>
        <p>
          Google, as a third party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet. 
          Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
        </p>

        <h2>4. Third-Party Links</h2>
        <p>
          Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. 
          We therefore have no responsibility or liability for the content and activities of these linked sites.
        </p>

        <h2>5. Consent</h2>
        <p>
          By using our site, you consent to our website's privacy policy.
        </p>

        <h2>6. Contacting Us</h2>
        <p>
          If there are any questions regarding this privacy policy, you may contact us using our <Link href="/contact" className="text-accent hover:underline">Contact Page</Link>.
        </p>
      </div>
    </div>
  );
}
