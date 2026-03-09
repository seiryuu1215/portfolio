import SectionHeading from './SectionHeading';

const LEARNING_TECHS = [
  {
    name: 'Vue.js / Nuxt.js',
    reason: 'Reactのコンポーネント設計の知見を活かし、国内フリーランス求人の主要スタックへ対応',
    icon: 'vuejs/vuejs-original',
  },
  {
    name: 'Python',
    reason: 'FastAPI・AI/MLパイプライン連携を中心に、バックエンド開発の幅を拡張',
    icon: 'python/python-original',
  },
  {
    name: 'Go',
    reason:
      '高トラフィック・高並列処理に強いバックエンド言語として、大規模サービスへの対応力を強化',
    icon: 'go/go-original-wordmark',
  },
];

const AI_VISION_ITEMS = [
  {
    title: 'Multi-agent設計',
    description:
      'PM・実装・レビュー・テストの役割を複数AIに分担させ、開発プロセス全体を構造化。Claude Code の subagent 機能を活用し、並列タスク実行と品質チェックを自動化',
  },
  {
    title: '意思決定ログの体系化',
    description:
      'プロンプト履歴を日付・目的別に管理し「なぜその実装を選んだか」を追跡可能な形で蓄積。CLAUDE.md とメモリシステムで文脈を永続化',
  },
  {
    title: '振り返りサイクルの構築',
    description:
      'セッション単位で課題・成果・判断を記録し、次の開発に活かせる継続的改善ループを実現。設計書の自動更新・数値の自動検証も組み込む',
  },
  {
    title: 'Claude API / Agent SDK の活用',
    description:
      'Extended thinking による複雑設計の推論強化、Batch API による大量処理、Agent SDK でカスタムワークフローを構築',
  },
];

const CURRENT_PRACTICE = [
  {
    label: '設計〜テスト協働',
    detail: '82,000行・636テストの個人SaaSをClaude Codeと構築',
  },
  {
    label: '設計ドキュメント生成',
    detail: '要件定義書・ER図・フロー図など12本をAIと整備',
  },
  {
    label: '技術記事・書籍執筆',
    detail: 'Zenn Book（全10章）+ 記事14本をAIと協働で執筆・公開',
  },
  {
    label: 'CI/CD自動化',
    detail: 'Lint→Format→Test→Build の4段階ゲートをAI主導で構築',
  },
];

export default function NextStepSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="next-step" label="Learning Roadmap" title="Next Step" />
        <p className="text-sm text-muted -mt-4 mb-8 leading-relaxed">
          技術的ビジョン — 現在のスキルをベースに、次に向かう方向。
        </p>

        {/* 習得予定技術 */}
        <div className="mb-10">
          <h3 className="text-sm font-bold mb-4">習得予定技術</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {LEARNING_TECHS.map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-xl bg-card border border-border flex items-start gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.icon}.svg`}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="shrink-0 w-10 h-10 mt-0.5"
                  loading="lazy"
                />
                <div>
                  <span className="text-sm font-bold">{tech.name}</span>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{tech.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI駆動開発のビジョン */}
        <div>
          <h3 className="text-sm font-bold mb-4">AI駆動開発のビジョン</h3>

          <div className="p-4 rounded-xl bg-card border border-border mb-4">
            <p className="text-sm text-muted leading-relaxed">
              Claude Codeを活用したAI駆動開発を実践中。次のステップとして「AIを道具として使う」から
              <strong className="text-foreground">
                「AI組織を設計・運用する」フェーズへの移行
              </strong>
              を目指す。
            </p>
          </div>

          {/* 現在の実践 */}
          <div className="mb-6">
            <p className="text-xs text-accent font-medium mb-3">現在の実践</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CURRENT_PRACTICE.map((item) => (
                <div
                  key={item.label}
                  className="p-2.5 rounded-lg bg-card border border-border text-center"
                >
                  <div className="text-xs font-bold text-accent mb-0.5">{item.label}</div>
                  <div className="text-[10px] text-muted leading-snug">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 原体験 */}
          <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 mb-6">
            <p className="text-xs text-accent font-medium mb-1.5">次フェーズへ向かう原体験</p>
            <p className="text-xs text-muted leading-relaxed">
              Darts
              Labの初期開発（55,000行・164テスト時点）で「完成後に課題・判断・試行錯誤が振り返れない」という問題に直面した。コードは残るが、なぜその実装を選んだのか・どんな課題があったのかが記録されていなかった。
              その後CLAUDE.mdとメモリシステムを導入し、現在は82,000行・636テストまで成長。この経験から
              <strong className="text-foreground">開発プロセス自体を設計する重要性</strong>
              を実感し、「AIとの協働を仕組み化する」というビジョンに至った。
            </p>
          </div>

          {/* 具体的な実装予定 */}
          <p className="text-xs text-muted mb-3">次に取り組むこと:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {AI_VISION_ITEMS.map((item) => (
              <div key={item.title} className="p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-accent text-xs shrink-0">&#9656;</span>
                  <span className="text-sm font-bold">{item.title}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed pl-4">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
