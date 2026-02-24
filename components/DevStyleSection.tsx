import SectionHeading from './SectionHeading';

const PRACTICES = [
  {
    title: 'CI/CD パイプライン',
    description: 'lint → format → test → build の4段階ゲートをGitHub Actionsで自動実行。全パスしないとマージしない。',
  },
  {
    title: 'テスト自動化',
    description: 'Vitest 125+ テスト + Storybook。個人開発でもテストを書くことで、リファクタリングの安全性を確保。',
  },
  {
    title: '設計ドキュメント',
    description: '要件定義書・基本設計書・詳細設計書・セキュリティレビューを個人開発でも整備。AIと協働で品質を担保。',
  },
  {
    title: 'エラー監視',
    description: 'Sentry によるリアルタイム監視。本番環境の問題を即座に検知し、ユーザー影響を最小化。',
  },
  {
    title: '依存関係管理',
    description: 'Dependabot PR を週次約15件マージ判断。セキュリティアップデートを迅速に適用。',
  },
  {
    title: 'コードレビュー',
    description: '実装・設計両観点でのレビューを実務で経験。指摘だけでなく「なぜそうすべきか」を伝える。',
  },
];

export default function DevStyleSection() {
  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="dev-style" label="Practices" title="開発プラクティス" />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {PRACTICES.map((p) => (
            <div key={p.title} className="p-5 rounded-xl bg-card border border-border">
              <h4 className="font-bold text-sm mb-2">{p.title}</h4>
              <p className="text-xs text-muted leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
