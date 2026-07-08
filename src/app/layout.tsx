import React from 'react';
import { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';
import Providers from '@/components/Providers';
import '../index.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FutureLabs.Africa - Accelerating Africa's Future",
  description: "FutureLabs is a digital innovation hub on a mission to equip African youth with the skills, mindset, and tools to solve real-world problems, build transformative startups, and thrive in the global digital economy.",
  authors: [{ name: "FutureLabs" }],
  openGraph: {
    title: "FutureLabs.Africa - Accelerating Africa's Future",
    description: "FutureLabs is a digital innovation hub on a mission to equip African youth with the skills, mindset, and tools to solve real-world problems, build transformative startups, and thrive in the global digital economy.",
    type: "website",
    images: ["https://futurelabs.africa/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@futurelabs_africa",
    images: ["https://futurelabs.africa/lovable-uploads/ba5f9b8e-a532-490c-aeb0-f5fa692dc6d0.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
