import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ohukaart — Ohuteavitus',
  description: 'Kodaniku ohuteavituse MVP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <body className="min-h-screen bg-slate-200 antialiased">{children}</body>
    </html>
  );
}
