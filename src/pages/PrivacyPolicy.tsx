import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We value your privacy and are committed to protecting your personal
            data.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 rounded-lg bg-white p-8 shadow-sm">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                1. Information We Collect
              </h2>
              <p className="mt-3 text-gray-600">
                We collect and process the following information:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Email address for newsletter subscription</li>
                <li>Newsletter preferences and settings</li>
                <li>Usage data and analytics (email opens, clicks)</li>
                <li>Technical data (IP address, browser type, device info)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                2. How We Use Your Data
              </h2>
              <p className="mt-3 text-gray-600">
                Your information is used for:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Sending our newsletter and updates</li>
                <li>Improving our service and content</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Responding to your inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                3. Data Security
              </h2>
              <p className="mt-3 text-gray-600">
                We implement appropriate technical and organizational measures
                to protect your data:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Strict access controls and authentication</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                4. Cookie Policy
              </h2>
              <p className="mt-3 text-gray-600">
                Our website uses cookies for:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Essential website functionality</li>
                <li>Analytics and performance monitoring</li>
                <li>User preference storage</li>
              </ul>
              <p className="mt-3 text-gray-600">
                You can control cookie settings through your browser
                preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                5. Your Privacy Rights
              </h2>
              <p className="mt-3 text-gray-600">
                Under applicable data protection laws, you have the right to:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <Alert className="mt-8">
              <AlertDescription>
                For privacy-related inquiries, please contact us at{' '}
                <a
                  href="mailto:newsletter@rentalsinsight.com"
                  className="font-medium text-primary hover:underline"
                >
                  newsletter@rentalsinsight.com
                </a>
              </AlertDescription>
            </Alert>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
}
