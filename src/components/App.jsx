import { Outlet } from 'react-router-dom';
import Header from './header/header';
import { useState } from 'react';

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Header />
      <Outlet context={[cart, setCart]} />
    </>
  );
}
