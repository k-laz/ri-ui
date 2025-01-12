import React from 'react';
import { ErrorMessage } from 'formik';

interface PriceRangeSelectorProps {
  min_price?: number;
  max_price?: number;
  setFieldValue: (field: string, value: number | undefined) => void;
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  min_price,
  max_price,
  setFieldValue,
}) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? undefined : Number(e.target.value);
    setFieldValue('min_price', value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? undefined : Number(e.target.value);
    setFieldValue('max_price', value);
  };

  return (
    <div className="max-w-xl sm:col-span-5">
      {/* <label className="block text-sm font-medium leading-6 text-gray-900">
        Price Range ($CAD)
      </label> */}

      <div className="flex gap-4">
        <div className="flex-1 py-1">
          <label className="block text-sm font-medium text-gray-900">
            Min $
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={min_price ?? ''}
            onChange={handleMinPriceChange}
            className=" mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder="Min price"
          />

          <ErrorMessage
            name="min_price"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>

        <div className="flex-1 py-1">
          <label className="block text-sm font-medium text-gray-900">
            Max $
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={max_price ?? ''}
            onChange={handleMaxPriceChange}
            className=" mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder="Max price"
          />
          <ErrorMessage
            name="max_price"
            component="div"
            className="mt-1 text-sm text-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSelector;
