import { Link } from 'react-router-dom';

export default function Header({ cartCount }) {
  return (
    <header data-testid='header-component'>
      <img src='/aberdeen-logo.svg' alt='Aberdeen cobweb logo' />
      <h1>Aberdeen</h1>
      <Link to='/'>Home</Link>
      <Link to='/shop'>Shop</Link>
      <Link to='/cart' data-testid='cart-button'>
        <img src='/shopping-cart.svg' alt='Shopping cart icon' />
      </Link>
      <p data-testid='cart-count'>{cartCount > 0 && cartCount}</p>
    </header>
  );
}
