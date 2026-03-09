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
              フルスタックエンジニア。 TypeScript / React / Next.js
              を軸に、型安全性・保守性・可読性を意識した設計・実装を強みとしています。
              認証・決済・DB設計・インフラまで
              <strong>企画から運用を一人で完遂</strong>
              でき、ウォーターフォール・アジャイル双方の開発経験があります。
              フルリモートを基本に、週2日までの出社にも対応。非同期コミュニケーションとPR駆動の開発に慣れています。
            </p>

            {/* 行動パターン — 職業的強みとしての接続 */}
            <div className="text-muted leading-relaxed space-y-3">
              <p>
                どんな領域でも「ボトルネックを見つけ、基礎を固め、仕組みにして、続けられる形に落とす」ことで成果を出してきました。
                ダーツでは既存アプリの限界をプレイヤーとして特定し、エンジニアとして自ら解決策を構築。
                開始1年未満でプロライセンスを取得した過程で培った「課題発見→データ分析→改善サイクル」は、そのままプロダクト開発のアプローチに直結しています。
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

            {/* アウトプット実績 */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-accent font-medium mb-2">アウトプット習慣</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="shrink-0 mt-0.5 text-muted"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <div>
                    <span className="text-sm font-bold">1,700+ フォロワー</span>
                    <p className="text-[11px] text-muted leading-snug mt-0.5">
                      プロ活動・ダーツの疑問発信・スポンサー店舗の宣伝を2年間継続
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 88 88"
                    fill="currentColor"
                    className="shrink-0 mt-0.5 text-muted"
                  >
                    <path d="M2.8 83.5h17.6c1 0 1.9-.5 2.5-1.3L69.6 5.2c.5-.8-.1-1.7-1-1.7H52.5c-.7 0-1.4.4-1.8 1L3.3 81.8c-.4.7.1 1.7 1 1.7h-1.5zM61 83.5h15.3c.7 0 1.3-.4 1.7-1L88 66.2c.5-.8-.1-1.8-1-1.8H71.8c-.7 0-1.3.4-1.7 1L60 82.1c-.4.7.1 1.4 1 1.4z" />
                  </svg>
                  <div>
                    <span className="text-sm font-bold">技術記事 14本 + Book 1冊</span>
                    <p className="text-[11px] text-muted leading-snug mt-0.5">
                      Zennで開発知見を体系的に発信
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* パーソナリティ */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-accent font-medium mb-2">パーソナリティ</p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* アバター */}
                <div className="shrink-0 flex gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.16personalities.com/static/images/personality-types/avatars/entj-commander.png"
                    alt="ENTJ Commander"
                    width={80}
                    height={80}
                    className="rounded-xl bg-[#88619a]/10 w-16 h-16 sm:w-20 sm:h-20 brightness-[.85]"
                    loading="lazy"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://www.16personalities.com/static/images/personality-types/avatars/intj-architect.png"
                    alt="INTJ Architect"
                    width={80}
                    height={80}
                    className="rounded-xl bg-[#88619a]/10 w-16 h-16 sm:w-20 sm:h-20 brightness-[.85]"
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
            {/* 稼働条件 */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-accent font-medium mb-2">稼働条件</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-0.5 text-xs rounded-md bg-accent/10 text-accent border border-accent/20 font-medium">
                  即日〜相談可能
                </span>
                <span className="px-2 py-0.5 text-xs rounded-md bg-accent/10 text-accent border border-accent/20 font-medium">
                  業務委託（準委任）
                </span>
                <span className="px-2 py-0.5 text-xs rounded-md bg-accent/10 text-accent border border-accent/20 font-medium">
                  リモート / 週2出社可（関東圏）
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                プロダクトの面白さと自身の成長を重視。
                技術で事業課題を解くチームに貢献したいと考えています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
