import Image from 'next/image';
import SectionHeading from './SectionHeading';

const STRENGTHS = [
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: '市場を読む',
    description:
      'フリーランス求人300件以上を分析し、今求められている技術を特定。個人開発でキャッチアップすることで、常に市場価値のあるスキルセットを維持。',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'AI時代に適応する',
    description:
      'Claude Code を活用したAI駆動開発を実践。生成コードをブラックボックスにせず実装意図を理解した上でマージし、設計ドキュメントもAIと協働で整備。',
  },
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '「動く」で終わらせない',
    description:
      '個人開発でもCI/CD・125+テスト・設計書・セキュリティレビューを整備。保守性と品質を妥協しないコードを書く。',
  },
  {
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    title: '疑問を放置しない',
    description:
      '仕様の曖昧な箇所をそのままにできない性格。フルリモートの大規模PJでも進捗報告を密にし、タスク分割・PRの規模を最適化してレビュワーの負担を軽減。幅広い年齢層との対面コミュニケーションにも抵抗がなく、認識齟齬を防いで手戻りの少ない開発を実現。',
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="about" label="About" title="自己紹介" />

        <div className="grid md:grid-cols-[120px_1fr] gap-6 mb-10">
          {/* プロフィール画像 */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/avatar.jpg"
              alt="プロフィール写真"
              width={120}
              height={120}
              className="w-[120px] h-[120px] rounded-2xl bg-card border border-border object-cover object-top"
            />
          </div>

          {/* 自己紹介テキスト */}
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              25歳・実務4年目のフルスタックエンジニア。
              TypeScript / React / Next.js を軸に、認証・決済・DB設計・インフラまで
              <strong>企画から運用を一人で完遂</strong>できることが最大の強みです。
              実務はすべてフルリモートで参画しており、非同期コミュニケーションとPR駆動の開発に慣れています。
            </p>

            {/* 経歴ストーリー */}
            <div className="space-y-3 text-muted leading-relaxed">
              <p>
                専門学校ではJava・SQL・ネットワークなどシステム開発の基礎を3年間体系的に学習し、
                基本情報技術者試験に在学中に合格。
                SES企業に新卒入社後、国内最大手の電子新聞サイト（登録会員500万人超）に
                約2年9ヶ月参画。スクラムベースのアジャイル開発で週次スプリントの設計・実装・コードレビューを経験。
                ワールドカップや選挙などの特設ページを自分主体で実装し、
                既存コードを参考にできない状態での社内報ページ新規構築も担当しました。
                またDependabotのライブラリ更新PR（週次約15件）のリリースノート精査・マージ判断を主導。
              </p>
              <p>
                続く大手鉄道会社のID統合サービスでは、詳細設計から保守運用までを担当。
                しかしSES勤務を通じて
                <strong className="text-foreground">「自分で関われるプロダクトや伸ばしたいスキルの経験を積める現場を選べない」</strong>
                ことに危機感を感じ、フリーランスとして独立しました。
              </p>
              <p>
                独立後は大手自動車メーカーの障害情報管理サービスにSEとして要件定義から全工程に参画する傍ら、
                求人市場300件以上を分析して市場に求められる技術を特定。
                AI駆動開発（Claude Code）を取り入れた個人開発で実践的にキャッチアップし、
                darts Lab を3ヶ月で企画から運用まで一人で構築しました。
                「まず作りたいものを形にし、実装を通してリバースエンジニアリング的に技術の深い理解を得る」
                という進め方で、2作目のMonkModeではSupabase + PostgreSQL + オフラインファースト設計と技術領域を意図的に広げています。
              </p>
            </div>

            {/* キーファクト */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {[
                { value: '4年目', label: '実務経験' },
                { value: '500万+', label: '担当サービス会員数' },
                { value: 'アジャイル', label: '開発手法' },
                { value: '300件+', label: '求人分析数' },
              ].map((fact) => (
                <div key={fact.label} className="text-center p-4 rounded-xl bg-card border border-border">
                  <div className="text-xl font-bold text-accent">{fact.value}</div>
                  <div className="text-xs text-muted mt-1">{fact.label}</div>
                </div>
              ))}
            </div>

            {/* 資格 */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['基本情報技術者試験', 'LinuC レベル1', '日商簿記3級'].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 text-xs rounded-full bg-card border border-border text-muted"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* パーソナリティ */}
            <div className="p-4 rounded-xl bg-card border border-border mt-2">
              <p className="text-xs text-accent font-medium mb-2">パーソナリティ</p>
              <div className="flex items-start gap-4">
                {/* アバター */}
                <div className="shrink-0 flex gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.16personalities.com/static/images/personality-types/avatars/entj-commander.png"
                    alt="ENTJ Commander"
                    width={80}
                    height={80}
                    className="rounded-xl bg-[#88619a]/10"
                    loading="lazy"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.16personalities.com/static/images/personality-types/avatars/intj-architect.png"
                    alt="INTJ Architect"
                    width={80}
                    height={80}
                    className="rounded-xl bg-[#88619a]/10"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 text-xs font-bold rounded bg-accent/10 text-accent border border-accent/20">
                      ENTJ / INTJ
                    </span>
                    <span className="text-xs text-muted">— 外向と内向のほぼ中間</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    仕組みの全体像を把握してから手を動かしたい設計志向と、「決めたら即行動」の推進力が同居するタイプ。曖昧な仕様を放置できず、認識齟齬を潰してからコードを書く性格はエンジニアの適性そのものだと感じています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4つの強み */}
        <div className="grid sm:grid-cols-2 gap-4">
          {STRENGTHS.map((s) => (
            <div
              key={s.title}
              className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
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
                    <path d={s.icon} />
                  </svg>
                </div>
                <h4 className="font-bold">{s.title}</h4>
              </div>
              <p className="text-sm text-muted leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
