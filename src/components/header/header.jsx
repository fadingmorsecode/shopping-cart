import { Link } from 'react-router-dom';
import styles from './header.module.css';

export default function Header({ cartCount }) {
  return (
    <header data-testid='header-component' className={styles.header}>
      <Link to='/' className={styles.logoTextGroup}>
        <img
          src='/aberdeen-logo.svg'
          alt='Aberdeen cobweb logo'
          className={styles.logoImg}
        />
        <h1 className={styles.headerCompanyText}>Aberdeen</h1>
      </Link>
      <div className={styles.linkCartGroup}>
        <Link to='/' className={styles.textLinks}>
          Home
        </Link>
        <Link to='/shop' className={styles.textLinks}>
          Shop
        </Link>
        <div className={styles.cartGroup}>
          <Link to='/cart' data-testid='cart-button'>
            <img
              src='/shopping-cart.svg'
              alt='Shopping cart icon'
              className={styles.cartImg}
            />
          </Link>
          <p
            data-testid='cart-count'
            className={cartCount > 0 && styles.cartCount}
          >
            {cartCount > 0 ? (cartCount > 99 ? '99+' : cartCount) : null}
          </p>
        </div>
      </div>
    </header>
  );
}
