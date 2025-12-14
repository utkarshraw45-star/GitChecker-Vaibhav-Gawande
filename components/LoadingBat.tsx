import React from 'react';

const LoadingBat: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-8 relative overflow-hidden">
      
      {/* Moon Background - slightly darker now to contrast with the white bat */}
      <div className="absolute w-48 h-48 bg-yellow-500/20 rounded-full blur-xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>
      
      {/* Realistic Bat Container */}
      <div className="relative w-48 h-32 bat-realistic-body flex items-center justify-center z-10">
        <svg
          viewBox="0 0 200 100"
          className="w-full h-full drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Wing */}
          <g className="bat-realistic-wing-left">
             <path d="M100 50 Q 70 20 40 30 Q 20 40 10 30 Q 30 60 50 55 Q 80 70 100 50 Z" fill="#FFFFFF" stroke="#d4d4d8" strokeWidth="1"/>
          </g>
          
          {/* Right Wing */}
          <g className="bat-realistic-wing-right">
             <path d="M100 50 Q 130 20 160 30 Q 180 40 190 30 Q 170 60 150 55 Q 120 70 100 50 Z" fill="#FFFFFF" stroke="#d4d4d8" strokeWidth="1"/>
          </g>

          {/* Body */}
          <ellipse cx="100" cy="50" rx="10" ry="15" fill="#FFFFFF" stroke="#d4d4d8" strokeWidth="1"/>
          {/* Ears */}
          <path d="M92 40 L90 30 L96 38 Z" fill="#FFFFFF" stroke="#d4d4d8" strokeWidth="1"/>
          <path d="M108 40 L110 30 L104 38 Z" fill="#FFFFFF" stroke="#d4d4d8" strokeWidth="1"/>
        </svg>
      </div>

      <p className="text-white font-bold tracking-wider animate-pulse uppercase z-10 text-lg shadow-black drop-shadow-md">
        Calculating Git Score...
      </p>
    </div>
  );
};

export default LoadingBat;