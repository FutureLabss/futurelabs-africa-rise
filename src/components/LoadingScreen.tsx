import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <>
      <style>{`
        /* 
          Granular frames to create a smooth, accurate "writing/drawing" reveal.
          Using an angled polygon to simulate a slanted pen stroke revealing the logo.
        */
        @keyframes drawLogoFrames {
          0%   { clip-path: polygon(0 0, 0 0, -20% 100%, 0 100%); opacity: 0; filter: blur(4px); transform: scale(0.96); }
          10%  { clip-path: polygon(0 0, 15% 0, -5% 100%, 0 100%); opacity: 0.3; }
          20%  { clip-path: polygon(0 0, 30% 0, 10% 100%, 0 100%); opacity: 0.6; filter: blur(2px); }
          30%  { clip-path: polygon(0 0, 45% 0, 25% 100%, 0 100%); opacity: 1; transform: scale(0.98); }
          40%  { clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%); }
          50%  { clip-path: polygon(0 0, 75% 0, 55% 100%, 0 100%); filter: blur(1px); }
          60%  { clip-path: polygon(0 0, 90% 0, 70% 100%, 0 100%); transform: scale(0.99); }
          70%  { clip-path: polygon(0 0, 105% 0, 85% 100%, 0 100%); filter: blur(0px); }
          80%  { clip-path: polygon(0 0, 120% 0, 100% 100%, 0 100%); }
          90%  { clip-path: polygon(0 0, 120% 0, 100% 100%, 0 100%); }
          100% { clip-path: polygon(0 0, 120% 0, 100% 100%, 0 100%); opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        
        @keyframes sweepGlow {
          0%   { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          20%  { opacity: 1; }
          60%  { transform: translateX(150%) skewX(-20deg); opacity: 0.5; }
          100% { transform: translateX(150%) skewX(-20deg); opacity: 0; }
        }

        @keyframes fadeInPulse {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-draw-logo {
          /* Slow, deliberate cubic-bezier to feel like handwriting */
          animation: drawLogoFrames 2.2s cubic-bezier(0.25, 1, 0.4, 1) forwards;
        }
        
        .animate-sweep-glow {
          /* Syncs with the drawing stroke to add a "laser/light" effect at the leading edge */
          animation: sweepGlow 2.2s cubic-bezier(0.25, 1, 0.4, 1) forwards;
        }

        .animate-fade-up-delay {
          opacity: 0;
          animation: fadeInPulse 0.8s ease-out 1.2s forwards;
        }
      `}</style>
      <div className="flex min-h-screen items-center justify-center bg-fl-ink" role="status" aria-label="Loading">
        <div className="flex flex-col items-center gap-8">
          
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden sm:h-36 sm:w-36">
            <img 
              src="/FutureLabsLogo.png" 
              alt="FutureLabs Logo" 
              className="h-1/2 w-1/2 object-contain animate-draw-logo"
            />
            {/* The sweeping bright edge that accompanies the drawing clip-path */}
            {/* <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-fl-paper/40 to-transparent mix-blend-overlay pointer-events-none animate-sweep-glow" /> */}
          </div>

          {/* <div className="flex flex-col items-center gap-4 animate-fade-up-delay">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fl-orange" aria-hidden />
            <p className="m-0 font-mono text-[10px] uppercase tracking-[.18em] text-fl-label">Loading</p>
          </div> */}
          
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
