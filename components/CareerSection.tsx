import SectionHeading from './SectionHeading';

interface CareerItem {
  period: string;
  project: string;
  role: string;
  scope: string;
  tech: string;
  highlights: string[];
  method?: string;
  scale?: string;
  icon: string;
  minor?: boolean;
}

const CAREER: CareerItem[] = [
  {
    period: '2025/10 〜 2026/1',
    project: '大手自動車メーカー 障害情報管理サービス',
    role: 'SE',
    scope: '要件定義〜保守運用（全工程）',
    tech: 'Next.js / React / TypeScript / Node.js',
    method: 'ウォーターフォール / 週3リモート・週2客先',
    scale: '4ヶ月',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    highlights: [
      '要件定義からテスト・運用まで全工程を一人で担当し、上流〜下流の一気通貫を実証',
      'クライアントとの要件調整・仕様折衝を直接担当',
      '障害情報の一元管理フローを設計し、対応時間の短縮に貢献',
      'フリーランスとして初の上流工程経験 — 独立後の自走力を証明',
    ],
  },
  {
    period: '2025/4 〜 2025/9',
    project: '大手鉄道会社 ID統合サービス',
    role: 'メンバー',
    scope: '詳細設計〜保守運用',
    tech: 'TypeScript / Python / Java / AWS Lambda / MySQL',
    method: 'ウォーターフォール / フル出社',
    scale: '6ヶ月',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    highlights: [
      'グループ各社のID基盤を統合するプロジェクトで、詳細設計・運用保守・負荷テストを担当',
      'TypeScript / Python / Java のマルチ言語環境で AWS Lambda + MySQL を活用',
      'この現場を最後にSESから独立を決意',
    ],
  },
  {
    period: '2022/7 〜 2025/3',
    project: '国内最大手電子新聞サイト エンハンス開発',
    role: 'メンバー',
    scope: '詳細設計〜保守運用',
    tech: 'Next.js / React / TypeScript / AWS / DynamoDB / Fastly',
    method: 'スクラム（アジャイル）/ フルリモート',
    scale: '2年9ヶ月 / 会員500万人超',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    highlights: [
      '登録会員500万人超の大規模サービスでフロントエンド開発',
      'ワールドカップ・選挙など特設ページを自分主体で設計・実装・コードレビュー',
      '既存コードを参考にできない社内報ページを新規構築',
      '要員入れ替えの多いPJで新規参画者の環境構築・技術面のサポートを担当',
      'Dependabot PR（週次約15件）のリリースノート精査・マージ判断を主導',
      'フルリモートで進捗を密に報告、タスク分割・PRの規模を最適化してレビュワーの負担を軽減',
    ],
  },
  {
    period: '2022/5 〜 2022/6',
    project: '備品管理システム（新人研修）',
    role: 'リーダー',
    scope: '要件定義〜テスト',
    tech: 'Java / MySQL',
    scale: '2ヶ月',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    highlights: ['チームリーダーとして要件定義からテストまで推進'],
    minor: true,
  },
];

export default function CareerSection() {
  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading id="work" label="Work Experience" title="実務経歴" />

        <div className="flex flex-wrap items-center gap-3 -mt-4 mb-8">
          <span className="px-3 py-1.5 text-xs rounded-lg bg-accent/10 text-accent border border-accent/20 font-bold">
            3年9ヶ月
          </span>
          <span className="text-sm text-muted">2022/5 〜 2026/1</span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
            全工程経験済み
          </span>
        </div>

        <div className="relative pl-10">
          {/* タイムライン */}
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-border to-border" />

          <div className="space-y-6">
            {CAREER.filter((item) => !item.minor).map((item, i) => (
              <div key={i} className="relative group">
                {/* アイコンドット */}
                <div className="absolute -left-10 w-9 h-9 rounded-lg bg-card border border-border group-hover:border-accent/40 flex items-center justify-center transition-colors z-10">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent"
                  >
                    <path d={item.icon} />
                  </svg>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                    <h4 className="font-bold text-sm">{item.project}</h4>
                    <span className="text-xs text-accent font-mono bg-accent/5 px-2 py-0.5 rounded">
                      {item.period}
                    </span>
                    {item.scale && (
                      <span className="text-[10px] text-muted bg-background px-2 py-0.5 rounded border border-border">
                        {item.scale}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="px-2 py-0.5 text-[11px] rounded-md bg-foreground/10 text-foreground font-medium border border-border">
                      {item.role}
                    </span>
                    <span className="text-[11px] text-muted">{item.scope}</span>
                    {item.method &&
                      item.method.split(' / ').map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 text-[11px] rounded-md bg-accent/10 text-accent border border-accent/20 font-medium"
                        >
                          {m}
                        </span>
                      ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tech.split(' / ').map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded bg-background text-muted border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-1">
                    {item.highlights.map((h) => (
                      <li key={h} className="text-xs text-muted flex items-start gap-2">
                        <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* minor項目（コンパクト表示） */}
            {CAREER.filter((item) => item.minor).map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-10 w-9 h-9 rounded-lg bg-card border border-border/60 flex items-center justify-center z-10">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted"
                  >
                    <path d={item.icon} />
                  </svg>
                </div>
                <div className="py-3 px-4 rounded-lg border border-border/60 bg-card/50 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-muted">{item.project}</span>
                  <span className="text-xs text-accent/70 font-mono">{item.period}</span>
                  <span className="text-[11px] text-muted">{item.role} / {item.scope}</span>
                  {item.tech.split(' / ').map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded bg-background text-muted/70 border border-border/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
