import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../src/components/home/home';
import { BrowserRouter } from 'react-router-dom';

describe('Home component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });
  it('renders main element', () => {
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
  it('renders main text content', () => {
    const mainParagraph = screen.getByText(
      /Welcome to Aberdeen, your one-stop destination for an eclectic range of high-quality products! We pride ourselves on offering a carefully curated selection of goods that cater to all your needs and desires. From stylish home décor and cutting-edge electronics to trendy fashion accessories and essential everyday items, we have something for everyone./i
    );
    expect(mainParagraph).toBeInTheDocument();
  });
  it('renders shop now button', () => {
    expect(screen.getByText(/Shop Now/i)).toBeInTheDocument();
  });
  it('renders home page image', () => {
    expect(screen.getByTestId('home-decoration-img')).toBeInTheDocument();
  });
});
