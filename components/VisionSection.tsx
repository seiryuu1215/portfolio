import SectionHeading from './SectionHeading';

const GROWTH_AREAS = [
  {
    label: 'バックエンド / インフラ',
    current: 'Firebase / Supabase / AWS / Stripe Webhook を個人開発+実務で構築済み',
    next: 'RDB設計やマイクロサービス構成の実務経験を積み、バックエンドの引き出しをさらに広げる。',
  },
  {
    label: '設計 / アーキテクチャ',
    current: '個人開発で要件定義〜設計書一式をAIと協働で整備中',
    next: '大規模システムのアーキテクチャ設計を実務で経験し、設計力をさらに強化。',
  },
  {
    label: 'チームリード',
    current: '電子新聞PJで新規参画者サポート・コードレビューを担当',
    next: 'リーダーとしてチームを率いる経験を積み、技術面だけでなくマネジメントでも貢献。',
  },
];

const GROWTH = [
  {
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
    title: 'フルスタック力の深化',
    description:
      '個人開発で培ったフロント〜バックエンド〜インフラの一気通貫の開発力を、より大規模なシステムでも発揮できるレベルに引き上げたい。',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'AI / LLM活用',
    description:
      'Claude Codeでの開発効率化にとどまらず、AIをプロダクトに組み込む経験を積む。LLMを活用した機能開発やプロンプトエンジニアリングを深めたい。',
  },
];

export default function VisionSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="vision" label="Vision" title="次のステップと目指す姿" />

        {/* 成長領域 */}
        <div className="mb-10">
          <h3 className="text-lg font-bold mb-4">伸ばしていく領域</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {GROWTH_AREAS.map((g) => (
              <div key={g.label} className="p-5 rounded-xl bg-card border border-border">
                <p className="text-sm font-bold text-accent mb-2">{g.label}</p>
                <p className="text-xs text-muted leading-relaxed mb-2">
                  <span className="text-green-400">現在:</span> {g.current}
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  <span className="text-accent">次:</span> {g.next}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 伸ばしたい領域 */}
        <div className="mb-10">
          <h3 className="text-lg font-bold mb-4">伸ばしたい技術領域</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {GROWTH.map((g) => (
              <div key={g.title} className="p-5 rounded-xl bg-card border border-border flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
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
                <div>
                  <p className="font-bold text-sm mb-1">{g.title}</p>
                  <p className="text-xs text-muted leading-relaxed">{g.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 目指すエンジニア像 */}
        <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
          <h3 className="text-lg font-bold mb-3">目指すエンジニア像</h3>
          <p className="text-muted leading-relaxed">
            <strong className="text-foreground">技術力で事業を作れるプロダクト志向のエンジニア。</strong>
            自分のプロダクトを持ちながら、技術的な課題解決だけでなく
            「誰のどんな問題を解くか」から考えられるエンジニアを目指しています。
            darts Lab はその第一歩で、自身の課題を起点に企画〜運用まで一人で構築しました。
            今後もプロダクトを作り続けながら、フルスタック力・AI活用・設計力を磨き、
            技術とプロダクトの両輪で価値を生み出せる存在になりたいと考えています。
          </p>
        </div>
      </div>
    </section>
  );
}
