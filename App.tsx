import React, { useState, useCallback } from 'react';
import { JobData } from './types';
import { fetchJobDataForSkill } from './services/geminiService';
import SkillInput from './components/SkillInput';
import JobResultCard from './components/JobResultCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import { GithubIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [skill, setSkill] = useState<string>('');
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!skill.trim()) {
      setError('Please enter a skill.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setJobData(null);

    try {
      const data = await fetchJobDataForSkill(skill);
      setJobData(data);
    } catch (err) {
      console.error(err);
      setError(
        'Failed to fetch job data. The AI may be busy, or there was an issue with your request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [skill]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-2">
             <SparklesIcon className="w-10 h-10 text-cyan-400" />
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
                AI Skill to Job Matcher
             </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Enter a skill and let Gemini find the jobs and demand for it.
          </p>
        </header>

        <main>
          <SkillInput
            skill={skill}
            setSkill={setSkill}
            onSearch={handleSearch}
            isLoading={isLoading}
          />

          <div className="mt-8 min-h-[300px] flex items-center justify-center">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorDisplay message={error} />}
            {jobData && !isLoading && <JobResultCard data={jobData} />}
            {!isLoading && !error && !jobData && (
                 <div className="text-center text-slate-500">
                    <p>Your results will appear here.</p>
                    <p className="text-sm">e.g., "Data Structures", "React", "SQL"</p>
                 </div>
            )}
          </div>
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <a href="https://github.com/google/genai-prompt-gallery" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <GithubIcon className="w-5 h-5" />
                Powered by Gemini
            </a>
        </footer>
      </div>
    </div>
  );
};

export default App;
