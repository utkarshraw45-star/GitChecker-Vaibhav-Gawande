import React, { useState } from 'react';
import { ViewState, AnalysisResult } from './types';
import { analyzeRepository } from './services/repoService';
import AnalysisDashboard from './components/AnalysisDashboard';
import LoadingBat from './components/LoadingBat';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [viewState, setViewState] = useState<ViewState>(ViewState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setViewState(ViewState.LOADING);
    try {
      const data = await analyzeRepository(url);
      setResult(data);
      setViewState(ViewState.SUCCESS);
    } catch (err) {
      setViewState(ViewState.ERROR);
      setErrorMsg("Failed to analyze repository. Please check the URL and try again.");
    }
  };

  const reset = () => {
    setViewState(ViewState.IDLE);
    setUrl('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-yellow-500 selection:text-black print:bg-white print:text-black">
      
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50 no-print">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center font-bold text-black text-lg">
              G
            </div>
            <span className="font-bold text-xl tracking-tight text-white">GitChecker</span>
          </div>
        </div>
      </nav>

      <main className="px-6 pt-12 flex-grow">
        
        {viewState === ViewState.IDLE && (
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide-in">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
              Is your code <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">job ready?</span>
            </h1>
            
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-left shadow-2xl space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-2">The Problem</h2>
              <p className="text-gray-400 leading-relaxed">
                Students and developers push code daily, but rarely get real feedback. 
                Recruiters look at a repo for seconds. 
                If it's messy, you lose the chance.
              </p>
              <p className="text-gray-400 leading-relaxed">
                <strong>GitChecker</strong> is your personal reviewer. It checks your repo, gives a fair score, and tells you exactly how to fix it.
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="relative max-w-xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex">
                <input 
                  type="text" 
                  placeholder="Paste GitHub Repository URL..." 
                  className="w-full bg-zinc-950 text-white p-4 rounded-l-lg border border-zinc-800 focus:outline-none focus:border-yellow-500 transition-colors"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 rounded-r-lg transition-colors flex items-center gap-2"
                >
                  Analyze
                </button>
              </div>
            </form>
            
            <div className="flex justify-center gap-8 text-sm text-gray-500 pt-4">
              <span>✨ Instant Feedback</span>
              <span>🚀 Easy Roadmap</span>
              <span>🔒 100% Safe</span>
            </div>
          </div>
        )}

        {viewState === ViewState.LOADING && (
          <LoadingBat />
        )}

        {viewState === ViewState.ERROR && (
          <div className="max-w-md mx-auto bg-red-900/20 border border-red-900 text-red-200 p-6 rounded-xl text-center">
            <p>{errorMsg}</p>
            <button 
              onClick={reset}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-sm transition"
            >
              Try Again
            </button>
          </div>
        )}

        {viewState === ViewState.SUCCESS && result && (
          <AnalysisDashboard data={result} />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-12 py-8 bg-black no-print">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="flex flex-col items-center md:items-start gap-1">
             <p className="font-semibold text-gray-400">Developed by Vaibhav Gawande</p>
             <p>© 2025 GitChecker</p>
          </div>
          
          <a 
            href="https://www.linkedin.com/in/vaibhav-gawande-3790a7267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-4 md:mt-0 hover:text-blue-400 transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </footer>

    </div>
  );
};

export default App;