import Home from './components/home/home';
import Shop from './components/shop/shop';
import ShoppingCart from './components/shoppingcart/shoppingcart';

const routes = [
  {
    path: '/',
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
];

export default routes;
