import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';

vi.mock('next/image', () => ({
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, ...props }: { children: React.ReactNode; href: string }) => (
    <a {...props}>{children}</a>
  ),
}));

vi.mock('@/components/FadeIn', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Home page integration', () => {
  it('renders HeroSection', () => {
    render(<Home />);
    expect(screen.getByText('信頼がある。')).toBeInTheDocument();
  });

  it('renders all major sections', () => {
    render(<Home />);
    expect(screen.getByText('自己紹介')).toBeInTheDocument();
    expect(screen.getByText('技術スタック')).toBeInTheDocument();
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'お問い合わせ' })).toBeInTheDocument();
  });

  it('renders Footer', () => {
    render(<Home />);
    expect(screen.getByText(/© \d{4} Seiryuu/)).toBeInTheDocument();
  });
});
