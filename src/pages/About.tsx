export default function About() {
  return (
    <div className="bg-white py-24 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8"></div>
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          About Us
        </h1>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Mission
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At <strong>Rental Insight</strong>, our mission is to simplify the
            process of finding on-campus housing. We understand that searching
            for the perfect place to live while attending school can be
            overwhelming, so we created a tool that makes the process as
            stress-free as possible. Our goal is to connect students with
            housing options that meet their specific needs and preferences,
            making campus life more comfortable and enjoyable.
          </p>
        </section>
        <br></br>
        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            What We Do
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We provide a platform where students can easily browse, filter, and
            discover housing options that suit their unique requirements. By
            leveraging the power of data scraping and custom filters, our app
            delivers personalized housing recommendations straight to your
            inbox. Whether you&apos;re looking for a quiet single room, a place
            close to the gym, or a budget-friendly option, we&apos;ve got you
            covered.
          </p>
        </section>
        <br></br>
        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            How It Works
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our app scrapes data from a variety of official campus housing
            resources to ensure you have access to the most current and
            comprehensive listings available. You set your preferences—such as
            price range, room type, amenities, and more—and we do the rest. Our
            system continuously scans for new listings that match your criteria
            and sends them directly to you via a personalized newsletter.
          </p>
        </section>
        <br></br>
        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Why We&apos;re Different
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe that finding the right housing should be tailored to you.
            Unlike other platforms that give you a generic list of options, our
            app puts you in control by allowing you to customize your search. We
            also keep you informed with real-time updates, so you never miss out
            on the perfect place.
          </p>
        </section>
        <br></br>
        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Team
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are a passionate group of students and professionals who have
            experienced the challenges of finding campus housing firsthand. Our
            team is dedicated to making this process easier and more efficient
            for everyone. We combine expertise in technology, design, and
            student life to create a service that truly understands and meets
            the needs of students.
          </p>
        </section>
        <br></br>
        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Sign Up Today
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ready to find your perfect on-campus home?{' '}
            <a href="/signup">Sign up today</a> and let us help you take the
            hassle out of housing.
          </p>
        </section>
      </div>
    </div>
  );
}
