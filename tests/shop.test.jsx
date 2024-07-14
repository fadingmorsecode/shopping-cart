import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Shop from '../src/components/shop/shop';
import { vi } from 'vitest';

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
  afterAll(() => {
    fetchSpy.mockRestore();
  });

  it('should display fetched data', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Shop />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      screen.getByTestId('product-element');
    });

    expect(screen.getByText('mock product')).toBeInTheDocument();
    expect(screen.getByText('⭐️ 3.2')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByTestId('product-image').src).toMatch(/image.com/i);
  });
});
