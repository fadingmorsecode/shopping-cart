import Home from './components/home/home';
import Shop from './components/shop/shop';
import ShoppingCart from './components/shoppingcart/shoppingcart';
import App from './components/app';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <ShoppingCart />,
      },
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
];

export default routes;
