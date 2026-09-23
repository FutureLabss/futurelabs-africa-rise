import React from 'react';
import { Metadata } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import HashRedirect from '@/components/HashRedirect';
import '../index.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const description =
  "FutureLabs is a technology and economic development institution building the talent, startups, technologies and institutional capabilities Africa needs to turn human potential into productive economic power.";

export const metadata: Metadata = {
  metadataBase: new URL('https://futurelabs.africa'),
  title: {
    default: "FutureLabs Africa — Building Africa's productive capacity",
    template: "%s | FutureLabs Africa",
  },
  description,
  authors: [{ name: "FutureLabs" }],
  openGraph: {
    title: "FutureLabs Africa — Building Africa's productive capacity",
    description,
    type: "website",
    images: ["https://futurelabs.africa/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FutureLabsNG",
    images: ["https://futurelabs.africa/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <HashRedirect />
          {children}
        </Providers>
      </body>
    </html>
  );
}
