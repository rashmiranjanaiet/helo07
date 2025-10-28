import React from 'react';
import { WarningIcon } from './Icons';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="w-full max-w-lg bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative flex items-center gap-4" role="alert">
      <WarningIcon className="w-6 h-6 text-red-400" />
      <div>
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};

export default ErrorDisplay;
