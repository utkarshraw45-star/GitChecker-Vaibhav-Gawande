import React, { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  targetScore: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ targetScore }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Reset for animation
    setDisplayScore(0);
    
    // Reduced duration for a punchier feel
    const duration = 1500; 
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease-out for a more pronounced slow-down at the end
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.floor(easeOut * targetScore);
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetScore]);

  // Color logic based on score
  const getColor = (s: number) => {
    if (s >= 80) return 'text-green-500 print:text-black';
    if (s >= 60) return 'text-yellow-400 print:text-black';
    return 'text-red-500 print:text-black';
  };

  const getBarColor = (s: number) => {
    if (s >= 80) return 'bg-green-500';
    if (s >= 60) return 'bg-yellow-400';
    return 'bg-red-500';
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl w-full max-w-xs mx-auto transform transition hover:scale-105 duration-300 print:border-2 print:border-gray-200">
      <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2 font-semibold print:text-black">Git Score</h3>
      <div className={`text-8xl font-black ${getColor(displayScore)} transition-colors duration-700`}>
        {displayScore}
      </div>
      <div className="w-full bg-gray-800 h-2 rounded-full mt-4 overflow-hidden print:bg-gray-200">
        <div 
          className={`h-full transition-all duration-300 ease-out ${getBarColor(displayScore)} print:bg-black`}
          style={{ width: `${displayScore}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreGauge;