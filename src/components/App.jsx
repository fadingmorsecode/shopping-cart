import { Outlet } from 'react-router-dom';
import Header from './header/header';
import { useState } from 'react';

export default function App() {
  const [cart, setCart] = useState([]);

  function getCartCount() {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  }

  return (
    <>
      <Header cartCount={getCartCount()} />
      <Outlet context={[cart, setCart]} />
    </>
  );
}
