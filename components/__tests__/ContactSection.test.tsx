import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactSection from '../ContactSection';

describe('ContactSection', () => {
  it('renders contact heading', () => {
    render(<ContactSection />);
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument();
  });

  it('renders email link', () => {
    render(<ContactSection />);
    const emailLink = screen.getByText('メールで連絡する');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:mt.oikawa@gmail.com');
  });
});
