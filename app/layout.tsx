import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SafeWave Demo',
  description: 'SafeWave is a mobile-first anti-bullying school safety app connected to a smart wristband.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
