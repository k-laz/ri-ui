import { FC, useState } from 'react';
import { InfoIcon } from 'lucide-react';

interface FloatingMessageProps {
  text: string;
}

const FloatingMessage: FC<FloatingMessageProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={() => setIsVisible(false)}
      className="fixed bottom-4 right-4 z-10 flex max-w-[240px] cursor-pointer items-center gap-2 rounded-lg border border-gray-100 bg-white p-3 text-xs text-gray-800 shadow-sm transition-opacity duration-200 hover:bg-gray-50"
      role="alert"
    >
      <InfoIcon className="h-4 w-4 flex-shrink-0 text-yellow-400" />
      <p>{text}</p>
    </div>
  );
};

export default FloatingMessage;
