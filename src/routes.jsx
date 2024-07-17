import Home from './components/home/home';
import Shop from './components/shop/shop';
import ShoppingCart from './components/shoppingcart/shoppingcart';
import App from './components/app';
import ErrorPage from './components/errorpage/errorpage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
