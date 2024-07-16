import Home from './components/home/home';
import Shop from './components/shop/shop';
import ShoppingCart from './components/shoppingcart/shoppingcart';
import App from '../src/components/app';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <ShoppingCart />,
      },
    ],
  },
];

export default routes;
