const STATS = [
  { value: '55,000+', label: '行（TypeScript）' },
  { value: '164', label: 'テスト' },
  { value: '500万+', label: '担当サービス会員' },
];

export default function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <p className="text-accent text-sm font-mono mb-3 tracking-widest uppercase">
          フルスタックエンジニア — リモート
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
          コードの先に、
          <br />
          <span className="text-accent">信頼がある。</span>
        </h1>
        <p className="text-muted text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          フロントからインフラまで一人で作り切る25歳。
          <br className="hidden sm:block" />
          年数ではなく、出せるアウトプットで証明します。
        </p>

        {/* At a Glance */}
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-xl mx-auto">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-3 rounded-xl bg-card/60 backdrop-blur-sm border border-border"
            >
              <div className="text-lg font-bold text-accent">{s.value}</div>
              <div className="text-[10px] text-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#personal"
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-colors"
          >
            個人開発を見る
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-border hover:border-muted rounded-lg font-medium transition-colors"
          >
            お問い合わせ
          </a>
        </div>
      </div>
    </section>
  );
}
