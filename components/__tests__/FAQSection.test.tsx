import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQSection from '../FAQSection';

describe('FAQSection', () => {
  it('renders section heading', () => {
    render(<FAQSection />);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('renders all FAQ questions', () => {
    render(<FAQSection />);
    expect(screen.getByText('稼働開始はいつから可能ですか？')).toBeInTheDocument();
    expect(screen.getByText('リモート・出社の希望はありますか？')).toBeInTheDocument();
    expect(screen.getByText('得意な技術領域は何ですか？')).toBeInTheDocument();
  });

  it('toggles answer visibility on click', () => {
    render(<FAQSection />);
    const button = screen.getByText('稼働開始はいつから可能ですか？');
    expect(button.closest('button')).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button.closest('button')).toHaveAttribute('aria-expanded', 'true');
  });
});
