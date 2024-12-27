import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const TermsModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="font-medium text-primary hover:underline">
        Terms and Conditions
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="mb-4 text-xl font-bold">
            Terms and Conditions & Privacy Policy
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <section>
            <h3 className="mb-2 font-semibold">1. Newsletter Subscription</h3>
            <p className="text-gray-600">
              By subscribing to our newsletter, you agree to receive periodic
              emails containing news, updates, and promotional content. You can
              unsubscribe at any time using the link provided in each email.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold">2. Data Collection</h3>
            <p className="text-gray-600">
              We collect and store your email address solely for the purpose of
              sending our newsletter. We may also collect basic analytics data
              such as open rates and click rates to improve our service.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold">3. Data Protection</h3>
            <p className="text-gray-600">
              Your email address is stored securely and will never be sold,
              rented, or shared with third parties without your explicit
              consent, except where required by law.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold">4. Your Rights</h3>
            <p className="text-gray-600">You have the right to:</p>
            <ul className="ml-6 list-disc text-gray-600">
              <li>Unsubscribe at any time</li>
              <li>Request access to your personal data</li>
              <li>Request deletion of your data</li>
              <li>Modify your subscription preferences</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 font-semibold">5. Contact Us</h3>
            <p className="text-gray-600">
              If you have any questions about these terms or your data, please
              contact us at [newsletter@rentalsinsight.com].
            </p>
          </section>

          <div className="mt-6 text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
