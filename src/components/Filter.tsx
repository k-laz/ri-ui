import { useAuth } from '@/hooks/AuthProvider';
import { UserFilter } from '@/types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useState } from 'react';
import { AlertMessage, AlertState, AlertType } from './ui/alert_message';
import NumberSelector from './form/NumberSelector';
import LoadingSpinner from './LoadingSpinner';
import { useUserStore } from '@/hooks/useUser';
import PriceRangeSelector from './form/PriceRangeSelector';
import FilterToggle from './form/FilterToggle';
import FloatingMessage from './ui/floating_message';
// import Map from './form/Map';

const validationSchema = Yup.object({
  min_price: Yup.number().min(0, 'Minimum price cannot be less than 0'),
  max_price: Yup.number()
    .min(0, 'Maximum price cannot be less than 0')
    .max(5000, 'Maximum price cannot exceed 5000'),
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
  const { userData } = useUserStore(); // Zustand store
  const [isLoading, setIsLoading] = useState(false); // Changed initial to false since we're using userData
  // TODO: could possibly integrate all of this show and close into the alert itself??
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    message: '',
    type: 'success',
  });

  // const handleLocationSelect = (location: Location) => {
  //   console.log('Selected location:', location); // {latitude: number, longitude: number, radius: number}
  // };

  const showAlert = (message: string, type: AlertType = 'success'): void => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = (): void => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  // Show loading state while either auth is loading or initial data fetch is happening
  if (isLoading || !userData) {
    return <LoadingSpinner />;
  }

  const filter: UserFilter = userData.filter;

  const initialValues = {
    //Partial<UserFilter>
    location: filter?.location ?? undefined,
    min_price: filter?.min_price ?? undefined,
    max_price: filter?.max_price ?? undefined,
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
      <FloatingMessage text="Only selected filters will limit your results" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="mx-auto w-full max-w-5xl rounded-lg">
            <div className="border-b border-gray-900/10 p-3 lg:mx-10">
              {/* <Map
                onLocationSelect={handleLocationSelect}
                initialLocation={values.location}
              /> */}
              <div className="relative mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-10 sm:gap-y-8 md:gap-x-16 lg:mb-4">
                <>
                  <PriceRangeSelector
                    min_price={values.min_price}
                    max_price={values.max_price}
                    setFieldValue={setFieldValue}
                  />
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                        <option value="12">12+ months</option>
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

                  <NumberSelector
                    name="num_baths"
                    label="Number of Bathrooms"
                    values={values.num_baths ?? []}
                    setFieldValue={setFieldValue}
                  />

                  <NumberSelector
                    name="num_beds"
                    label="Number of Bedrooms"
                    values={values.num_beds ?? []}
                    setFieldValue={setFieldValue}
                  />

                  <NumberSelector
                    name="num_parking"
                    label="Number of Parking Spots"
                    values={values.num_parking ?? []}
                    setFieldValue={setFieldValue}
                  />

                  <hr className="md:hidden"></hr>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Popular Filters
                    </label>
                    <FilterToggle
                      label="Furnished"
                      checked={values.furnished ?? false}
                      onChange={(checked) =>
                        setFieldValue('furnished', checked)
                      }
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center sm:col-span-1">
                    <FilterToggle
                      label="Pets"
                      checked={values.pets ?? false}
                      onChange={(checked) => setFieldValue('pets', checked)}
                      className="md:mt-8"
                    />
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
        )}
      </Formik>
    </div>
  );
};

export default Filter;
