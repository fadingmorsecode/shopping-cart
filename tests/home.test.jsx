import { describe, it, expect, beforeEach, vi } from 'vitest';
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
      /Welcome to Aberdeen, your one-stop destination for an eclectic range of high-quality products! At Aberdeen, we pride ourselves on offering a carefully curated selection of goods that cater to all your needs and desires. From stylish home décor and cutting-edge electronics to trendy fashion accessories and essential everyday items, we have something for everyone./i
    );
    expect(mainParagraph).toBeInTheDocument();
  });
  it('renders shop now button', () => {
    const shopNowBtn = screen.getByRole('button');
    expect(shopNowBtn.textContent).toMatch(/Shop Now/i);
  });
  it('renders home page image', () => {
    const homeImage = screen.getByAltText(
      'Overhead angle of a person holding an umbrella while walking on a striped-painted ground'
    );
    expect(homeImage).toHaveAttribute('src', '/aberdeen-home-img.jpg');
  });
});
