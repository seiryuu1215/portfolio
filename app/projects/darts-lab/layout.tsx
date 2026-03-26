import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'darts Lab 設計図ビューア | Seiryuu Portfolio',
  description:
    'darts Lab（ダーツ選手向け分析Webアプリ）のアーキテクチャ・ER図・認証課金・Cronバッチ・API設計を設計図で解説。Next.js 16 + Firebase + Stripe。',
  openGraph: {
    title: 'darts Lab 設計図ビューア | Seiryuu Portfolio',
    description:
      '90,000行超のダーツ分析SaaS。スタッツ分析・LINE Bot・HealthKit連携の全設計を公開。',
  },
};

export default function DartsLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
