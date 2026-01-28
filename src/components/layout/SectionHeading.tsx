import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({ title, subtitle, centered = true, className }: SectionHeadingProps) => {
  return (
    <div className={cn(centered ? "text-center" : "", "mb-12", className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-foreground">
        {title}
      </h2>
      <div className={cn("w-20 h-1 bg-primary mb-6", centered ? "mx-auto" : "")} />
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
