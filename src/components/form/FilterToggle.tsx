import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Switch } from '@headlessui/react';

interface FilterToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  showLabel?: boolean;
  className?: string;
}

const FilterToggle: React.FC<FilterToggleProps> = ({
  label,
  checked,
  onChange,
  showLabel = true,
  className = '',
}) => (
  <Switch
    checked={checked}
    onChange={onChange}
    className={`flex items-center rounded-full px-4 py-2 ${
      checked ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
    } ${className}`}
  >
    {checked ? (
      <CheckIcon className="h-5 w-5" />
    ) : (
      <XMarkIcon className="h-5 w-5" />
    )}
    {showLabel && <span className="ml-2">{label}</span>}
  </Switch>
);

export default FilterToggle;
