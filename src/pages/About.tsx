export default function About() {
  return (
    <div className="py-24 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Title */}
        <h1 className="text-5xl font-extrabold tracking-tight text-center" style={{ color: '#0b7a75' }}>
          About Us
        </h1>

        <div className="mt-16 space-y-20">

          {/* Our Mission Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              Our Mission
            </h2>
            <p className="mt-4 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              At <strong>Rental Insight</strong>, our mission is to simplify the process of finding on-campus housing.
              We aim to connect students with housing options that meet their specific needs and preferences, making campus life more comfortable and enjoyable.
            </p>
          </section>

          {/* What We Do Section */}
          <section className="bg-white py-12 px-6 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              What We Do
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              We provide a platform where students can easily browse, filter, and discover housing options that suit their unique requirements.
              Our app delivers personalized housing recommendations straight to your inbox, helping you find options like quiet rooms, budget-friendly apartments, or places near the gym.
            </p>
          </section>

          {/* How It Works Section */}
          <section className="bg-gray-100 py-12 px-6 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              How It Works
            </h2>
            <ul className="mt-4 text-lg leading-8 text-gray-600 max-w-3xl mx-auto list-disc list-inside">
              <li>Our app scrapes data from official campus housing resources.</li>
              <li>Set preferences such as price, room type, and amenities.</li>
              <li>We send new listings that match your criteria to your inbox.</li>
            </ul>
          </section>

          {/* Why We are Different Section */}
          <section className="bg-white py-12 px-6 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              Why We are Different
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Unlike generic platforms, our app lets you customize your search and stay updated with real-time notifications so that you never miss out on the perfect place.
            </p>
          </section>

          {/* Our Team Section */}
          <section className="bg-gray-100 py-12 px-6 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              Our Team
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              We are a passionate group of students and professionals committed to making campus housing easier to navigate. Our team leverages technology and firsthand experiences to create a service that understands students' needs.
            </p>
          </section>

          {/* Sign Up Section */}
          <section className="text-center py-12">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: '#0b7a75' }}>
              Sign Up Today
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-xl mx-auto">
              Ready to find your perfect on-campus home?{' '}
              <a href="/signup" className="font-semibold hover:underline" style={{ color: '#0b7a75' }}>
                Sign up today
              </a>{' '}
              and let us help you take the hassle out of housing.
            </p>
            <a
              href="/signup"
              className="mt-6 inline-block px-8 py-3 text-white text-lg font-semibold rounded-lg shadow hover:opacity-90 transition"
              style={{ backgroundColor: '#0b7a75' }}
            >
              Get Started
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}
