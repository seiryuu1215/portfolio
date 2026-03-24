import SectionHeading from './SectionHeading';

const LEARNING_TECHS = [
  {
    name: 'Vue.js / Nuxt.js',
    reason: 'Reactのコンポーネント設計の知見を活かし、国内フリーランス求人の主要スタックへ対応',
    icon: 'vuejs/vuejs-original',
  },
  {
    name: 'Python',
    reason: 'FastAPI・AI/MLパイプライン連携を中心に、実務レベルからさらに深化',
    icon: 'python/python-original',
  },
  {
    name: 'Go',
    reason:
      '高トラフィック・高並列処理に強いバックエンド言語として、大規模サービスへの対応力を強化',
    icon: 'go/go-original-wordmark',
  },
];

const AI_PRACTICE_ITEMS = [
  {
    title: 'Multi-agent 開発フロー',
    description:
      'PM→実装→テスト→レビュー→日記の5エージェント体制を3プロジェクトで運用中。各エージェントに専用の役割・制約・ツール権限を定義し、品質ゲートを自動化',
  },
  {
    title: '意思決定ログの永続化',
    description:
      'CLAUDE.md + docs/decisions/ + メモリシステムで設計判断を追跡可能な形で蓄積。セッションを跨いだ文脈の永続化を実現',
  },
  {
    title: '自動品質フィードバック',
    description:
      'PostToolUse hooks でTypeScript型チェック・テスト自動実行。PreToolUse でツール呼び出しをJSONLログに記録し、セッション効率を定量化',
  },
];

const AI_NEXT_ITEMS = [
  {
    title: 'Claude API / Agent SDK の活用',
    description:
      'Extended thinking による複雑設計の推論強化、Batch API による大量処理、Agent SDK でカスタムワークフローを構築',
  },
  {
    title: 'クロスリポ自動同期のCI/CD化',
    description:
      'darts-app → portfolio の数値同期を手動からGitHub Actions自動化へ。metrics.json の変更検知でPRを自動生成',
  },
  {
    title: 'AI駆動コードレビューの自動化',
    description:
      'PR作成時にSubAgentが自動レビュー・改善提案を行うワークフローを構築。人間のレビュー負荷を軽減',
  },
];

const CURRENT_PRACTICE = [
  {
    label: '設計〜テスト協働',
    detail: '90,000行・632テストの個人SaaSをClaude Codeと構築',
  },
  {
    label: '設計ドキュメント',
    detail: '要件定義書・ADR 7本・運用マニュアル等20+本をAIと整備',
  },
  {
    label: '技術記事・書籍',
    detail: 'Zenn Book（全10章）+ 記事19本をAIと協働で執筆・公開',
  },
  {
    label: 'SubAgents + Hooks',
    detail: '5エージェント体制 + PostToolUse自動テスト + ログ定量分析',
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
                className="p-4 rounded-xl bg-card border border-border flex items-start gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
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

          <div className="p-4 rounded-xl bg-card border border-border mb-4 shadow-card">
            <p className="text-sm text-muted leading-relaxed">
              Claude Codeを活用したAI駆動開発を実践中。「AIを道具として使う」段階から
              <strong className="text-foreground">
                「AI組織を設計・運用する」フェーズへ移行済み
              </strong>
              。3プロジェクトでSubAgents体制を運用。
            </p>
          </div>

          {/* 現在の実践（数値カード） */}
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

          {/* 実践中の取り組み */}
          <p className="text-xs text-accent font-medium mb-3">実践中:</p>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {AI_PRACTICE_ITEMS.map((item) => (
              <div
                key={item.title}
                className="p-3 rounded-lg border border-green-500/20 bg-green-500/5"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-green-500/10 text-green-400 border border-green-500/20">
                    運用中
                  </span>
                  <span className="text-sm font-bold">{item.title}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* 原体験 */}
          <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 mb-6">
            <p className="text-xs text-accent font-medium mb-1.5">この体制に至った原体験</p>
            <p className="text-xs text-muted leading-relaxed">
              darts Labの開発過程で「なぜその実装を選んだか」が振り返れない問題に直面。
              CLAUDE.mdとメモリシステムの導入で解決し、
              <strong className="text-foreground">開発プロセス自体を設計する重要性</strong>
              を実感。SubAgents + Hooks + Skills で「AIとの協働を仕組み化」した。
            </p>
          </div>

          {/* 次のチャレンジ */}
          <p className="text-xs text-muted mb-3">次のチャレンジ:</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {AI_NEXT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="p-3 rounded-lg bg-card border border-border shadow-card"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-accent text-xs shrink-0">&#9656;</span>
                  <span className="text-sm font-bold">{item.title}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
