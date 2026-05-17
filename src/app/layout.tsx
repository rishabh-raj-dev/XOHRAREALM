import type { Metadata } from 'next';
import { IBM_Plex_Mono, Syne, Press_Start_2P } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlobalPlayer from '@/components/player/GlobalPlayer';
import CursorGlow from '@/components/effects/CursorGlow';
import NoiseOverlay from '@/components/effects/NoiseOverlay';
import VHSOverlay from '@/components/effects/GradientBlob';

/* ── Typography Stack ──
   Display:  Syne — experimental, editorial, music-venue-born typeface
   Body/UI:  IBM Plex Mono — clean, technical monospace for UI text
   Micro:    Press Start 2P — bitmap pixel font for tiny labels only
   ─────────────────────────────────────────────────────────────────── */

const syne = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const pressStart = Press_Start_2P({
  variable: '--font-micro',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'XOHRA REALM | underground sound collective',
  description:
    'xohra realm — an underground music collective. raw sound. analog soul. discover our artists, releases, and sonic experiments.',
  keywords: ['music label', 'underground', 'xohra realm', 'artists', 'releases', 'analog', 'y2k'],
  openGraph: {
    title: 'XOHRA REALM | underground sound collective',
    description: 'an underground music collective. raw sound. analog soul.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${ibmPlexMono.variable} ${pressStart.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        {/* Ambient effects */}
        <VHSOverlay />
        <NoiseOverlay />
        <CursorGlow />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Persistent audio player */}
        <GlobalPlayer />
      </body>
    </html>
  );
}
