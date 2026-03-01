import Image from 'next/image';
import SectionHeading from './SectionHeading';

export default function AboutSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="about" label="About" title="自己紹介" />

        <div className="grid md:grid-cols-[120px_1fr] gap-6">
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
              25歳のフルスタックエンジニア。
              TypeScript / React / Next.js を軸に、型安全性・保守性・可読性を意識した設計・実装を強みとしています。
              認証・決済・DB設計・インフラまで
              <strong>企画から運用を一人で完遂</strong>でき、ウォーターフォール・アジャイル双方の開発経験があります。
              実務は大半をフルリモートで参画しており、非同期コミュニケーションとPR駆動の開発に慣れています。
            </p>

            {/* 行動パターン — 職業的強みとしての接続 */}
            <div className="text-muted leading-relaxed space-y-3">
              <p>
                どんな領域でも「ボトルネックを見つけ、基礎を固め、仕組みにして、続けられる形に落とす」ことで成果を出してきました。
                ダーツでは既存アプリの限界をプレイヤーとして特定し、エンジニアとして自ら解決策を構築。
                開始1年未満でプロライセンスを取得する過程で培った「課題発見→データ分析→改善サイクル」は、そのままプロダクト開発のアプローチに直結しています。
              </p>
              <p>
                実務でもこの動き方は一貫しています。
                チーム全体の進捗やレビュー待ちなどのボトルネックを常に意識し、タスクの分割・再調整やメンバーのフォローを主体的に実施。
                新規参画者へのペアプログラミングやオンボーディング整備でチームの立ち上がり速度を改善してきました。
                顧客との仕様調整では要件の背景や意図を正確に理解し、代替案を含めた実装方針を提案。
                スピード感と品質のバランスを重視した納期管理を得意としています。
              </p>
            </div>

            {/* 資格 */}
            <div className="flex flex-wrap gap-2">
              {['基本情報技術者試験', 'LinuC レベル1', '日商簿記3級'].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 text-xs rounded-lg bg-accent/10 text-accent border border-accent/20 font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* パーソナリティ */}
            <div className="p-4 rounded-xl bg-card border border-border">
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
      </div>
    </section>
  );
}
