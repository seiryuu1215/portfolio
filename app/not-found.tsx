import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-xl font-semibold text-foreground mb-2">ページが見つかりません</h2>
      <p className="text-muted text-sm mb-8">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
