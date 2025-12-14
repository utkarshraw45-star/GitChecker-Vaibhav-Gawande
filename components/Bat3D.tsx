import React, { useState, useEffect } from 'react';

type BatState = 'IDLE' | 'HOVER' | 'SPIN' | 'TALK';

const Bat3D: React.FC = () => {
  const [batState, setBatState] = useState<BatState>('IDLE');

  const handleMouseEnter = () => {
    if (batState === 'IDLE') setBatState('HOVER');
  };

  const handleMouseLeave = () => {
    if (batState === 'HOVER') setBatState('IDLE');
  };

  const handleClick = () => {
    if (batState === 'SPIN' || batState === 'TALK') return;
    
    // Sequence: Spin -> Talk -> Idle
    setBatState('SPIN');
    
    // Spin duration 1s
    setTimeout(() => {
      setBatState('TALK');
      
      // Talk duration 800ms (enough for 2 bites)
      setTimeout(() => {
        setBatState('IDLE');
      }, 800);
    }, 1000);
  };

  // Determine classes based on state
  const isSpinning = batState === 'SPIN';
  const isTalking = batState === 'TALK';
  const isHovering = batState === 'HOVER';

  return (
    <div 
      className="w-full h-40 flex items-center justify-center bat-talk-scene overflow-visible cursor-pointer select-none"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="Click me!"
    >
      <style>{`
        @keyframes bat-spin {
          0% { transform: scale(1) rotate(0deg); }
          40% { transform: scale(1.1) rotate(180deg); }
          80% { transform: scale(1.1) rotate(360deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        .bat-animate-spin {
          animation: bat-spin 1s ease-in-out forwards !important;
        }
        
        /* Faster flutter for hover state */
        .bat-flutter {
           animation-duration: 0.2s !important;
        }

        /* Talking mouth animation (override global default) */
        @keyframes bat-talk-bite {
           0%, 100% { transform: scaleY(0.2); }
           50% { transform: scaleY(1); }
        }
        .bat-talking-mouth {
           animation: bat-talk-bite 0.4s ease-in-out infinite !important;
           opacity: 1 !important;
        }
        .bat-quiet-mouth {
           transform: scaleY(0.2);
           opacity: 0.5;
           animation: none !important;
        }
      `}</style>

      {/* The pivot floats. Spin overrides float via class logic if we wanted, but here we apply spin to the pivot wrapper or pivot itself. 
          To make spin override float, we add the spin class which uses !important in the keyframe definition above or here. */}
      <div className={`bat-talk-pivot relative w-40 h-24 ${isSpinning ? 'bat-animate-spin' : ''}`}>
        
        {/* Left Wing Layer (Back) */}
        <div className={`absolute top-0 left-0 w-1/2 h-full bat-talk-wing-l origin-right z-0 ${isHovering ? 'bat-flutter' : ''}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M100 50 Q 70 10 30 30 Q 10 40 0 30 Q 20 70 50 60 Q 80 80 100 50 Z" fill="#333" stroke="#444" strokeWidth="0.5" />
            </svg>
        </div>

        {/* Right Wing Layer (Back) */}
        <div className={`absolute top-0 right-0 w-1/2 h-full bat-talk-wing-r origin-left z-0 ${isHovering ? 'bat-flutter' : ''}`}>
           <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'scaleX(-1)' }}>
              <path d="M100 50 Q 70 10 30 30 Q 10 40 0 30 Q 20 70 50 60 Q 80 80 100 50 Z" fill="#333" stroke="#444" strokeWidth="0.5" />
            </svg>
        </div>

        {/* Body Layer (Center) */}
        <div className="absolute top-0 left-1/2 w-16 h-full -ml-8 z-10 flex flex-col items-center justify-center">
           <svg viewBox="0 0 60 100" className="w-full h-full">
              {/* Torso */}
              <ellipse cx="30" cy="60" rx="15" ry="25" fill="#222" stroke="#333" />
              <path d="M30 60 L20 85 L40 85 Z" fill="#222" />
           </svg>
        </div>

        {/* Head Layer (Front & Talking) */}
        <div className="absolute top-[-10px] left-1/2 w-16 h-16 -ml-8 z-20 bat-talk-head">
           <svg viewBox="0 0 60 60" className="w-full h-full overflow-visible">
              {/* Ears */}
              <path d="M15 25 L10 5 L25 20 Z" fill="#222" stroke="#333"/>
              <path d="M45 25 L50 5 L35 20 Z" fill="#222" stroke="#333"/>
              
              {/* Face Shape */}
              <circle cx="30" cy="30" r="18" fill="#222" stroke="#333" />
              
              {/* Eyes */}
              <circle cx="22" cy="25" r="3" fill="#fbbf24" />
              <circle cx="38" cy="25" r="3" fill="#fbbf24" />
              
              {/* Mouth (Animation Controlled by State) */}
              <g className={isTalking ? 'bat-talking-mouth' : 'bat-quiet-mouth'} transform="translate(30, 40)">
                 {/* Mouth Shape */}
                 <path d="M-5 0 Q 0 5 5 0 Z" fill="#e11d48" />
              </g>
           </svg>
        </div>

      </div>
    </div>
  );
};

export default Bat3D;