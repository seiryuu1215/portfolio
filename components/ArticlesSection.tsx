import SectionHeading from './SectionHeading';

interface Article {
  title: string;
  platform: string;
  url: string;
  tags: string[];
}

// 記事を追加する場合はここに追加。空配列ならセクション非表示。
const ARTICLES: Article[] = [];

export default function ArticlesSection() {
  // 記事がない場合は非表示
  if (ARTICLES.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="articles" label="Articles" title="技術記事" />

        <div className="space-y-4">
          {ARTICLES.map((article) => (
            <a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium group-hover:text-accent transition-colors">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted">{article.platform}</span>
                    <div className="flex gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted group-hover:text-accent shrink-0 transition-colors"
                >
                  <path d="M7 17l9.2-9.2M17 17V8H8" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
