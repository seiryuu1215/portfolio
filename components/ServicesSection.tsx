import SectionHeading from './SectionHeading';

interface Service {
  icon: string;
  title: string;
  items: string[];
  strong?: boolean;
}

const SERVICES: Service[] = [
  {
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    title: 'フルスタック開発（フロントエンド軸）',
    items: [
      'React / Next.js / TypeScript（実務3年+個人開発）',
      'Firebase / Supabase によるバックエンド・認証・DB設計',
      'Stripe 決済基盤（Subscription / Webhook サーバーサイド完結）',
      'Puppeteer スクレイピング + Vercel Cron による自動データ収集',
      'Recharts データ可視化・統計分析（相関分析・回帰分析・ヒートマップ・シミュレーター）',
    ],
    strong: true,
  },
  {
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
    title: 'インフラ / クラウド',
    items: [
      'AWS（Lambda / DynamoDB / CloudWatch）',
      'Vercel（ホスティング / Edge Runtime / Cron）',
      'Firebase（Auth / Firestore / Storage）',
      'PWA / モバイル対応（Serwist / Capacitor iOS）',
    ],
  },
  {
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    title: '設計 / 品質管理',
    items: [
      '要件定義〜詳細設計〜テスト — 全工程を一貫対応',
      'CI/CD パイプライン構築（GitHub Actions / CircleCI）',
      'コードレビュー・Dependabot管理',
      'セキュリティレビュー（CRITICAL含む11件の脆弱性修正実績）',
    ],
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'AI駆動開発',
    items: [
      'Claude Code 活用 — 設計〜実装〜テスト〜設計書をAIと協働',
      'アジャイル（スクラム）での週次スプリント開発',
      'REST API 設計・Swagger 連携',
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="services" label="Services" title="対応可能な業務" />

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={`p-6 rounded-xl bg-card border transition-colors group ${
                service.strong
                  ? 'border-accent/40 hover:border-accent/60 ring-1 ring-accent/10'
                  : 'border-border hover:border-accent/30'
              }`}
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
                    <path d={service.icon} />
                  </svg>
                </div>
                {service.strong && (
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
                    得意領域
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold mb-3">{service.title}</h3>
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="text-sm text-muted flex items-start gap-2">
                    <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
