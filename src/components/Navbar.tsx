import { NavLink, Link } from 'react-router-dom';
import { Button, Dialog, DialogPanel } from '@headlessui/react';
import { useState } from 'react';
import logo from '../assets/images/RI-Logo-Simple.svg';
import { useAuth } from '@/hooks/AuthProvider';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  // { name: 'FAQ', href: '/faq' },
  { name: 'About', href: '/about' },
];

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // print user token for DEV
  // currentUser?.getIdToken().then((data) => console.log(data));

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Renal Insight</span>
            <img className="h-12 w-auto" src={logo} alt="rental insight logo" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        {currentUser ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary"
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <NavLink
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </NavLink>
          </div>
        )}
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Rental Insight</span>
              <img
                className="h-12 w-auto"
                src={logo}
                alt="rental insight logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              {currentUser ? (
                <div className="py-6">
                  <Button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="py-6">
                  <NavLink
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
