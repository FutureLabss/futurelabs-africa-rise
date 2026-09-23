import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-fl-ink" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <span className="h-2 w-2 animate-pulse bg-fl-orange" aria-hidden />
        <p className="m-0 font-mono text-[10px] uppercase tracking-[.18em] text-fl-label">Loading</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
