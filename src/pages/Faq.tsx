import { useState } from 'react';
import {
  FaQuestionCircle,
  FaUserPlus,
  FaFilter,
  FaRedo,
  FaBell,
  FaDatabase,
  FaEnvelopeOpenText,
  FaBug,
} from 'react-icons/fa';

interface FAQItem {
  id: number;
  icon: React.ComponentType;
  question: string;
  answer: React.ReactNode;
}

export default function FAQ() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const toggleSection = (id: number) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const faqItems: FAQItem[] = [
    {
      id: 1,
      icon: FaQuestionCircle,
      question: 'What is this web app for?',
      answer:
        "This web app helps you find on-campus housing that meets your specific needs. You can set custom filters based on your preferences, and we'll send you the most relevant housing options directly to your inbox in a newsletter.",
    },
    {
      id: 2,
      icon: FaUserPlus,
      question: 'How do I create an account?',
      answer:
        'To create an account, click on the Sign Up button on the homepage. Fill in your basic information, set your preferences, and you will be ready to start receiving personalized housing options.',
    },
    {
      id: 3,
      icon: FaFilter,
      question: 'What kind of filters can I set?',
      answer: (
        <ul className="list-none space-y-2">
          <li>• Price</li>
          <li>• Move-In Date</li>
          <li>• Gender Preference</li>
          <li>• Number of Bedrooms and Bathrooms</li>
          <li>• Parking</li>
          <li>• And more...</li>
        </ul>
      ),
    },
    {
      id: 4,
      icon: FaRedo,
      question: 'Can I update my filters after setting them?',
      answer:
        'Yes, you can update your filters anytime by logging into your account and adjusting your preferences. Your newsletter will then reflect your updated criteria.',
    },
    {
      id: 5,
      icon: FaBell,
      question: 'What if there are no housing options that match my filters?',
      answer:
        "If no options match your filters, you'll receive a notification in your newsletter letting you know. We'll continue to search and update you as soon as a match becomes available.",
    },
    {
      id: 6,
      icon: FaDatabase,
      question: 'How is the housing information sourced?',
      answer:
        'Our app scrapes data from various official campus housing websites and databases to bring you the most up-to-date and comprehensive listings available.',
    },
    {
      id: 7,
      icon: FaEnvelopeOpenText,
      question: 'How do I unsubscribe from the newsletter?',
      answer:
        'If you no longer wish to receive housing updates, you can unsubscribe at any time by clicking the Unsubscribe link at the bottom of any newsletter or by managing your preferences in your account settings.',
    },
    {
      id: 8,
      icon: FaBug,
      question: 'Can I suggest a feature or report a bug?',
      answer: (
        <div>
          Absolutely! We're always looking to improve. You can suggest features
          or report bugs by contacting our support team at
          <a
            href="mailto:klazarevdev@gmail.com"
            className="ml-1 text-teal-600 underline"
          >
            klazarevdev@gmail.com
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-12 text-center text-3xl font-semibold text-teal-700">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqItems.map(({ id, icon: Icon, question, answer }) => (
            <div key={id} className="border-b border-gray-200 pb-6">
              <button
                onClick={() => toggleSection(id)}
                className="flex w-full items-center text-left"
              >
                <Icon className="flex-shrink-0 text-2xl text-teal-600" />
                <span className="ml-4 text-xl font-medium text-gray-900">
                  {question}
                </span>
              </button>

              {openSections.has(id) && (
                <div className="mt-4">
                  <div className="ml-10 text-lg leading-relaxed text-gray-600">
                    {answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
