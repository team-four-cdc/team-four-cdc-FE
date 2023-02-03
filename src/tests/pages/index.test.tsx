import { screen } from '@testing-library/react';
import Home from '@/pages/index';
import { render } from '@/tests';
import { store } from '@/store';

describe('Home', () => {
  it('renders without crashing', () => {
    const home = render(<Home />, { store });
    expect(home).toBeTruthy();
  });

  it('renders a heading', () => {
    render(<Home />, { store });
    const heading = screen.getByRole('heading', {
      name: 'Team Four - CDC',
    });
    expect(heading).toBeInTheDocument();
  });
});
