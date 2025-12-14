import React, { useEffect, useState } from 'react';
import { AnalysisResult } from '../types';
import ScoreGauge from './ScoreGauge';
import Bat3D from './Bat3D';

interface Props {
  data: AnalysisResult;
}

const MetricBar: React.FC<{ name: string; value: number; index: number }> = ({ name, value, index }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Snappy stagger (50ms)
    const timer = setTimeout(() => {
      setWidth(value);
    }, index * 50 + 100); 
    return () => clearTimeout(timer);
  }, [value, index]);

  return (
    <div className="group cursor-default">
      <div className="flex justify-between items-end mb-2">
        <span className="text-gray-400 text-sm font-medium group-hover:text-yellow-400 transition-colors duration-300">{name}</span>
        <span className="text-white font-bold text-lg">{value}<span className="text-zinc-600 text-sm">/100</span></span>
      </div>
      <div className="h-3 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 shadow-inner group-hover:border-zinc-700 transition-colors">
        <div 
          className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:brightness-110 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
          style={{ 
            width: `${width}%`,
            transition: 'width 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), filter 0.3s ease' 
          }}
        />
      </div>
    </div>
  );
};

const AnalysisDashboard: React.FC<Props> = ({ data }) => {
  
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-slide-in pb-12 print:block">
      
      {/* Global styles for this component's animations */}
      <style>{`
        @keyframes bounceFadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          60% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-900 p-6 rounded-xl border border-zinc-800 print:border-none print:p-0 print:mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 print:text-black">{data.repositoryName || "Repository"}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.techStack.map((tech, idx) => (
              <span key={idx} className="bg-zinc-800 text-gray-300 px-3 py-1 rounded-full text-xs border border-zinc-700 print:bg-gray-200 print:text-black print:border-gray-400">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:block print:space-y-8">
        
        {/* Score Column */}
        <div className="md:col-span-1 print:w-full print:mb-8">
          <ScoreGauge targetScore={data.score} />
          <div className="mt-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800 print:border print:border-gray-300 print:bg-white print:mt-4">
            <h3 className="text-white font-semibold mb-3 border-b border-zinc-700 pb-2 print:text-black print:border-gray-300">Quick Summary</h3>
            <p className="text-gray-300 leading-relaxed text-sm print:text-black">
              {data.summary}
            </p>
          </div>
        </div>

        {/* Charts & Roadmap Column */}
        <div className="md:col-span-2 space-y-8 print:w-full">
          
          {/* Performance Metrics - Lightweight Animated Graphs */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 print:break-inside-avoid print:border print:border-gray-300 print:bg-white">
            <h3 className="text-white font-semibold mb-6 print:text-black">Performance Metrics</h3>
            <div className="flex flex-col gap-6">
              {data.breakdown.map((item, index) => (
                <MetricBar key={item.name} name={item.name} value={item.value} index={index} />
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 print:break-inside-avoid print:border print:border-gray-300 print:bg-white">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 print:text-black">
              <span className="text-yellow-500 text-xl">⚡</span> Improvement Roadmap
            </h3>
            <div className="space-y-4">
              {data.roadmap.map((step, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 group"
                  style={{ 
                    opacity: 0,
                    animation: `bounceFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`, // Back-out easing for bounce
                    animationDelay: `${index * 150 + 200}ms`
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-600 text-xs flex items-center justify-center text-gray-400 group-hover:border-yellow-500 group-hover:text-yellow-500 transition-all duration-300 shadow-lg shadow-black group-hover:shadow-yellow-500/20 print:bg-white print:text-black print:border-black print:shadow-none z-10">
                      {index + 1}
                    </div>
                    {index !== data.roadmap.length - 1 && (
                       <div className="w-px h-full bg-zinc-800 my-1 group-hover:bg-zinc-700 transition-colors print:bg-gray-300"></div>
                    )}
                  </div>
                  <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 w-full group-hover:border-zinc-600 group-hover:bg-zinc-900 transition-all duration-300 print:bg-white print:border-gray-200 print:text-black">
                    <p className="text-gray-300 text-sm font-medium print:text-black group-hover:text-gray-200 transition-colors">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Increase Git Score */}
          <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-yellow-500/30 relative overflow-hidden print:break-inside-avoid print:border print:border-gray-300 print:bg-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full"></div>
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 print:text-black">
              <span className="text-yellow-400">🦇</span> How to Increase Your Git Score
            </h3>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 3D Bat Animation */}
              <div className="w-full md:w-1/3 flex justify-center print:hidden">
                 <Bat3D />
              </div>
              
              <div className="w-full md:w-2/3 space-y-3">
                <ul className="space-y-3">
                  {[
                    "Add a clear README.md file with setup instructions.",
                    "Organize your code into folders (clean structure).",
                    "Add comments to explain complex logic.",
                    "Include a license file (MIT, Apache, etc.).",
                    "Remove unused files and console logs."
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm print:text-black">
                       <span className="text-green-400 font-bold">✓</span>
                       {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AnalysisDashboard;