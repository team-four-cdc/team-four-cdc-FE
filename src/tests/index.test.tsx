import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders without crashing', () => {
    const home = render(<Home />);
    expect(home).toBeTruthy();
  });

  it('renders a heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: 'Team Four - CDC',
    });
    expect(heading).toBeInTheDocument();
  });
});
