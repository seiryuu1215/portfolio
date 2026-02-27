import SectionHeading from './SectionHeading';

interface ToolCategory {
  title: string;
  icon: string;
  tools: { name: string; note?: string }[];
}

const CATEGORIES: ToolCategory[] = [
  {
    title: '言語 / フレームワーク',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    tools: [
      { name: 'TypeScript', note: '実務+個人開発' },
      { name: 'React / Next.js', note: 'メイン' },
      { name: 'Node.js' },
      { name: 'Python', note: '実務' },
      { name: 'Java', note: '実務' },
      { name: 'SQL', note: 'MySQL / PostgreSQL' },
    ],
  },
  {
    title: '開発環境',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    tools: [
      { name: 'VS Code', note: 'メインエディタ' },
      { name: 'Claude Code', note: 'AIペアプログラミング' },
      { name: 'Cursor', note: 'AI補完エディタ' },
      { name: 'iTerm2 + zsh' },
      { name: 'Docker' },
    ],
  },
  {
    title: 'バージョン管理 / CI',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    tools: [
      { name: 'Git / GitHub' },
      { name: 'GitHub Actions', note: 'CI/CD' },
      { name: 'Vercel', note: 'デプロイ' },
      { name: 'Dependabot', note: '依存管理' },
    ],
  },
  {
    title: 'デザイン / テスト',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    tools: [
      { name: 'Storybook', note: 'UIカタログ・16 stories' },
      { name: 'Vitest', note: 'ユニットテスト・164 tests' },
      { name: 'Figma', note: 'デザイン参照' },
      { name: 'Sentry', note: 'エラー監視' },
    ],
  },
  {
    title: 'コミュニケーション',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    tools: [
      { name: 'Slack / Teams', note: '非同期コミュニケーション' },
      { name: 'Backlog / Jira', note: 'タスク管理' },
      { name: 'Notion', note: 'ドキュメント' },
      { name: 'Google Meet / Zoom', note: 'ミーティング' },
    ],
  },
];

export default function ToolsSection() {
  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeading id="tools" label="Tools" title="開発環境・ツール" />

        <div className="grid sm:grid-cols-2 gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
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
                    <path d={cat.icon} />
                  </svg>
                </div>
                <h4 className="font-bold text-sm">{cat.title}</h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span
                    key={tool.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-background border border-border hover:border-accent/20 transition-colors"
                  >
                    <span className="text-foreground font-medium">{tool.name}</span>
                    {tool.note && <span className="text-[10px] text-muted">({tool.note})</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
