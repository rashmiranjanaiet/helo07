import React from 'react';
import { JobData } from '../types';

interface JobResultCardProps {
  data: JobData;
}

const DemandBar: React.FC<{ demand: number }> = ({ demand }) => {
  let bgColor = 'bg-green-500';
  if (demand < 50) {
    bgColor = 'bg-yellow-500';
  } else if (demand < 80) {
    bgColor = 'bg-orange-500';
  } else {
    bgColor = 'bg-red-500';
  }
  
  // Use a different gradient based on demand for a more dynamic look
  const gradientClass = demand > 85 
    ? 'from-fuchsia-500 to-red-500'
    : demand > 60 
    ? 'from-cyan-500 to-blue-500' 
    : 'from-emerald-500 to-green-500';


  return (
    <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
      <div
        className={`bg-gradient-to-r ${gradientClass} h-4 rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${demand}%` }}
      ></div>
    </div>
  );
};

const JobResultCard: React.FC<JobResultCardProps> = ({ data }) => {
  const jobs = data.jobs.split(',').map(job => job.trim());

  return (
    <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700 animate-fade-in">
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl">{data.icon}</div>
        <div>
          <h2 className="text-3xl font-bold text-white">{data.skill}</h2>
          <p className="text-slate-400">Industry Demand & Importance</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="text-lg font-semibold text-cyan-400">Demand</h3>
          <p className="text-3xl font-extrabold text-white">{data.demand}%</p>
        </div>
        <DemandBar demand={data.demand} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-cyan-400 mb-3">Commonly Required For:</h3>
        <div className="flex flex-wrap gap-2">
          {jobs.map((job, index) => (
            <span key={index} className="bg-slate-700 text-slate-300 text-sm font-medium px-3 py-1 rounded-full">
              {job}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config (or just define it here since we can't edit config)
// This is a CSS-in-JS like approach since we can't edit tailwind.config.js
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default JobResultCard;
