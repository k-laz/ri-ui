import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type AlertType = 'success' | 'error';

interface AlertMessageProps {
  message: string;
  type?: AlertType;
  isVisible: boolean;
  onClose: () => void;
}

export interface AlertState {
  show: boolean;
  message: string;
  type: AlertType;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type = 'success',
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 transform"
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`
        flex items-center gap-2 rounded-lg p-4 shadow-lg
        transition-all duration-500 ease-in-out
        ${
          type === 'success'
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }
        ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }
      `}
      >
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
        ) : (
          <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className={`
            ml-4 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              type === 'success'
                ? 'hover:bg-green-100 focus:ring-green-400'
                : 'hover:bg-red-100 focus:ring-red-400'
            }
          `}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
