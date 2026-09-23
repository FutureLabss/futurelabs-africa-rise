import React from 'react';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  backgroundImageUrl?: string;
  eyebrow?: string;
};

/** Hero for programme pages, in the site's editorial style (duotone photo optional). */
const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundImageUrl, eyebrow }) => {
  return (
    <section className="relative w-full overflow-hidden border-b border-fl-paper/[.14]">
      {backgroundImageUrl && (
        <div className="absolute inset-0" aria-hidden>
          <div className="fl-duotone h-full w-full [&>img]:[filter:grayscale(1)_contrast(1.12)_brightness(.42)]">
            <img src={backgroundImageUrl} alt="" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,12,10,.94),rgba(12,12,10,.5))]" />
        </div>
      )}
      <div className="fl-wrap relative pb-16 pt-20 lg:pb-20 lg:pt-24">
        {eyebrow && <div className="fl-eyebrow-accent mb-[26px]">{eyebrow}</div>}
        <h1 className="fl-h1 m-0 max-w-[18ch]">{title}</h1>
        {subtitle && <p className="m-0 mt-6 max-w-[52ch] text-[17px] leading-[1.55] text-fl-body lg:text-[18px]">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;
