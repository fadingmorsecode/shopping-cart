import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/components/home/home';

describe('Header component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });
  it('renders correct heading', () => {
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(
      /Aberdeen/i
    );
  });
  it('renders correct home link', () => {
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument;
    expect(homeLink).toHaveAttribute('href', '/');
  });
  it('renders correct shop link', () => {
    const shopLink = screen.getByText(/Shop/i);
    expect(shopLink).toBeInTheDocument;
    expect(shopLink).toHaveAttribute('href', '/shop');
  });
  it('renders logo in heading', () => {
    const logo = screen.getByAltText('Aberdeen cobweb logo');
    expect(logo).toHaveAttribute('src', '/aberdeen-logo.svg');
  });
  it('renders shopping cart element', () => {
    const shoppingCart = screen.getByAltText('Shopping cart icon');
    expect(shoppingCart).toHaveAttribute('src', '/shopping-cart.svg');
  });
});
