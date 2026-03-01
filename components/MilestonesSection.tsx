import SectionHeading from './SectionHeading';

interface MilestoneItem {
  year: string;
  emoji: string;
  title: string;
  description: string;
  current?: boolean;
}

const MILESTONES: MilestoneItem[] = [
  {
    year: '2021',
    emoji: '🏃',
    title: '食事管理で -15kg 減量',
    description:
      '自炊の練習から始め、徹底した食事管理と運動習慣で1年間で15kgの減量に成功。体重・食事・運動を記録して変数を絞り込む習慣がここで身についた。',
  },
  {
    year: '2022',
    emoji: '🏋️',
    title: 'ベンチプレス 100kg 達成',
    description:
      '週5でジム通いを継続。調理が楽で飽きない筋肉レシピを開拓し、食事管理と両立できる仕組みを作ることで習慣化に成功。「続けられる形に落とし込む」という発想はここが原点。',
  },
  {
    year: '2023',
    emoji: '🎯',
    title: 'ダーツ プロライセンス取得 & スポンサー獲得',
    description:
      '最初は筋トレと両立しながら土日にダーツ。プロを意識してからは週5でダーツに切り替え、さまざまな店舗に足を運びプロ選手からアドバイスを受けながらトライ&エラーを繰り返した。開始1年未満でプロ試験合格・スポンサー獲得し、2年でフレンド1,000人突破（1日1人以上のペース）。SNS運用や幅広い層とのコミュニケーションも経験し、プレイヤーとして感じた既存アプリの不満が darts Lab の開発動機に。',
  },
  {
    year: '2024',
    emoji: '🚀',
    title: 'データドリブンで独立判断',
    description:
      '求人300件以上を技術スタック・単価・リモート可否で定量分析し、感覚ではなくデータで独立を判断。実務経験を積みながら準備を進め、フリーランスとして独立。',
  },
  {
    year: '2025',
    emoji: '💰',
    title: 'コードで収益を生む仕組みづくり',
    description:
      'AIで誰でもサービスを作れる時代だからこそ、アイデアと実行力で差をつける。darts Lab のアフィリエイト基盤（6店舗連携）とSaaSモデルで、コードが収益を生む仕組みを構築中。',
    current: true,
  },
];

export default function MilestonesSection() {
  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading id="milestones" label="Milestones" title="年次目標と達成実績" />

        <p className="text-sm text-muted -mt-4 mb-6 leading-relaxed">
          毎年ひとつテーマを決め、1年かけてやり抜く。
          <br className="hidden sm:block" />
          技術だけでなく、目標設定と継続力を大切にしています。
        </p>

        <div className="relative pl-8">
          {/* タイムライン */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-5">
            {MILESTONES.map((item, i) => (
              <div key={i} className="relative">
                {/* ドット */}
                <div
                  className={`absolute -left-5 w-2.5 h-2.5 rounded-full border-2 border-background mt-1.5 z-10 ${
                    item.current ? 'bg-accent animate-pulse' : 'bg-accent'
                  }`}
                />

                <div
                  className={`p-4 rounded-xl border ${
                    item.current
                      ? 'bg-accent/5 border-accent/30'
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-accent font-mono">{item.year}</span>
                    {item.current && (
                      <span className="px-1.5 py-px text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
                        now
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm mt-1">
                    {item.emoji} {item.title}
                  </h4>
                  <p className="text-xs text-muted mt-1.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted mt-6 text-center">
          「決めたらやり切る」——この行動力がエンジニアとしての土台になっています。
        </p>
      </div>
    </section>
  );
}
