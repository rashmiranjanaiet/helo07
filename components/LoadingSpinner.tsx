import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium">Analyzing with Gemini...</p>
    </div>
  );
};

export default LoadingSpinner;
