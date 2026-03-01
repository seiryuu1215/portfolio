import SectionHeading from './SectionHeading';

interface GrowthItem {
  icon: string;
  label: string;
  current: string;
  next: string;
}

const GROWTH: GrowthItem[] = [
  {
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
    label: 'フルスタック力の深化',
    current: 'Firebase / Supabase / AWS / Stripe を個人開発+実務で構築済み',
    next: 'RDB設計やマイクロサービス構成の実務経験で引き出しを広げる',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    label: 'AI / LLM活用',
    current: 'Claude Codeでの設計〜実装〜テストのAI協働開発を実践中',
    next: 'AIをプロダクトに組み込む経験・プロンプトエンジニアリングの深化',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    label: '設計 / アーキテクチャ',
    current: '個人開発で要件定義〜設計書一式をAIと協働で整備中',
    next: '大規模システムのアーキテクチャ設計を実務で経験',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'チーム開発への貢献',
    current: '電子新聞PJで新規参画者サポート・コードレビュー・Dependabot管理を担当',
    next: '技術選定・設計レビューでチームに貢献し、リード経験を積む',
  },
];

export default function VisionSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="vision" label="Vision" title="次のステップと目指す姿" />

        {/* 成長ロードマップ */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {GROWTH.map((g) => (
            <div
              key={g.label}
              className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent"
                  >
                    <path d={g.icon} />
                  </svg>
                </div>
                <h4 className="font-bold text-sm">{g.label}</h4>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded bg-green-500/10 text-green-400 border border-green-500/20">
                    Now
                  </span>
                  <p className="text-xs text-muted leading-relaxed">{g.current}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded bg-accent/10 text-accent border border-accent/20">
                    Next
                  </span>
                  <p className="text-xs text-muted leading-relaxed">{g.next}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 目指すエンジニア像 */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">目指すエンジニア像</h3>
            </div>
            <p className="text-muted leading-relaxed">
              <strong className="text-foreground">
                技術力で事業を作れるプロダクト志向のエンジニア。
              </strong>
              自分のプロダクトを持ちながら、技術的な課題解決だけでなく
              「誰のどんな問題を解くか」から考えられるエンジニアを目指しています。 darts Lab
              はその第一歩で、自身の課題を起点に企画〜運用まで一人で構築しました。
              今後もプロダクトを作り続けながら、フルスタック力・AI活用・設計力を磨き、
              技術とプロダクトの両輪で価値を生み出せる存在になりたいと考えています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
