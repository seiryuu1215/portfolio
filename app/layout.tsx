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
    'Webアプリを企画から運用まで一人で作れるフルスタックエンジニア。Next.js / React / Firebase を中心とした開発が得意です。',
  openGraph: {
    title: 'Seiryuu | フリーランスエンジニア',
    description:
      'Next.js / React / Firebase を軸にWebアプリを企画から運用まで一人で構築。ダーツプロライセンス保持のフルスタックエンジニア。',
    url: 'https://portfolio-seiryuu.vercel.app',
    siteName: 'Seiryuu Portfolio',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seiryuu | フリーランスエンジニア',
    description:
      'Next.js / React / Firebase を軸にWebアプリを企画から運用まで一人で構築。',
  },
  metadataBase: new URL('https://portfolio-seiryuu.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#main" className="skip-to-content">
          メインコンテンツへスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
