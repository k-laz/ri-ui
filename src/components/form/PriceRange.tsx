import React, { useCallback } from 'react';
import { ErrorMessage } from 'formik';

interface PriceRangeSliderProps {
  min_price?: number;
  max_price?: number;
  setFieldValue: (field: string, value: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min_price,
  max_price,
  setFieldValue,
}) => {
  const getPercentage = useCallback(
    (value: number) => (value / 5000) * 100,
    [],
  );

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value = Math.max(0, Math.min(value, (max_price ?? 5000) - 10));
    setFieldValue('min_price', value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value = Math.max((min_price ?? 0) + 10, Math.min(value, 5000));
    setFieldValue('max_price', value);
  };

  return (
    <div className="max-w-xl sm:col-span-5">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Price Range ($CAD)
      </label>

      <div className="relative h-20 w-full">
        {/* Max value label - Adjusted positioning */}
        <div
          className="absolute top-0 transform"
          style={{
            left: `${getPercentage(max_price ?? 5000)}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="rounded bg-primary px-2 py-1 text-sm text-white">
            ${max_price ?? 5000}
            {(max_price ?? 5000) >= 5000 && '+'}
          </span>
        </div>

        {/* Slider track */}
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2">
          <div className="absolute h-full w-full rounded-full bg-gray-200" />

          <div
            className="absolute h-full rounded-full bg-primary"
            style={{
              left: `${getPercentage(min_price ?? 0)}%`,
              right: `${100 - getPercentage(max_price ?? 5000)}%`,
            }}
          />

          <input
            type="range"
            min={0}
            max={5000}
            step={10}
            value={min_price ?? 0}
            onChange={handleMinPriceChange}
            className="price-range-slider pointer-events-none absolute w-full appearance-none bg-transparent"
          />

          <input
            type="range"
            min={0}
            max={5000}
            step={10}
            value={max_price ?? 5000}
            onChange={handleMaxPriceChange}
            className="price-range-slider pointer-events-none absolute w-full appearance-none bg-transparent"
          />
        </div>

        {/* Min value label */}
        <div
          className="absolute top-1/2 mt-4 translate-y-full transform"
          style={{
            left: `${getPercentage(min_price ?? 0)}%`,
            transform: 'translateX(-50%) translateY(0)',
          }}
        >
          <span className="rounded bg-primary px-2 py-1 text-sm text-white">
            ${min_price ?? 0}
          </span>
        </div>
      </div>

      <ErrorMessage
        name="min_price"
        component="div"
        className="mt-1 text-sm text-red-600"
      />
      <ErrorMessage
        name="max_price"
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );
};

export default PriceRangeSlider;
