import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AccountInfoFormStep from '@/components/AccountInfoFormStep';
import RentalSpecificationFormStep from '@/components/RentalSpecificationFormStep';

const steps = ['Account Information', 'Rental Specification', 'Confirmation'];

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function FilterSetup() {
  const [currentStep, setCurrentStep] = useState(0);
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AccountInfoFormStep />;
      case 1:
        return <RentalSpecificationFormStep />;
      case 2:
        return (
          <>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        budget: 0,
        move_in_date: '',
        length_of_stay: '' as unknown as 4 | 8 | 12,
        num_baths: [],
        num_beds: [],
        num_parking: [],
        furnished: false,
        full_place: false,
        personal_bathroom: false,
        gender_preference: '' as 'male' | 'female' | 'any',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        price_range: Yup.array()
          .of(Yup.number().required('Required'))
          .length(2, 'Must have both min and max prices'),
        move_in_date: Yup.date().required('Required'),
        length_of_stay: Yup.mixed().required('Required'),
        num_baths: Yup.array()
          .of(
            Yup.number().oneOf([0, 1, 2, 3, 4], 'Invalid number of bathrooms'),
          )
          .min(1, 'At least one option must be selected')
          .required('Required'),
        num_beds: Yup.array()
          .of(Yup.number().oneOf([0, 1, 2, 3, 4], 'Invalid number of bedrooms'))
          .min(1, 'At least one option must be selected')
          .required('Required'),
        num_parking: Yup.array()
          .of(
            Yup.number().oneOf(
              [0, 1, 2, 3, 4],
              'Invalid number of parking spots',
            ),
          )
          .min(1, 'At least one option must be selected')
          .required('Required'),
        furnished: Yup.boolean().required('Required'),
        pets: Yup.boolean().required('Required'),
        personal_bathroom: Yup.boolean().required('Required'),
        preferred_gender: Yup.string()
          .oneOf(
            ['Any', 'Male', 'Female', 'Non-Binary'],
            'Invalid gender selection',
          )
          .required('Required'),
      })}
      onSubmit={(values: Values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <div className="mt-12 lg:mt-24">
        <h1 className="mb-6 text-center text-xl font-bold text-gray-900 lg:mt-16">
          Filter Setup
        </h1>
        <h2 className="text-center text-base font-semibold leading-7 text-gray-900 lg:mt-16">
          {steps[currentStep]}
        </h2>
        <Form className="mx-auto w-full max-w-lg rounded-lg md:p-10">
          <div className="overflow-y-scroll border-b border-gray-900/10 pb-12 sm:max-h-[357px]">
            <div className="relative mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 md:gap-y-8">
              {renderStep()}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-4 flex w-full justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none "
              >
                Back
              </button>
            )}

            {currentStep < steps.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-secondary focus:outline-none "
              >
                Next
              </button>
            )}
          </div>
          {currentStep === steps.length - 1 && (
            <button
              type="submit"
              className="ml-auto rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none  "
            >
              Submit
            </button>
          )}
        </Form>
      </div>
    </Formik>
  );
}
