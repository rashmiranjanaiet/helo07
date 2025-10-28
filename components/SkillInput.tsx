import React from 'react';
import { SearchIcon } from './Icons';

interface SkillInputProps {
  skill: string;
  setSkill: (skill: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SkillInput: React.FC<SkillInputProps> = ({ skill, setSkill, onSearch, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex gap-2 p-2 bg-slate-800 rounded-full shadow-lg focus-within:ring-2 focus-within:ring-cyan-500 transition-all duration-300">
      <input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a skill like 'Algorithms' or 'OOP'..."
        className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none px-4"
        disabled={isLoading}
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-bold p-3 rounded-full transition-colors duration-300"
      >
        <SearchIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SkillInput;
