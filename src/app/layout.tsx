// app/layout.tsx
import { MobileSizeProvider } from './contexts/MobileSizeContext'
import './globals.css'
import { Geist, Geist_Mono, Kanit } from 'next/font/google'
import LayoutWrapper from './LayoutWarraper';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const kanit = Kanit({ variable: '--font-kanit', subsets: ['thai'], weight: ['400', '700'] });

export const metadata = {
  title: 'RSLab Health',
  description: 'ผลสุขภาพ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} font-kanit antialiased`}>
        <MobileSizeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </MobileSizeProvider>
      </body>
    </html>
  );
}
