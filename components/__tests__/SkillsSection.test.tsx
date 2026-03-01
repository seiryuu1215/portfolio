import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SkillsSection from '../SkillsSection';

describe('SkillsSection', () => {
  it('renders section heading', () => {
    render(<SkillsSection />);
    expect(screen.getByText('技術スタック')).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(<SkillsSection />);
    expect(screen.getByRole('button', { name: 'すべて' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '実務経験あり' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '個人開発' })).toBeInTheDocument();
  });

  it('renders skill categories', () => {
    render(<SkillsSection />);
    expect(screen.getByText('対応可能な業務')).toBeInTheDocument();
    expect(screen.getByText('フルスタック開発')).toBeInTheDocument();
  });

  it('renders featured A/B level skills', () => {
    render(<SkillsSection />);
    // Skills appear both in featured grid and detail section, so use getAllByText
    const ts = screen.getAllByText('TypeScript 5 (strict)');
    expect(ts.length).toBeGreaterThanOrEqual(1);
    const react = screen.getAllByText('React 19');
    expect(react.length).toBeGreaterThanOrEqual(1);
  });

  it('filters skills by source when filter button is clicked', () => {
    render(<SkillsSection />);
    // Click "個人開発" filter
    fireEvent.click(screen.getByRole('button', { name: '個人開発' }));
    // Handlebars is "work" only, should not appear anywhere
    expect(screen.queryByText('Handlebars')).not.toBeInTheDocument();
  });
});
