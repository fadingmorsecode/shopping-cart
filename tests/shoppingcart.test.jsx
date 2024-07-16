import { describe, it, expect, afterAll, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from '../src/routes';
import userEvent from '@testing-library/user-event';

describe('shopping cart component', () => {
  function fetchMock() {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            image: 'image.com',
            title: 'first',
            rating: {
              rate: 3.2,
            },
            price: 19.99,
          },
          {
            id: 2,
            image: 'anotherimage.com',
            title: 'second',
            rating: {
              rate: 4.2,
            },
            price: 29.95,
          },
        ]),
    });
  }

  const fetchSpy = vi.spyOn(window, 'fetch');
  fetchSpy.mockImplementation(fetchMock);

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  beforeEach(async () => {
    const user = userEvent.setup();
    act(() => {
      const router = createMemoryRouter(routes, {
        initialEntries: ['/shop'],
        initialIndex: 0,
      });

      render(<RouterProvider router={router} />);
    });
    await waitFor(() => {
      screen.getAllByTestId('product-element');
    });
    const cartButtons = screen.getAllByRole('button', { name: /Add to Cart/i });
    const incrementButtons = screen.getAllByRole('button', { name: '+' });
    const firstAddBtn = cartButtons[0];
    const secondAddbtn = cartButtons[1];
    const secondIncBtn = incrementButtons[1];
    await user.click(firstAddBtn);
    await user.click(secondIncBtn);
    await user.click(secondAddbtn);
    await user.click(screen.getByTestId('cart-button'));
  });

  it('should render cart heading', async () => {
    const cartHeading = screen.getByRole('heading', { level: 2 });
    expect(cartHeading).toBeInTheDocument();
    expect(cartHeading.textContent).toMatch(/Cart/i);
  });
  it('should render correct subtotal', () => {
    const subtotal = screen.getAllByText(/subtotal/i);
    console.log(subtotal);
    expect(subtotal[0]).toBeInTheDocument();
    expect(subtotal[1]).toBeInTheDocument();
    expect(subtotal[0].textContent).toMatch(/79.89/i);
    expect(subtotal[1].textContent).toMatch(/79.89/i);
  });
  it('should render correct item count', () => {
    const itemCount = screen.getByTestId('total-cart-count');
    expect(itemCount).toBeInTheDocument();
    expect(itemCount.textContent).toMatch(/3/i);
  });
  it('should render items in cart', () => {});
});
