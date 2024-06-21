import { Field } from 'formik';

export default function AccountInfoFormStep() {
  return (
    <>
      <div className="sm:col-span-3">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          First name
        </label>
        <div className="mt-2">
          <Field
            id="firstName"
            name="firstName"
            placeholder="Jon"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Last name
        </label>
        <div className="mt-2">
          <Field
            id="lastName"
            name="lastName"
            placeholder="Jones"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email Address
        </label>
        <div className="mt-2">
          <Field
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="mt-2">
          <Field
            id="password"
            name="password"
            type="password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
}
