export default function About() {
  return (
    <div className="bg-white py-24 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8"></div>
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Frequently Asked Questions
        </h1>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            What is this web app for?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            This web app helps you find on-campus housing that meets your
            specific needs. You can set custom filters based on your
            preferences, and we’ll send you the most relevant housing options
            directly to your inbox in a newsletter.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            How do I create an account?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            To create an account, click on the Sign Up button on the homepage.
            Fill in your basic information, set your preferences, and you will
            be ready to start receiving personalized housing options.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            What kind of filters can I set?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            You can filter housing options based on a variety of criteria,
            including:
          </p>
          <ul className="mt-6 text-lg leading-8 text-gray-600">
            <li>- Max Price</li>
            <li>- Move-In Date</li>
            <li>- Gender Preference</li>
            <li>- Number of Bedrooms and Bathrooms</li>
            <li>- Parking</li>
            <li>And more...</li>
          </ul>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Can I update my filters after setting them?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Yes, you can update your filters anytime by logging into your
            account and adjusting your preferences. Your newsletter will then
            reflect your updated criteria.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            What if there are no housing options that match my filters?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            If no options match your filters, you’ll receive a notification in
            your newsletter letting you know. We’ll continue to search and
            update you as soon as a match becomes available.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            How is the housing information sourced?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our app scrapes data from various official campus housing websites
            and databases to bring you the most up-to-date and comprehensive
            listings available.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            How do I unsubscribe from the newsletter?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            If you no longer wish to receive housing updates, you can
            unsubscribe at any time by clicking the Unsubscribe link at the
            bottom of any newsletter or by managing your preferences in your
            account settings.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Can I suggest a feature or report a bug?
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Absolutely! We’re always looking to improve. You can suggest
            features or report bugs directly through the app or by contacting
            our support team.
          </p>
        </section>
      </div>
    </div>
  );
}
