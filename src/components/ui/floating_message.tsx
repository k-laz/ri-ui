import { FC, useState } from 'react';
import { InfoIcon, XIcon } from 'lucide-react';
import { useAuth } from '@/hooks/AuthProvider';

interface FloatingMessageProps {
  text: string;
}

const FloatingMessage: FC<FloatingMessageProps> = ({ text }) => {
  const { isFirstTimeUser } = useAuth();
  const [isVisible, setIsVisible] = useState(isFirstTimeUser);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={() => setIsVisible(false)}
      className="fixed bottom-4 right-4 z-10 flex max-w-[280px] cursor-pointer items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 text-xs text-gray-800 shadow-sm transition-opacity duration-200 hover:bg-gray-50 md:text-sm"
      role="alert"
    >
      <InfoIcon className="h-5 w-5 flex-shrink-0 text-yellow-500" />
      <p>{text}</p>
      <XIcon className="h-5 w-5 text-gray-500" />
    </div>
  );
};

export default FloatingMessage;
