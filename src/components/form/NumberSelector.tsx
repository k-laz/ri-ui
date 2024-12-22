import React from 'react';
import { Field } from 'formik';

type NumberOption = 0 | 1 | 2 | 3 | 4;

interface NumberSelectorProps {
  name: string;
  label: string;
  values: NumberOption[];
  setFieldValue: (field: string, value: NumberOption[]) => void;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
  name,
  label,
  values,
  setFieldValue,
}) => {
  const options: NumberOption[] = [0, 1, 2, 3, 4];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) as NumberOption;
    if (e.target.checked) {
      setFieldValue(name, [...(values || []), value]);
    } else {
      setFieldValue(name, values?.filter((v) => v !== value) || []);
    }
  };

  return (
    <div className="sm:col-span-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 flex justify-between">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <Field
              type="checkbox"
              name={name}
              value={option.toString()}
              className="sr-only"
              checked={values?.includes(option) || false}
              onChange={handleChange}
            />
            <span
              className={`
                inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                ${
                  values?.includes(option)
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
    </div>
  );
};

export default NumberSelector;
