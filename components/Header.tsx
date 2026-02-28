'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#personal', label: '個人開発' },
  { href: '#work', label: '実務' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isSubpage = pathname !== '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={isSubpage ? '/' : '#'} className="text-lg font-bold tracking-tight">
          Seiryuu <span className="text-muted font-normal text-sm">Portfolio</span>
        </a>

        {isSubpage ? (
          <a
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            ポートフォリオに戻る
          </a>
        ) : (
          <>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-muted hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="メニュー"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Mobile menu - top page only */}
      {!isSubpage && mobileOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-3 text-sm text-muted hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
