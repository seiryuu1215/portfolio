import SectionHeading from './SectionHeading';

function getAvailabilityLabel(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  return `${month}月〜 / 即日可`;
}

export default function ContactSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading id="contact" label="Contact" title="お問い合わせ" />

        <p className="text-muted leading-relaxed mb-4">
          お仕事のご相談、技術的なご質問など、お気軽にご連絡ください。
        </p>

        <div className="flex justify-center gap-3 mb-4 text-xs flex-wrap">
          <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-muted">
            稼働開始: <strong className="text-foreground">{getAvailabilityLabel()}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-muted">
            稼働形態: <strong className="text-foreground">フルリモート</strong>
          </span>
        </div>

        {/* リモートワーク実績 */}
        <div className="inline-flex flex-wrap justify-center gap-2 mb-6 text-[11px] text-muted">
          {[
            'Slack / Teams 非同期コミュニケーション',
            'PR駆動開発・日次進捗共有',
            'スクラム（週次スプリント）',
            'フルリモートを中心に参画',
          ].map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-card border border-border">
              {tag}
            </span>
          ))}
        </div>

        {/* メール */}
        <div>
          <a
            href="mailto:mt.oikawa@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors text-lg"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            メールで連絡する
          </a>
        </div>

        {/* SNS リンク */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://github.com/seiryuu1215"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://x.com/seiryuu_1215"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="X (Twitter)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
