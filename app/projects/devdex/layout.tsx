import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevDex 設計図ビューア | Seiryuu Portfolio',
  description:
    'DevDex（IT用語理解度管理SaaS）のアーキテクチャ・ER図・認証RLS・API設計・画面遷移・AI統合フローを設計図で解説。Next.js 16 + Supabase + Anthropic API。',
  openGraph: {
    title: 'DevDex 設計図ビューア | Seiryuu Portfolio',
    description:
      '122,213行・3,077テストのSaaSを7日間で構築。アーキテクチャからAI統合まで設計図で全貌を公開。',
  },
};

export default function DevDexLayout({ children }: { children: React.ReactNode }) {
  return children;
}
