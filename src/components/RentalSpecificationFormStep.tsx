import { Field, ErrorMessage, useFormikContext } from 'formik';

interface RentalFilterValues {
  budget: number;
  move_in_date: string; // Using string to accommodate HTML input type "date"
  length_of_stay: 4 | 8 | 12; // Union type for fixed length of stay options
  num_baths: (0 | 1 | 2 | 3 | 4)[];
  num_beds: (0 | 1 | 2 | 3 | 4)[];
  num_parking: (0 | 1 | 2 | 3 | 4)[];
  furnished: boolean;
  full_place: boolean;
  personal_bathroom: boolean;
  gender_preference: 'male' | 'female' | 'any';
}

export default function RentalSpecificationFormStep() {
  const { values, setFieldValue } = useFormikContext<RentalFilterValues>();

  return (
    <>
      {/* Budget Price Cap Slider */}
      <div className="sm:col-span-4">
        <label
          htmlFor="budget"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Budget Cap ($CAD)
        </label>
        <div className=" mb-3 mt-2">
          <div className="flex flex-row items-center">
            <Field
              id="budget"
              name="budget"
              type="range"
              min="0"
              max="5000"
              step="10"
              value={values.budget}
              onChange={(e) =>
                setFieldValue('budget', parseInt(e.target.value))
              }
              className="w-2/3 sm:w-full"
            />
            <span className="absolute right-0 w-20 truncate rounded-md border-2 border-primary px-2 py-1 text-left sm:right-10">
              ${values.budget === 5000 ? '5000+' : `${values.budget}`}
            </span>
          </div>

          <ErrorMessage
            name="budget"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>
      </div>

      {/* Move-In Date */}
      <div className="sm:col-span-5">
        <label
          htmlFor="budget"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Move-In Date
        </label>
        <div className="mt-2">
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
      </div>

      {/* Length of Stay */}
      <div className="sm:col-span-5">
        <label
          htmlFor="budget"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Length of Stay
        </label>
        <div className="mt-2">
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
      </div>

      {/* Number of Bathrooms */}
      <div className="sm:col-span-5">
        <label
          htmlFor="num_baths"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Number of Bathrooms
        </label>
        <div className="mt-2 flex justify-between">
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="flex items-center">
              <Field
                type="checkbox"
                name="num_baths"
                value={option.toString()}
                className="sr-only"
                checked={values.num_baths.includes(option as 0 | 1 | 2 | 3 | 4)} // Type assertion
                onChange={(e) => {
                  const value = parseInt(e.target.value) as 0 | 1 | 2 | 3 | 4; // Type assertion
                  if (e.target.checked) {
                    setFieldValue('num_baths', [...values.num_baths, value]);
                  } else {
                    setFieldValue(
                      'num_baths',
                      values.num_baths.filter((v) => v !== value),
                    );
                  }
                }}
              />
              <span
                className={`
                    inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                    ${
                      values.num_baths.includes(option as 0 | 1 | 2 | 3 | 4) // Type assertion
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }
                  `}
              >
                {option === 4 ? '4+' : option}
              </span>
            </label>
          ))}
        </div>
        <ErrorMessage
          name="num_baths"
          component="div"
          className="mt-1 text-sm text-red-600"
        />
      </div>

      {/* Number of Bedrooms */}
      <div className="sm:col-span-5">
        <label
          htmlFor="num_beds"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Number of Bedrooms
        </label>
        <div className="mt-2 flex justify-between">
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="flex items-center">
              <Field
                type="checkbox"
                name="num_beds"
                value={option.toString()}
                className="sr-only"
                checked={values.num_beds.includes(option as 0 | 1 | 2 | 3 | 4)} // Type assertion
                onChange={(e) => {
                  const value = parseInt(e.target.value) as 0 | 1 | 2 | 3 | 4; // Type assertion
                  if (e.target.checked) {
                    setFieldValue('num_beds', [...values.num_beds, value]);
                  } else {
                    setFieldValue(
                      'num_beds',
                      values.num_beds.filter((v) => v !== value),
                    );
                  }
                }}
              />
              <span
                className={`
                    inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                    ${
                      values.num_beds.includes(option as 0 | 1 | 2 | 3 | 4) // Type assertion
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }
                  `}
              >
                {option === 4 ? '4+' : option}
              </span>
            </label>
          ))}
        </div>
        <ErrorMessage
          name="num_beds"
          component="div"
          className="mt-1 text-sm text-red-600"
        />
      </div>

      {/* Number of Parking Spots */}
      <div className="sm:col-span-5">
        <label
          htmlFor="num_parking"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Number of Parking Spots
        </label>
        <div className="mt-2 flex justify-between">
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="flex items-center">
              <Field
                type="checkbox"
                name="num_parking"
                value={option.toString()}
                className="sr-only"
                checked={values.num_parking.includes(
                  option as 0 | 1 | 2 | 3 | 4,
                )} // Type assertion
                onChange={(e) => {
                  const value = parseInt(e.target.value) as 0 | 1 | 2 | 3 | 4; // Type assertion
                  if (e.target.checked) {
                    setFieldValue('num_parking', [
                      ...values.num_parking,
                      value,
                    ]);
                  } else {
                    setFieldValue(
                      'num_parking',
                      values.num_parking.filter((v) => v !== value),
                    );
                  }
                }}
              />
              <span
                className={`
                    inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                    ${
                      values.num_parking.includes(option as 0 | 1 | 2 | 3 | 4) // Type assertion
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }
                  `}
              >
                {option === 4 ? '4+' : option}
              </span>
            </label>
          ))}
        </div>
        <ErrorMessage
          name="num_parking"
          component="div"
          className="mt-1 text-sm text-red-600"
        />
      </div>
    </>
  );
}
