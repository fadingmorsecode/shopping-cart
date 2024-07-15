import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { getAllByRole, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Shop from '../src/components/shop/shop';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('shop component', () => {
  function fetchMock() {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            image: 'image.com',
            title: 'mock product',
            rating: {
              rate: 3.2,
            },
            price: 19.99,
          },
        ]),
    });
  }

  const fetchSpy = vi.spyOn(window, 'fetch');
  fetchSpy.mockImplementation(fetchMock);

  vi.mock('react-router-dom', () => ({
    useOutletContext: () => [vi.fn()],
    BrowserRouter: vi.fn().mockImplementation((props) => props.children),
  }));

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  beforeEach(() => {
    act(() => {
      render(
        <BrowserRouter>
          <Shop />
        </BrowserRouter>
      );
    });
  });

  it('should display fetched data', async () => {
    await waitFor(() => {
      screen.getByTestId('product-element');
    });

    expect(screen.getByText('mock product')).toBeInTheDocument();
    expect(screen.getByText('⭐️ 3.2')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByTestId('product-image').src).toMatch(/image.com/i);
  });

  it('buttons should respectively should change quantity', async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      screen.getByTestId('product-element');
    });

    const quantityInput = screen.getByRole('spinbutton');
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });
    expect(quantityInput).toHaveValue(1);
    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(2);
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(1);
  });

  it('quantity input should change with typing', async () => {
    const user = userEvent.setup();

    await waitFor(() => {
      screen.getByTestId('product-element');
    });
    const quantityInput = screen.getByRole('spinbutton');

    expect(quantityInput).toHaveValue(1);
    await user.clear(quantityInput);
    await user.type(quantityInput, '2');
    expect(quantityInput).toHaveValue(2);
  });
});
