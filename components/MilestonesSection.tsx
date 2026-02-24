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
    year: '1年目',
    emoji: '🏃',
    title: 'ダイエット -15kg',
    description: '食事管理と運動習慣を徹底し、1年間で15kgの減量に成功。',
  },
  {
    year: '2年目',
    emoji: '🏋️',
    title: 'ベンチプレス 100kg × 3回',
    description: 'トレーニング理論を学び、段階的に重量を伸ばして目標を達成。',
  },
  {
    year: '3年目',
    emoji: '🎯',
    title: 'ダーツ プロライセンス取得',
    description: 'データ分析と反復練習でスキルを磨き、プロ試験に合格。',
  },
  {
    year: '4年目',
    emoji: '🚀',
    title: 'SESから独立（フリーランス）',
    description: '実務経験を積みながら準備を進め、フリーランスとして独立。',
  },
  {
    year: '5年目',
    emoji: '💰',
    title: '本業以外で継続収益を生む',
    description:
      'AIで誰でもサービスを作れる時代だからこそ、アイデアと実行力で差をつける。個人開発プロダクトから1円でも継続的な収益を生み出す。',
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
