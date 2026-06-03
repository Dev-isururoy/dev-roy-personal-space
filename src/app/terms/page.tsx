import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and conditions for Dev-Roy Personal Space.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
          In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          The site and its original content, features, and functionality are owned by the author and are protected by international copyright, 
          trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>

        <h2>3. Use of Content</h2>
        <p>
          All content provided on this blog is for informational purposes only. The owner of this blog makes no representations as to the accuracy or 
          completeness of any information on this site or found by following any link on this site.
        </p>

        <h2>4. Disclaimer / Affiliate Links</h2>
        <p>
          Some links on this website may be affiliate links. If you click on these links and make a purchase, the owner of this site may earn a commission 
          at no extra cost to you. This helps support the maintenance of the blog.
        </p>

        <h2>5. Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. We do so by posting and drawing attention to the updated terms on the Site. 
          Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms of Service.
        </p>
      </div>
    </div>
  );
}
