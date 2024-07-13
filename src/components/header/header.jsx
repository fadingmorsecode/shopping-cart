import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header>
        <img src='/aberdeen-logo.svg' alt='Aberdeen cobweb logo' />
        <h1>Aberdeen</h1>
        <Link to='/'>Home</Link>
        <Link to='shop'>Shop</Link>
        <Link to='cart'>
          <img src='/shopping-cart.svg' alt='Shopping cart icon' />
        </Link>
      </header>
    </>
  );
}
