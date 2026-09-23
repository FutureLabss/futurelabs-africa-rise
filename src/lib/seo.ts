import type { Metadata } from 'next';

export const SITE_URL = 'https://futurelabs.africa';
export const SITE_NAME = 'FutureLabs Africa';
export const DEFAULT_OG_IMAGE = '/images/site/og-default.jpg';

/**
 * Per-page metadata: unique title and description, a canonical URL on the
 * apex domain, and matching Open Graph / Twitter tags (Next.js does not
 * derive og:title from the page title, so pages would otherwise all share
 * the homepage's social preview).
 */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_NG',
      type,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@FutureLabsNG',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
