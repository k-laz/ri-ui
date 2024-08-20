export default function About() {
  return (
    <div className="bg-white py-24 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8"></div>
      <div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h1>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">What is this web app for?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            This web app helps you find on-campus housing that meets your specific needs. You can set custom filters based on your preferences, and we’ll send you the most relevant housing options directly to your inbox in a newsletter.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">How do I create an account?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            To create an account, click on the "Sign Up" button on the homepage. Fill in your basic information, set your preferences, and you'll be ready to start receiving personalized housing options.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">What kind of filters can I set?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            You can filter housing options based on a variety of criteria, including:
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

        {/* <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">4. How often will I receive the newsletter?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            You can choose how frequently you want to receive the newsletter when setting up your preferences. Options include daily, weekly, or monthly updates.
          </p>
        </section>
        <br></br> */}

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Can I update my filters after setting them?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Yes, you can update your filters anytime by logging into your account and adjusting your preferences. Your newsletter will then reflect your updated criteria.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">What if there are no housing options that match my filters?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            If no options match your filters, you’ll receive a notification in your newsletter letting you know. We’ll continue to search and update you as soon as a match becomes available.
          </p>
        </section>
        <br></br>

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">How is the housing information sourced?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our app scrapes data from various official campus housing websites and databases to bring you the most up-to-date and comprehensive listings available.
          </p>
        </section>
        <br></br>

        {/* <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Is my personal information safe?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We take your privacy seriously. All personal data is encrypted, and we do not share your information with third parties without your consent.
          </p>
        </section>
        <br></br> */}

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">How do I unsubscribe from the newsletter?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            If you no longer wish to receive housing updates, you can unsubscribe at any time by clicking the "Unsubscribe" link at the bottom of any newsletter or by managing your preferences in your account settings.
          </p>
        </section>
        <br></br>

        {/* <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Who can I contact for support?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            If you have any questions or encounter any issues, feel free to reach out to our support team via email at <a href="mailto:support@yourwebapp.com">support@yourwebapp.com</a> or use the contact form on our website.
          </p>
        </section>
        <br></br> */}

        {/* <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">11. Is there a cost to use the app?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our basic service is free to use. We do offer premium features for a small fee, including early access to new listings and advanced filtering options.
          </p>
        </section>
        <br></br> */}

        <section>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Can I suggest a feature or report a bug?</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Absolutely! We’re always looking to improve. You can suggest features or report bugs directly through the app or by contacting our support team.
          </p>
        </section>

      </div>
    </div>
  );
}

// export default function About() {
//   return (
//     <div>
//       <ol className="mb-4 flex w-full items-center sm:mb-5">
//         <li className="flex w-full items-center text-blue-600 after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-blue-100 after:content-[''] dark:text-blue-500 dark:after:border-blue-800">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-800">
//             <svg
//               className="h-4 w-4 text-blue-600 lg:h-6 lg:w-6 dark:text-blue-300"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 20 16"
//             >
//               <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
//             </svg>
//           </div>
//         </li>
//         <li className="flex w-full items-center after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-gray-100 after:content-[''] dark:after:border-gray-700">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 lg:h-12 lg:w-12 dark:bg-gray-700">
//             <svg
//               className="h-4 w-4 text-blue-600 lg:h-6 lg:w-6 dark:text-blue-300"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 20 14"
//             >
//               <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
//               <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
//             </svg>
//           </div>
//         </li>
//         <li className="flex w-full items-center">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 lg:h-12 lg:w-12 dark:bg-gray-700">
//             <svg
//               className="h-4 w-4 text-blue-600 lg:h-6 lg:w-6 dark:text-blue-300"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 18 20"
//             >
//               <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
//             </svg>
//           </div>
//         </li>
//       </ol>
//       <form action="#">
//         <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
//           Invoice details
//         </h3>
//         <div className="mb-4 grid gap-4 sm:grid-cols-2">
//           <div>
//             <label
//               htmlFor="username"
//               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               id="username"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//               placeholder="username.example"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//               placeholder="name@company.com"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//               placeholder="•••••••••"
//             />
//           </div>{' '}
//           <div>
//             <label
//               htmlFor="confirm-password"
//               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Confirm password
//             </label>
//             <input
//               type="password"
//               name="confirm-password"
//               id="confirm-password"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//               placeholder="•••••••••"
//             />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Next Step: Payment Info
//         </button>
//       </form>
//     </div>
//   );
// }
