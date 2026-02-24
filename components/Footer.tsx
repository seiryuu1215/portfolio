export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Seiryuu. Built with Next.js &amp; Tailwind CSS.
        </p>
        <p className="text-xs text-muted mt-1">Last updated: 2026/2/24</p>
      </div>
    </footer>
  );
}
