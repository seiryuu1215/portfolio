import Image from 'next/image';
import SectionHeading from './SectionHeading';

interface Strength {
  icon: string;
  title: string;
  summary: string;
  work: string;
  personal: string;
}

const STRENGTHS: Strength[] = [
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: '市場を読む',
    summary: '求人300件以上を技術スタック・単価・リモート可否で定量分析し、需要のある技術を特定。',
    work: '独立前から市場調査を習慣化。自動車メーカー案件では上流〜下流の一気通貫経験を獲得し、フルスタックとしての市場価値を実証。',
    personal:
      '分析で見つけた不足スキルを個人開発のテーマに組み込み実践的にキャッチアップ。darts Lab（Firebase + Stripe）→ MonkMode（Supabase + PostgreSQL）と意図的に技術領域を広げている。',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'AI時代に適応する',
    summary: '「AIを道具として使いこなせるエンジニア」が今後の差別化と考え、全フェーズで活用。',
    work: '実務での設計書作成やコードレビュー時にAIで叩き台を生成し、チームへの提案スピードを向上。ただし最終判断は自分の目で行い、品質を担保。',
    personal:
      'Claude Code で設計〜実装〜テスト〜リファクタリングまでAI協働開発を実践。生成コードをブラックボックスにせず、実装意図とエッジケースを自分で検証してからマージする。',
  },
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '「動く」で終わらせない',
    summary: '一人でも省略せず、チーム開発にそのまま持ち込めるコード品質を常に維持する。',
    work: '電子新聞PJではDependabot PR（週次約15件）のリリースノート精査・マージ判断を主導。CircleCI / GitHub Actions によるCI/CDパイプラインの運用・改善にも関与。',
    personal:
      'lint → format → test → build の4段階CIゲートを構築し、全パスしないとマージしない運用を徹底。Vitest 164テスト、Storybook 16ストーリー、設計書10本、Sentryエラー監視を整備。自主セキュリティレビューでCRITICAL含む11件の脆弱性を修正。',
  },
  {
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    title: '疑問を放置しない',
    summary:
      '仕様の曖昧な箇所をそのままにコードを書き始められない性格。「聞きすぎるくらいがちょうどいい」がスタンス。',
    work: '電子新聞PJ（500万会員超・フルリモート）では判断に迷った点を即日エスカレーションし、認識齟齬による手戻りをゼロに近づけた。PRは1機能1PRを徹底し差分を小さく保つことでレビュワーの負荷を軽減。20代〜50代の幅広い年齢層と協働し、技術的な議論だけでなくビジネス要件のすり合わせにも対応。',
    personal:
      '個人開発でも要件定義書から着手し、実装前に仕様の曖昧さを潰してから開発に入る。設計段階でAIとレビューし合うことで、一人開発でも「第三者の目」を常に確保している。',
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
                darts Lab を3ヶ月で企画から運用まで一人で構築。現在も継続的に改修を重ね、53,000行超・220コミットの規模に成長しています。
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
              <p className="text-sm text-muted leading-relaxed mb-3">{s.summary}</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    実務
                  </span>
                  <p className="text-xs text-muted leading-relaxed">{s.work}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded bg-green-500/10 text-green-400 border border-green-500/20">
                    個人
                  </span>
                  <p className="text-xs text-muted leading-relaxed">{s.personal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
