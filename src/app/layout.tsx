// src/app/layout.tsx - Updated for GirlPower
import type { Metadata } from 'next';
import './globals.css';
import { organization } from '@/data/organizationData';

export const metadata: Metadata = {
  title: `${organization.name} - Task Management System`,
  description: `${organization.mission} - Serving ${organization.location.county}, ${organization.location.country}`,
  keywords: [
    'GirlPower',
    'Bungoma',
    'Kenya',
    'Adolescent Girls',
    'Young Women',
    'SRHR',
    'Menstrual Health',
    'HIV AIDS',
    'GBV Prevention',
    'Teen Pregnancy',
    'Empowerment'
  ],
  authors: [{ name: organization.name, url: organization.website }],
  openGraph: {
    title: organization.name,
    description: organization.mission,
    url: organization.website,
    siteName: organization.shortName,
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: organization.name,
    description: organization.mission,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body className="antialiased">
        {/* Accessibility Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        <main id="main-content">
          {children}
        </main>
        
        {/* Footer Note */}
        <div className="fixed bottom-0 right-0 p-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm rounded-tl-lg">
          © 2025 {organization.shortName} • v2.0.0
        </div>
      </body>
    </html>
  );
}