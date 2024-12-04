import { useAuth } from '@/hooks/AuthProvider';
import { UserFilter } from '@/types';
import { Switch } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { AlertMessage, AlertState, AlertType } from './ui/alert_message';
import PriceRangeSlider from './filterForm/PriceRange';

const validationSchema = Yup.object({
  price_limit: Yup.number(),
  min_price: Yup.number()
    .min(0, 'Minimum price cannot be less than 0')
    .required('Required'),
  max_price: Yup.number()
    .min(0, 'Maximum price cannot be less than 0')
    .max(5000, 'Maximum price cannot exceed 5000')
    .required('Required'),
  move_in_date: Yup.date(),
  length_of_stay: Yup.string().oneOf(
    ['4', '8', '12', 'any'],
    'Invalid length of stay',
  ),
  num_baths: Yup.array().of(
    Yup.number().oneOf([0, 1, 2, 3, 4], 'Invalid number of bathrooms'),
  ),
  num_beds: Yup.array().of(
    Yup.number().oneOf([0, 1, 2, 3, 4], 'Invalid number of bedrooms'),
  ),
  num_parking: Yup.array().of(
    Yup.number().oneOf([0, 1, 2, 3, 4], 'Invalid number of parking spots'),
  ),
  furnished: Yup.boolean(),
  pets: Yup.boolean(),
  gender_preference: Yup.string().oneOf(
    ['male', 'female', 'any'],
    'Invalid gender selection',
  ),
});

const Filter = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // TODO: could possibly integrate all of this show and close into the alert itself??
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    message: '',
    type: 'success',
  });

  const showAlert = (message: string, type: AlertType = 'success'): void => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = (): void => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  // Get filter from session storage userData
  const filter = auth.userData?.filter || {};

  useEffect(() => {
    if (auth.userData) {
      setIsLoading(false);
    }
  }, [auth.userData]);

  // Show loading state while either auth is loading or initial data fetch is happening
  if (isLoading || !auth?.userData) {
    return (
      <div className="flex h-2/3 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading your filter settings...</p>
        </div>
      </div>
    );
  }

  const initialValues = {
    //Partial<UserFilter>
    price_limit: filter?.price_limit ?? 0,
    min_price: 0,
    max_price: 5000,
    move_in_date: filter?.move_in_date ?? undefined,
    length_of_stay: filter?.length_of_stay ?? undefined,
    num_baths: filter?.num_baths ?? [],
    num_beds: filter?.num_beds ?? [],
    num_parking: filter?.num_parking ?? [],
    furnished: filter?.furnished ?? false,
    pets: filter?.pets ?? false,
    gender_preference: filter?.gender_preference ?? undefined,
  };

  const handleSubmit = async (values: Partial<UserFilter>) => {
    try {
      setIsLoading(true);
      await auth.updateFilter(values);
      setIsLoading(false);
      showAlert('Successfully updated!');
    } catch (error) {
      console.error('Error updating filter:', error);
      showAlert('Update failed!', 'error');
    }
  };

  return (
    <div>
      <AlertMessage
        message={alert.message}
        type={alert.type}
        isVisible={alert.show}
        onClose={hideAlert}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <div className="mt-8 lg:mt-20">
            <Form className="mx-auto w-full max-w-5xl rounded-lg md:p-10">
              <div className="border-b border-gray-900/10 p-3 lg:mx-10">
                <div className="relative mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-10 sm:gap-y-8 md:gap-x-16 lg:mb-4">
                  <>
                    <PriceRangeSlider
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    {/* Budget Price Cap Slider */}
                    <div className="sm:col-span-5">
                      <label
                        htmlFor="price_limit"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Max Price ($CAD)
                      </label>
                      <div className="mb-3 mt-2">
                        <div className="flex flex-row items-center justify-between">
                          <Field
                            id="price_limit"
                            name="price_limit"
                            type="range"
                            min="0"
                            max="5000"
                            step="10"
                            className="custom-range-slider w-2/3 appearance-none sm:w-full"
                            style={{
                              '--slider-value': `${
                                ((values.price_limit ?? 0) / 5000) * 100
                              }%`,
                            }}
                            value={values.price_limit ?? 0}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              setFieldValue(
                                'price_limit',
                                e.target.value ? parseInt(e.target.value) : 0,
                              )
                            }
                          />
                          {/* Disabled Number Input Field */}
                          <div className="relative">
                            <Field
                              id="price_limit_input"
                              name="price_limit"
                              type="number"
                              min="0"
                              max="5000"
                              step="10"
                              className="ml-4 min-w-20 truncate rounded-md border-2 border-primary p-1 text-center lg:pl-4"
                              value={values.price_limit ?? 0}
                              disabled
                            />
                            {/* Conditionally display + sign inside the input field */}
                            {(values.price_limit ?? 0) >= 5000 && (
                              <span className="absolute inset-y-0 right-12 flex items-center pr-4">
                                +
                              </span>
                            )}
                          </div>
                        </div>
                        <ErrorMessage
                          name="price_limit"
                          component="div"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                    </div>

                    {/* Move-In Date */}
                    <div className="sm:col-span-5">
                      <label
                        htmlFor="move_in_date"
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
                          value={
                            values.move_in_date
                              ? new Date(values.move_in_date)
                                  .toISOString()
                                  .split('T')[0]
                              : ''
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            const date = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            setFieldValue(
                              'move_in_date',
                              date ? date.toISOString() : '',
                            );
                          }}
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
                        htmlFor="length_of_stay"
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
                          <option value="any">Any</option>
                        </Field>
                      </div>
                    </div>

                    {/* Gender Preference */}
                    <div className="sm:col-span-5">
                      <label
                        htmlFor="gender_preference"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender Preference
                      </label>
                      <div className="mt-2">
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
                              checked={
                                values.num_baths?.includes(
                                  option as 0 | 1 | 2 | 3 | 4,
                                ) || false
                              }
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                const value = parseInt(e.target.value) as
                                  | 0
                                  | 1
                                  | 2
                                  | 3
                                  | 4; // Type assertion
                                if (e.target.checked) {
                                  setFieldValue('num_baths', [
                                    ...(values.num_baths || []),
                                    value,
                                  ]);
                                } else {
                                  setFieldValue(
                                    'num_baths',
                                    values.num_baths?.filter(
                                      (v) => v !== value,
                                    ) || [],
                                  );
                                }
                              }}
                            />
                            <span
                              className={`
                              inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                              ${
                                values.num_baths?.includes(
                                  option as 0 | 1 | 2 | 3 | 4,
                                ) // Type assertion
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
                      {/* <ErrorMessage
                      name="num_baths"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    /> */}
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
                              checked={
                                values.num_beds?.includes(
                                  option as 0 | 1 | 2 | 3 | 4,
                                ) || false
                              }
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                const value = parseInt(e.target.value) as
                                  | 0
                                  | 1
                                  | 2
                                  | 3
                                  | 4; // Type assertion
                                if (e.target.checked) {
                                  setFieldValue('num_beds', [
                                    ...(values.num_beds || []),
                                    value,
                                  ]);
                                } else {
                                  setFieldValue(
                                    'num_beds',
                                    values.num_beds?.filter(
                                      (v) => v !== value,
                                    ) || [],
                                  );
                                }
                              }}
                            />
                            <span
                              className={`
                              inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                              ${
                                values.num_beds?.includes(
                                  option as 0 | 1 | 2 | 3 | 4,
                                ) // Type assertion
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
                      {/* <ErrorMessage
                      name="num_beds"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    /> */}
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
                              checked={
                                values.num_parking?.includes(
                                  option as 0 | 1 | 2 | 3 | 4,
                                ) || false
                              } // Type assertion
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                const value = parseInt(e.target.value) as
                                  | 0
                                  | 1
                                  | 2
                                  | 3
                                  | 4; // Type assertion
                                if (e.target.checked) {
                                  setFieldValue('num_parking', [
                                    ...(values.num_parking || []),
                                    value,
                                  ]);
                                } else {
                                  setFieldValue(
                                    'num_parking',
                                    values.num_parking?.filter(
                                      (v) => v !== value,
                                    ) || [],
                                  );
                                }
                              }}
                            />
                            <span
                              className={`
                              inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                              ${
                                values.num_parking?.includes(
                                  option as 0 | 1 | 2 | 3 | 4,
                                ) // Type assertion
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
                      {/* <ErrorMessage
                      name="num_parking"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    /> */}
                    </div>

                    <hr className="md:hidden"></hr>

                    {/* Furnished Toggle */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="furnished"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Popular Filters
                      </label>
                      <Switch
                        checked={values.furnished}
                        onChange={() =>
                          setFieldValue('furnished', !values.furnished)
                        }
                        className={`mt-2 flex items-center rounded-full px-4 py-2 ${
                          values.furnished
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {values.furnished ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <XMarkIcon className="h-5 w-5" />
                        )}
                        <span className="ml-2">Furnished</span>
                      </Switch>
                    </div>

                    {/* Pet Friendly Toggle */}
                    <div className="flex items-center sm:col-span-1">
                      <Switch
                        checked={values.pets}
                        onChange={() => setFieldValue('pets', !values.pets)}
                        className={`flex items-center rounded-full px-4 py-2 md:mt-8 ${
                          values.pets
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {values.pets ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <XMarkIcon className="h-5 w-5" />
                        )}
                        <span className="ml-2">Pets</span>
                      </Switch>
                    </div>
                  </>
                </div>
              </div>
              <button
                type="submit"
                className="my-4 w-full rounded bg-primary py-2 text-white hover:bg-secondary lg:my-8"
              >
                Update
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Filter;
