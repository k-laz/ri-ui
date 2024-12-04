import { Field, ErrorMessage } from 'formik';
import React, { useCallback } from 'react';

interface PriceRangeValues {
  min_price?: number;
  max_price?: number;
  [key: string]: any;
}

interface PriceRangeSliderProps {
  values: PriceRangeValues;
  setFieldValue: (field: string, value: any) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  values,
  setFieldValue,
}) => {
  const getPercentage = useCallback(
    (value: number) => (value / 5000) * 100,
    [],
  );

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value = Math.max(0, Math.min(value, values.max_price ?? 5000));
    setFieldValue('min_price', value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value = Math.max(values.min_price ?? 0, Math.min(value, 5000));
    setFieldValue('max_price', value);
  };

  const handleTrackClick = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 5000;

    // Determine which handle to move based on proximity
    const distToMin = Math.abs(position - (values.min_price ?? 0));
    const distToMax = Math.abs(position - (values.max_price ?? 5000));

    if (distToMin < distToMax) {
      setFieldValue(
        'min_price',
        Math.min(Math.round(position / 10) * 10, values.max_price ?? 5000),
      );
    } else {
      setFieldValue(
        'max_price',
        Math.max(Math.round(position / 10) * 10, values.min_price ?? 0),
      );
    }
  };

  const handleMinBlur = () => {
    const value = values.min_price ?? 0;
    setFieldValue(
      'min_price',
      Math.max(0, Math.min(value, values.max_price ?? 5000)),
    );
  };

  const handleMaxBlur = () => {
    const value = values.max_price ?? 5000;
    setFieldValue(
      'max_price',
      Math.max(values.min_price ?? 0, Math.min(value, 5000)),
    );
  };

  return (
    <div className="sm:col-span-5">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Price Range ($CAD)
      </label>

      <div className="mt-8 px-2">
        {' '}
        {/* Added padding for label alignment */}
        {/* Min/Max Labels */}
        <div className="mb-2 flex justify-between px-1">
          <span className="text-sm text-gray-500">$0</span>
          <span className="text-sm text-gray-500">$5000+</span>
        </div>
        {/* Slider Container with larger touch target */}
        <div
          className="relative h-12 w-full touch-none"
          onClick={handleTrackClick}
          onTouchStart={handleTrackClick}
        >
          {/* Center the actual slider within the larger touch target */}
          <div className="absolute top-1/2 h-2 w-full -translate-y-1/2">
            {/* Track background */}
            <div className="absolute h-full w-full rounded-full bg-gray-200" />

            {/* Active track */}
            <div
              className="absolute h-full rounded-full bg-primary"
              style={{
                left: `${getPercentage(values.min_price ?? 0)}%`,
                right: `${100 - getPercentage(values.max_price ?? 5000)}%`,
              }}
            />

            <input
              type="range"
              min={0}
              max={5000}
              step={10}
              value={values.min_price ?? 0}
              onChange={handleMinPriceChange}
              className="price-range-slider pointer-events-none absolute w-full appearance-none bg-transparent"
              aria-label="Minimum price"
            />

            <input
              type="range"
              min={0}
              max={5000}
              step={10}
              value={values.max_price ?? 5000}
              onChange={handleMaxPriceChange}
              className="price-range-slider pointer-events-none absolute w-full appearance-none bg-transparent"
              aria-label="Maximum price"
            />
          </div>
        </div>
        {/* Input Fields */}
        <div className="mt-6 flex justify-between">
          <div className="relative">
            <Field
              type="number"
              name="min_price"
              min={0}
              max={5000}
              step={10}
              className="w-28 rounded-md border-2 border-primary p-2 text-center"
              value={values.min_price ?? 0}
              onChange={handleMinPriceChange}
              onBlur={handleMinBlur}
            />
          </div>

          <span className="self-center text-gray-500">to</span>

          <div className="relative">
            <Field
              type="number"
              name="max_price"
              min={0}
              max={5000}
              step={10}
              className="w-28 rounded-md border-2 border-primary p-2 pr-7 text-center"
              value={values.max_price ?? 5000}
              onChange={handleMaxPriceChange}
              onBlur={handleMaxBlur}
            />
            {(values.max_price ?? 5000) >= 5000 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                +
              </span>
            )}
          </div>
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
