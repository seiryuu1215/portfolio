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
    description: 'PM・実装・レビュー・テストの役割を複数AIに分担させ、開発プロセス全体を構造化',
  },
  {
    title: '意思決定ログの体系化',
    description:
      'プロンプト履歴を日付・目的別に管理し「なぜその実装を選んだか」を追跡可能な形で蓄積',
  },
  {
    title: '振り返りサイクルの構築',
    description:
      'セッション単位で課題・成果・判断を記録し、次の開発に活かせる継続的改善ループを実現',
  },
  {
    title: 'Claude API の活用',
    description:
      'Projects / Extended thinking / Batch API による、長期開発・複雑設計・大量処理への対応',
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

          {/* 原体験 */}
          <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 mb-6">
            <p className="text-xs text-accent font-medium mb-1.5">原体験</p>
            <p className="text-xs text-muted leading-relaxed">
              個人開発のダーツ分析アプリ（Darts Lab）を55,000行・164テストまで構築した経験から、
              「完成後に課題・判断・試行錯誤が振り返れない」という問題に直面。コードは残るが、なぜその実装を選んだのか・どんな課題があったのかが記録されていない状態になった。
              この経験から、
              <strong className="text-foreground">開発プロセス自体を設計する重要性</strong>
              を実感し、次フェーズのビジョンを描くきっかけとなった。
            </p>
          </div>

          {/* 具体的な実装予定 */}
          <p className="text-xs text-muted mb-3">具体的な実装予定:</p>
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
