import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SaaS Launcher 設計図ビューア | Seiryuu Portfolio',
  description:
    'SaaS Launcher（Next.js SaaSスターターキット）のアーキテクチャ・認証フロー・Stripe決済・RBAC・ミドルウェア設計を図解。',
  openGraph: {
    title: 'SaaS Launcher 設計図ビューア | Seiryuu Portfolio',
    description:
      'darts Labから抽出した認証・決済・セキュリティ基盤。日本語圏初のNext.js SaaSスターターキット。',
  },
};

export default function SaasLauncherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
