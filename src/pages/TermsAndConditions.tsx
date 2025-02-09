import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 rounded-lg bg-white p-8 shadow-sm">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                1. Newsletter Subscription
              </h2>
              <p className="mt-3 text-gray-600">
                By subscribing to our newsletter, you agree to receive periodic
                emails containing news, updates, and promotional content. You
                can unsubscribe at any time using the link provided in each
                email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                2. Data Collection
              </h2>
              <p className="mt-3 text-gray-600">
                We collect and store your email address solely for the purpose
                of sending our newsletter. We may also collect basic analytics
                data such as open rates and click rates to improve our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                3. Data Protection
              </h2>
              <p className="mt-3 text-gray-600">
                Your email address is stored securely and will never be sold,
                rented, or shared with third parties without your explicit
                consent, except where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                4. Your Rights
              </h2>
              <p className="mt-3 text-gray-600">
                As a user, you have the right to:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                <li>Unsubscribe from our newsletter at any time</li>
                <li>Request access to your personal data</li>
                <li>Request deletion of your data</li>
                <li>Modify your subscription preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                5. Changes to Terms
              </h2>
              <p className="mt-3 text-gray-600">
                We reserve the right to modify these terms at any time. We will
                notify you of any material changes via email. Your continued use
                of our service after such modifications constitutes acceptance
                of the updated terms.
              </p>
            </section>

            <Alert className="mt-8">
              <AlertDescription>
                For questions about these terms, please contact us at{' '}
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
