import { UserFilter } from '@/types';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

interface FilterFormProps {
  filter: UserFilter;
}

const FilterForm: React.FC<FilterFormProps> = (filterFormProps) => {
  const initialValues = filterFormProps.filter;

  console.log(initialValues);

  const validationSchema = Yup.object({
    price_limit: Yup.number().required('Required'),
    furnished: Yup.boolean().required('Required'),
    min_beds: Yup.number().required('Required'),
    max_beds: Yup.number().required('Required'),
    min_baths: Yup.number().required('Required'),
    max_baths: Yup.number().required('Required'),
    move_in_date: Yup.date().required('Required'),
  });

  const handleSubmit = () => {
    // const handleSubmit = (values, { setSubmitting }) => {
    // console.log('Filter updated successfully!', values);
    alert('Filter updated successfully!');
    // setSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Welcome!</h1>
      </div>
      <div className="mb-6 rounded bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Edit Filter</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block" htmlFor="price_limit">
                    Price Limit
                  </label>
                  <Field
                    id="price_limit"
                    name="price_limit"
                    type="number"
                    className="w-full rounded border p-2"
                  />
                  {errors.price_limit && touched.price_limit ? (
                    <div className="text-red-600">{errors.price_limit}</div>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block" htmlFor="furnished">
                    Furnished
                  </label>
                  <Field
                    id="furnished"
                    name="furnished"
                    type="checkbox"
                    className="h-4 w-4"
                  />
                  {errors.furnished && touched.furnished ? (
                    <div className="text-red-600">{errors.furnished}</div>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block" htmlFor="min_beds">
                    Min Beds
                  </label>
                  <Field
                    id="min_beds"
                    name="min_beds"
                    type="number"
                    className="w-full rounded border p-2"
                  />
                  {errors.min_beds && touched.min_beds ? (
                    <div className="text-red-600">{errors.min_beds}</div>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block" htmlFor="max_beds">
                    Max Beds
                  </label>
                  <Field
                    id="max_beds"
                    name="max_beds"
                    type="number"
                    className="w-full rounded border p-2"
                  />
                  {errors.max_beds && touched.max_beds ? (
                    <div className="text-red-600">{errors.max_beds}</div>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block" htmlFor="min_baths">
                    Min Baths
                  </label>
                  <Field
                    id="min_baths"
                    name="min_baths"
                    type="number"
                    className="w-full rounded border p-2"
                  />
                  {errors.min_baths && touched.min_baths ? (
                    <div className="text-red-600">{errors.min_baths}</div>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block" htmlFor="max_baths">
                    Max Baths
                  </label>
                  <Field
                    id="max_baths"
                    name="max_baths"
                    type="number"
                    className="w-full rounded border p-2"
                  />
                  {errors.max_baths && touched.max_baths ? (
                    <div className="text-red-600">{errors.max_baths}</div>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block" htmlFor="move_in_date">
                    Move-in Date
                  </label>
                  <Field
                    id="move_in_date"
                    name="move_in_date"
                    type="date"
                    className="w-full rounded border p-2"
                  />
                  {errors.move_in_date && touched.move_in_date ? (
                    <div className="text-red-600">{errors.move_in_date}</div>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Save Filter
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FilterForm;
