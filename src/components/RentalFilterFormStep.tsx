import { Field, ErrorMessage, useFormikContext } from 'formik';

interface RentalFilterValues {
  budget: number;
  move_in_date: string; // Using string to accommodate HTML input type "date"
  length_of_stay: 4 | 8 | 12; // Union type for fixed length of stay options
  num_baths: number;
  num_beds: number;
  furnished: boolean;
  pets: boolean;
  personal_bathroom: boolean;
  preferred_gender: 'Any' | 'Male' | 'Female' | 'Non-Binary';
}

export default function RentalFilter() {
  const { values, setFieldValue } = useFormikContext<RentalFilterValues>();

  return (
    <div className="mx-auto max-h-[350px] max-w-md overflow-y-auto ">
      <div className="space-y-4">
        {/* Budget Price Cap Slider */}
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700"
          >
            Budget Cap ($)
          </label>
          <div className="mt-1">
            <input
              id="budget"
              name="budget"
              type="range"
              min="0"
              max="5000"
              step="100"
              value={values.budget}
              onChange={(e) =>
                setFieldValue('budget', parseInt(e.target.value))
              }
              className="slider-thumb h-3 w-1/2 appearance-none rounded-full bg-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
            <span className="ml-3 text-sm text-gray-700">
              {values.budget === 5000 ? '$5000+' : `$${values.budget}`}
            </span>
          </div>
          <ErrorMessage
            name="budget"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>

        {/* Move-In Date */}
        <div>
          <label
            htmlFor="move_in_date"
            className="block text-sm font-medium text-gray-700"
          >
            Move-In Date
          </label>
          <Field
            id="move_in_date"
            name="move_in_date"
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <ErrorMessage
            name="move_in_date"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>

        {/* Length of Stay */}
        <div>
          <label
            htmlFor="length_of_stay"
            className="block text-sm font-medium text-gray-700"
          >
            Length of Stay (months)
          </label>
          <Field
            id="length_of_stay"
            name="length_of_stay"
            as="select"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select...</option>
            <option value="4">4 months</option>
            <option value="8">8 months</option>
            <option value="12">12 months</option>
          </Field>
          <ErrorMessage
            name="length_of_stay"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>

        {/* Number of Bathrooms */}
        <div>
          <label
            htmlFor="num_baths"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Bathrooms
          </label>
          <Field
            id="num_baths"
            name="num_baths"
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter number of bathrooms"
          />
          <ErrorMessage
            name="num_baths"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>

        {/* Number of Bedrooms */}
        <div>
          <label
            htmlFor="num_beds"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Bedrooms
          </label>
          <Field
            id="num_beds"
            name="num_beds"
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter number of bedrooms"
          />
          <ErrorMessage
            name="num_beds"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>

        {/* Furnished */}
        <div className="flex items-center">
          <Field
            type="checkbox"
            name="furnished"
            id="furnished"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="furnished"
            className="ml-2 block text-sm text-gray-900"
          >
            Furnished
          </label>
        </div>

        {/* Full Place */}
        <div className="flex items-center">
          <Field
            type="checkbox"
            name="full_place"
            id="full_place"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="full_place"
            className="ml-2 block text-sm text-gray-900"
          >
            Full Place
          </label>
        </div>

        {/* Personal Bathroom */}
        <div className="flex items-center">
          <Field
            type="checkbox"
            name="personal_bathroom"
            id="personal_bathroom"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="personal_bathroom"
            className="ml-2 block text-sm text-gray-900"
          >
            Personal Bathroom
          </label>
        </div>

        {/* Gender Preference */}
        <div>
          <label
            htmlFor="gender_preference"
            className="block text-sm font-medium text-gray-700"
          >
            Gender Preference
          </label>
          <Field
            id="gender_preference"
            name="gender_preference"
            as="select"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </Field>
          <ErrorMessage
            name="gender_preference"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>
      </div>
    </div>
  );
}
