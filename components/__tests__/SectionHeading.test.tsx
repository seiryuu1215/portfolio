import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from '../SectionHeading';

describe('SectionHeading', () => {
  it('renders label and title from props', () => {
    render(<SectionHeading id="test" label="LABEL" title="タイトル" />);
    expect(screen.getByText('LABEL')).toBeInTheDocument();
    expect(screen.getByText('タイトル')).toBeInTheDocument();
  });

  it('sets scroll-target id for navigation', () => {
    const { container } = render(<SectionHeading id="about" label="About" title="自己紹介" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.id).toBe('about');
  });

  it('renders title as h2 for semantic structure', () => {
    render(<SectionHeading id="x" label="L" title="見出し" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('見出し');
  });
});
