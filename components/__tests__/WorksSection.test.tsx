import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorksSection from '../WorksSection';

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, ...props }: { children: React.ReactNode; href: string }) => (
    <a {...props}>{children}</a>
  ),
}));

describe('WorksSection', () => {
  it('renders section heading', () => {
    render(<WorksSection />);
    // The heading text is "個人開発" (not "個人開発プロジェクト")
    const headings = screen.getAllByText('個人開発');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders darts Lab project', () => {
    render(<WorksSection />);
    expect(screen.getByText('darts Lab')).toBeInTheDocument();
  });

  it('renders scale values for darts Lab', () => {
    render(<WorksSection />);
    // "632" appears multiple times - check at least one exists
    const testCounts = screen.getAllByText('632');
    expect(testCounts.length).toBeGreaterThanOrEqual(1);
  });

  it('renders tech stack chips', () => {
    render(<WorksSection />);
    // Multiple sections may have "TypeScript", so check exists
    const tsChips = screen.getAllByText('TypeScript');
    expect(tsChips.length).toBeGreaterThanOrEqual(1);
  });
});
