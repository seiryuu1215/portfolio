import SectionHeading from './SectionHeading';

interface Practice {
  title: string;
  description: string;
  badge: string;
  icon: string;
}

const PRACTICES: Practice[] = [
  {
    title: 'CI/CD パイプライン',
    description:
      'lint → format → test → build の4段階ゲートをGitHub Actionsで自動実行。全パスしないとマージしない。',
    badge: '4段階ゲート',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'テスト自動化',
    description:
      '個人開発でもテストを書き、リファクタリングの安全性を確保。Storybook でUIの視覚テストも併用。',
    badge: '158テスト',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    title: '設計ドキュメント',
    description:
      '要件定義書・基本設計書・詳細設計書・セキュリティレビューを個人開発でもAIと協働で整備。',
    badge: '10本整備',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'エラー監視',
    description:
      'Sentry によるリアルタイム監視。本番環境の問題を即座に検知し、ユーザー影響を最小化。',
    badge: 'Sentry',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  },
  {
    title: '依存関係管理',
    description:
      'Dependabot PR のリリースノート精査・マージ判断を主導。セキュリティアップデートを迅速に適用。',
    badge: '週次15件',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  {
    title: 'コードレビュー',
    description:
      '実装・設計両観点でのレビューを実務で経験。指摘だけでなく「なぜそうすべきか」を伝える。',
    badge: '実務経験',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
];

export default function DevStyleSection() {
  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="dev-style" label="Practices" title="開発プラクティス" />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {PRACTICES.map((p) => (
            <div
              key={p.title}
              className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent"
                  >
                    <path d={p.icon} />
                  </svg>
                </div>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20 font-bold">
                  {p.badge}
                </span>
              </div>
              <h4 className="font-bold text-sm mb-2">{p.title}</h4>
              <p className="text-xs text-muted leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
