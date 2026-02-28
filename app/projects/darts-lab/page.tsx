'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Architecture = dynamic(() => import('@/components/diagrams/Architecture'), { ssr: false });
const ERDiagram = dynamic(() => import('@/components/diagrams/ERDiagram'), { ssr: false });
const AuthPaymentFlow = dynamic(() => import('@/components/diagrams/AuthPaymentFlow'), { ssr: false });
const CronFlow = dynamic(() => import('@/components/diagrams/CronFlow'), { ssr: false });
const PageFlow = dynamic(() => import('@/components/diagrams/PageFlow'), { ssr: false });
const ApiDataFlow = dynamic(() => import('@/components/diagrams/ApiDataFlow'), { ssr: false });

const TABS = [
  { key: 'architecture', label: '📐 アーキテクチャ', component: Architecture },
  { key: 'er', label: '🗄️ ER図', component: ERDiagram },
  { key: 'auth', label: '🔐 認証・課金', component: AuthPaymentFlow },
  { key: 'cron', label: '⏰ Cronバッチ', component: CronFlow },
  { key: 'page', label: '📱 画面遷移', component: PageFlow },
  { key: 'api', label: '🔄 API・データフロー', component: ApiDataFlow },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function DiagramSkeleton() {
  return (
    <div className="animate-pulse max-w-[960px] mx-auto">
      <div className="h-8 w-64 bg-card rounded mx-auto mb-4" />
      <div className="h-4 w-48 bg-card rounded mx-auto mb-8" />
      <div className="aspect-[16/9] bg-card rounded-xl" />
    </div>
  );
}

export default function DartsLabDiagramsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('architecture');

  const ActiveComponent = TABS.find((t) => t.key === activeTab)!.component;

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="text-center pt-24 pb-6 px-4">
        <h1 className="text-2xl font-bold">darts Lab — 設計図</h1>
        <p className="text-sm text-muted mt-2">
          インタラクティブ SVG で設計を可視化
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-[960px] mx-auto px-4 mb-8">
        <div className="flex justify-center flex-wrap gap-2 pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-4 py-2 text-xs rounded-lg border transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-accent/10 text-accent border-accent/30'
                  : 'bg-card border-border text-muted hover:text-foreground hover:border-accent/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diagram content */}
      <div className="max-w-[960px] mx-auto px-4 pb-16">
        <Suspense fallback={<DiagramSkeleton />}>
          <ActiveComponent />
        </Suspense>
      </div>
    </div>
  );
}
