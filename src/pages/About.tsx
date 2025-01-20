import { Link } from 'react-router-dom';

interface Section {
  id: string;
  title: string;
  content: string;
  variant: 'centered' | 'regular';
  icon?: string;
}

export default function About() {
  const sections: Section[] = [
    {
      id: 'mission',
      title: 'Our Mission',
      content:
        'At Rentals Insight, our mission is to simplify the process of finding rental housing. We aim to connect people with housing options that meet their specific needs and preferences.',
      variant: 'centered',
    },
    {
      id: 'what-we-do',
      title: 'What We Do',
      content:
        'We provide a platform where people can set a filter for housing options that suit their unique requirements. Our app delivers personalized housing recommendations straight to your inbox, helping you find options like quiet rooms, budget-friendly apartments, or places near the gym.',
      variant: 'regular',
      icon: '🏠',
    },
    // {
    //   id: 'how-it-works',
    //   title: 'How It Works',
    //   content:
    //     'Our app scrapes data from official campus housing resources. Set preferences such as price, room type, and amenities. We send new listings that match your criteria to your inbox.',
    //   variant: 'regular',
    //   icon: '⚡',
    // },
    {
      id: 'why-different',
      title: 'Why We are Different',
      content:
        'Unlike generic platforms, our app lets you automate your search and stay updated with real-time notifications so that you never miss out on the perfect place.',
      variant: 'regular',
      icon: '💡',
    },
    {
      id: 'team',
      title: 'Our Team',
      content:
        'We are a passionate group of students and professionals committed to making renting easier to navigate. Our team leverages technology and firsthand experiences to create a service that understands peoples needs.',
      variant: 'regular',
      icon: '👥',
    },
  ];

  const renderSection = (section: Section) => {
    if (section.variant === 'centered') {
      return (
        <section key={section.id} className="mb-20 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            {section.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            {section.content}
          </p>
        </section>
      );
    }

    return (
      <section
        key={section.id}
        className="mb-16 border-b border-gray-100 pb-16 last:border-0"
      >
        <div className="flex items-start gap-4">
          {section.icon && <span className="text-2xl">{section.icon}</span>}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {section.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{section.content}</p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div>{sections.map(renderSection)}</div>

      <section className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Ready to Find Your Perfect Home?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Sign up today and let us help you take the hassle out of housing.
        </p>
        <Link
          to="/signup"
          className="mt-8 inline-block rounded bg-primary px-8 py-3 text-lg font-medium text-white hover:bg-secondary"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
