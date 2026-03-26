import SectionHeading from './SectionHeading';

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
            稼働開始: <strong className="text-foreground">即日〜相談可能</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-muted">
            稼働形態: <strong className="text-foreground">原則フルリモート</strong>
          </span>
        </div>

        {/* リモートワーク実績 */}
        <div className="inline-flex flex-wrap justify-center gap-2 mb-6 text-[11px] text-muted">
          {[
            'Slack / Teams 非同期コミュニケーション',
            'PR駆動開発・日次進捗共有',
            'スクラム（週次スプリント）',
            '原則フルリモート（週2出社可）',
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
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-all duration-300 text-base sm:text-lg hover:shadow-glow-strong"
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

        {/* スキルシート */}
        <div className="mt-6">
          <a
            href="/スキルシート_及川.xlsx"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border hover:bg-muted rounded-xl font-medium transition-colors text-foreground"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            スキルシートをダウンロード
          </a>
          <p className="text-xs text-muted mt-2">更新日: 2026/3/2</p>
        </div>

        {/* SNS リンク */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://github.com/seiryuu1215"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground hover:scale-110 transition-transform duration-200"
            aria-label="GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://x.com/seiryuu_darts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground hover:scale-110 transition-transform duration-200"
            aria-label="X (Twitter)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://zenn.dev/seiryuuu_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground hover:scale-110 transition-transform duration-200"
            aria-label="Zenn"
          >
            <svg width="24" height="24" viewBox="0 0 88 88" fill="currentColor">
              <path d="M2.8 83.5h17.6c1 0 1.9-.5 2.5-1.3L69.6 5.2c.5-.8-.1-1.7-1-1.7H52.5c-.7 0-1.4.4-1.8 1L3.3 81.8c-.4.7.1 1.7 1 1.7h-1.5zM61 83.5h15.3c.7 0 1.3-.4 1.7-1L88 66.2c.5-.8-.1-1.8-1-1.8H71.8c-.7 0-1.3.4-1.7 1L60 82.1c-.4.7.1 1.4 1 1.4z" />
            </svg>
          </a>
          <a
            href="https://note.com/seiryuu_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground hover:scale-110 transition-transform duration-200"
            aria-label="note"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM17 14.25H7v-1.5h10v1.5zm0-3.5H7v-1.5h10v1.5z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
