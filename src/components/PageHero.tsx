import React from 'react';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  backgroundImageUrl?: string;
};

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundImageUrl }) => {
  return (
    <section
      className={`relative w-full overflow-hidden pt-28 md:pt-36 pb-16 md:pb-20 ${!backgroundImageUrl ? 'bg-secondary' : ''}`}
    >
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {backgroundImageUrl && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1930]/90 via-[#0B1930]/80 to-primary/60" />
      )}

      <div className="relative z-10 container mx-auto px-6">
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
    </section>
  );
};

export default PageHero;




