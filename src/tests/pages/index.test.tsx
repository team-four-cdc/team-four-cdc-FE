import React from 'react';
import Home from '@/pages/index';
import { render } from '@/tests';

describe('Home Component', () => {
  test('ParentComponent renders', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('homepage')).toBeInTheDocument();
  });

  test('ChildComponent was called', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('categoryListTest')).toBeInTheDocument();
    expect(getByTestId('newsArticleTest')).toBeInTheDocument();
    expect(getByTestId('writerListTest')).toBeInTheDocument();
  });
});
