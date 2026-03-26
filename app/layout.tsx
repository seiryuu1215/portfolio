import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Seiryuu | フリーランスエンジニア',
  description:
    'Webアプリを企画から運用まで一人で作れるフルスタックエンジニア。Next.js / React / TypeScript / Supabase / Firebase を中心に、認証・決済・DB設計・インフラまで一気通貫で対応。',
  keywords: [
    'フリーランスエンジニア',
    'フルスタックエンジニア',
    'Next.js',
    'React',
    'TypeScript',
    'Firebase',
    'Supabase',
    'ポートフォリオ',
    'リモートワーク',
  ],
  authors: [{ name: 'Seiryuu', url: 'https://portfolio-seiryuu.vercel.app' }],
  creator: 'Seiryuu',
  openGraph: {
    title: 'Seiryuu | フリーランスエンジニア',
    description:
      'Next.js / React / TypeScript を軸にWebアプリを企画から運用まで一人で構築。122,000行のSaaSを7日で構築した実績を持つフルスタックエンジニア。',
    url: 'https://portfolio-seiryuu.vercel.app',
    siteName: 'Seiryuu Portfolio',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seiryuu | フリーランスエンジニア',
    description:
      'Next.js / React / TypeScript を軸にWebアプリを企画から運用まで一人で構築。即日稼働可能。',
    creator: '@seiryuu_darts',
  },
  alternates: {
    canonical: 'https://portfolio-seiryuu.vercel.app',
  },
  metadataBase: new URL('https://portfolio-seiryuu.vercel.app'),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Seiryuu',
    jobTitle: 'フリーランス フルスタックエンジニア',
    url: 'https://portfolio-seiryuu.vercel.app',
    sameAs: [
      'https://github.com/seiryuu1215',
      'https://zenn.dev/seiryuuu_dev',
      'https://note.com/seiryuu_dev',
      'https://x.com/seiryuu_darts',
    ],
    knowsAbout: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Supabase', 'Stripe', 'AWS'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-to-content">
          メインコンテンツへスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
