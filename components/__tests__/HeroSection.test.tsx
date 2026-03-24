import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  it('renders main heading', () => {
    render(<HeroSection />);
    expect(screen.getByText('コードの先に、')).toBeInTheDocument();
    expect(screen.getByText('信頼がある。')).toBeInTheDocument();
  });

  it('renders role description', () => {
    render(<HeroSection />);
    expect(screen.getByText(/フルスタックエンジニア/)).toBeInTheDocument();
  });

  it('renders all stat cards', () => {
    render(<HeroSection />);
    expect(screen.getByText('実務4年目')).toBeInTheDocument();
    expect(screen.getByText('500万人')).toBeInTheDocument();
    expect(screen.getByText('全工程')).toBeInTheDocument();
  });

  it('renders CTA links with correct hrefs', () => {
    render(<HeroSection />);
    const worksLink = screen.getByText('実績を見る');
    expect(worksLink.closest('a')).toHaveAttribute('href', '#work');
    const contactLink = screen.getByText('お問い合わせ');
    expect(contactLink.closest('a')).toHaveAttribute('href', '#contact');
  });
});
