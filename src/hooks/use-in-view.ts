import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const elementRef = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const target = elementRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
        threshold: options?.threshold ?? 0.15,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [options?.root, options?.rootMargin, options?.threshold]);

  return { ref: elementRef, inView } as const;
}




