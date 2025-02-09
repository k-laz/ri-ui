import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="mx-auto max-w-2xl py-24 sm:py-48">
      {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Announcing our next round of funding.{' '}
          <a href="#" className="font-semibold text-primary">
            <span className="absolute inset-0" aria-hidden="true" />
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div> */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Be the first to know about housing in Vancouver!
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Tired of scrolling through Facebook groups? Sign up for our newsletter
          today to get instant search results based on exactly what you are
          looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/signup"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Join Us
          </Link>
          <Link
            to="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="relative mb-14 mt-14">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              or explore our features
            </span>
          </div>
        </div>
        <div className="mt-16">
          <Link
            to="/dashboard"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 text-xl font-bold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-gradient-to-bl hover:shadow-lg"
          >
            <span className="relative rounded-md bg-white px-8 py-4 transition-all duration-300 ease-out group-hover:bg-opacity-0">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:text-white">
                Dashboard
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
