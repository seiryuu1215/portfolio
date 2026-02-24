import SectionHeading from './SectionHeading';

interface CareerItem {
  period: string;
  project: string;
  role: string;
  scope: string;
  tech: string;
  highlights: string[];
  method?: string;
}

const CAREER: CareerItem[] = [
  {
    period: '2025/10 〜 2026/1',
    project: '大手自動車メーカー 障害情報管理サービス',
    role: 'SE',
    scope: '要件定義〜保守運用（全工程）',
    tech: 'Next.js / React / TypeScript / Node.js',
    method: 'ウォーターフォール / 週3リモート・週2客先',
    highlights: [
      '要件定義からテスト・運用まで全工程を担当',
      'フリーランスとして初の上流工程経験',
    ],
  },
  {
    period: '2025/4 〜 2025/9',
    project: '大手鉄道会社 ID統合サービス',
    role: 'メンバー',
    scope: '詳細設計〜保守運用',
    tech: 'TypeScript / Python / Java / AWS Lambda / MySQL',
    method: 'ウォーターフォール / フル出社',
    highlights: [
      '運用保守・負荷テストを中心に担当',
      'この現場を最後にSESから独立を決意',
    ],
  },
  {
    period: '2022/7 〜 2025/3',
    project: '国内最大手電子新聞サイト エンハンス開発',
    role: 'メンバー',
    scope: '詳細設計〜保守運用（約2年9ヶ月）',
    tech: 'Next.js / React / TypeScript / AWS / DynamoDB / Fastly',
    method: 'スクラム（アジャイル）/ フルリモート',
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
    project: '備品管理システム（研修）',
    role: 'リーダー',
    scope: '要件定義〜テスト',
    tech: 'Java / MySQL',
    highlights: ['チームリーダーとして要件定義からテストまで推進'],
  },
];

export default function CareerSection() {
  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading id="work" label="Work Experience" title="実務経歴" />

        <p className="text-sm text-muted -mt-4 mb-6">
          実務経験 <strong className="text-foreground">3年9ヶ月</strong>（2022/5 〜 2026/1）
        </p>

        <div className="relative pl-8">
          {/* タイムライン */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-5">
            {CAREER.map((item, i) => (
              <div key={i} className="relative">
                {/* ドット */}
                <div className="absolute -left-5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-background mt-1.5 z-10" />

                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                    <h4 className="font-bold text-sm">{item.project}</h4>
                    <span className="text-xs text-accent font-mono">{item.period}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 text-[11px] rounded bg-background border border-border">
                      {item.role}
                    </span>
                    <span className="text-[11px] text-muted">{item.scope}</span>
                    {item.method &&
                      item.method.split(' / ').map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 text-[11px] rounded bg-accent/10 text-accent border border-accent/20"
                        >
                          {m}
                        </span>
                      ))}
                  </div>

                  <p className="text-[11px] text-muted mb-2">{item.tech}</p>

                  <ul className="space-y-0.5">
                    {item.highlights.map((h) => (
                      <li key={h} className="text-xs text-muted flex items-start gap-1.5">
                        <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
