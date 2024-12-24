import { Link } from 'react-router-dom';

export default function About() {
  const sections = [
    {
      id: 'mission',
      title: 'Our Mission',
      content:
        'At Rental Insight, our mission is to simplify the process of finding on-campus housing. We aim to connect students with housing options that meet their specific needs and preferences, making campus life more comfortable and enjoyable.',
      variant: 'centered',
    },
    {
      id: 'what-we-do',
      title: 'What We Do',
      content:
        'We provide a platform where students can easily browse, filter, and discover housing options that suit their unique requirements. Our app delivers personalized housing recommendations straight to your inbox, helping you find options like quiet rooms, budget-friendly apartments, or places near the gym.',
      variant: 'card',
      icon: '🏠',
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      content:
        'Our app scrapes data from official campus housing resources. Set preferences such as price, room type, and amenities. We send new listings that match your criteria to your inbox',
      variant: 'card',
      icon: '⚡',
    },
    {
      id: 'why-different',
      title: 'Why We are Different',
      content:
        'Unlike generic platforms, our app lets you customize your search and stay updated with real-time notifications so that you never miss out on the perfect place.',
      variant: 'card',
      icon: '💡',
    },
    {
      id: 'team',
      title: 'Our Team',
      content:
        'We are a passionate group of students and professionals committed to making campus housing easier to navigate. Our team leverages technology and firsthand experiences to create a service that understands students needs.',
      variant: 'card',
      icon: '👥',
    },
  ];

  interface Section {
    id: string;
    title: string;
    content: string;
    variant: string;
    icon?: string;
  }

  const renderSection = (section: Section) => {
    switch (section.variant) {
      case 'centered':
        return (
          <section key={section.id} className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              {section.title}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-600">
              {section.content}
            </p>
          </section>
        );

      case 'card':
        return (
          <section
            key={section.id}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-xl transition-transform duration-300 group-hover:scale-110">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                {section.title}
              </h2>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {section.content}
            </p>
            {/* Decorative element */}
            <div className="absolute right-0 top-0 -z-10 h-32 w-32 -translate-y-8 translate-x-8 transform rounded-full bg-primary/5" />
          </section>
        );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      {/* Main Title with decorative elements */}
      <div className="relative text-center">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-extrabold tracking-tight text-transparent lg:text-7xl">
          About Us
        </h1>
      </div>

      {/* Main content sections */}
      <div className="mt-24 space-y-16">
        <div className="grid gap-16">{sections.map(renderSection)}</div>

        {/* Sign Up Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-16 text-center text-white shadow-lg">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tight">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-100">
              Sign up today and let us help you take the hassle out of housing.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-primary shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 -z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white opacity-10" />
          <div className="absolute bottom-0 right-0 -z-0 h-48 w-48 translate-x-1/3 translate-y-1/3 transform rounded-full bg-white opacity-10" />
        </section>
      </div>
    </div>
  );
}
