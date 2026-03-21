import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Leads SaaS',
  description: 'Plataforma SaaS per captar i gestionar leads per negocis locals.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
