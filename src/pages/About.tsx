export default function About() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8"></div>
      <div>
        <ol className="flex w-full items-center text-center text-sm font-medium text-gray-500 sm:text-base dark:text-gray-400">
          <li className="after:border-1 flex items-center text-blue-600 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 dark:text-blue-500 dark:after:border-gray-700">
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500">
              <svg
                className="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Personal{' '}
              <span className="hidden sm:ms-2 sm:inline-flex">Info</span>
            </span>
          </li>
          <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 after:content-[''] sm:after:inline-block md:w-full xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500">
              <span className="me-2">2</span>
              Account{' '}
              <span className="hidden sm:ms-2 sm:inline-flex">Info</span>
            </span>
          </li>
          <li className="flex items-center">
            <span className="me-2">3</span>
            Confirmation
          </li>
        </ol>
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
