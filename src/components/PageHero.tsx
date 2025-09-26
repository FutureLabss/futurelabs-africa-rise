import React from 'react';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  backgroundImageUrl?: string;
};

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundImageUrl }) => {
  return (
    <section
      className="relative w-full overflow-hidden"
    >
      <div
        className="relative w-full"
        style={{
          minHeight: '320px',
        }}
      >
        {backgroundImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1930]/90 via-[#0B1930]/80 to-primary/60" />

        <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-roboto">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;



