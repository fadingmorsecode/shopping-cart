import { useOutletContext } from 'react-router-dom';
import styles from './shoppingcart.module.css';
import PropTypes from 'prop-types';

function Item({ data }) {
  return (
    <li className={styles.cartListItem}>
      <div className={styles.cartImageTextGroup}>
        <img src={data.image} className={styles.cartListImage} />
        <p className={styles.cartListTitle}>{data.title}</p>
      </div>
      <div className={styles.cartListItemInfo}>
        <p data-testid='product-quantity' className={styles.cartListQuantity}>
          {data.quantity < 2
            ? data.quantity + ' item'
            : data.quantity + ' items'}
        </p>
        <p className={styles.cartListPrice}>
          ${(data.price * data.quantity).toFixed(2)}
        </p>
        {data.quantity > 1 && (
          <p className={styles.cartListIndividualPrice}>
            {'each $' + data.price}
          </p>
        )}
      </div>
    </li>
  );
}

Item.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default function ShoppingCart() {
  const { getCartCount, cart, setCart } = useOutletContext();

  function getCartSubtotal() {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    return subtotal.toFixed(2);
  }

  function handlePlacedOrder() {
    setCart([]);
  }

  const cartCount = getCartCount();

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeading}>Cart</h2>
      <div className={styles.cartInfo}>
        <p className={styles.cartSubtotal}>${getCartSubtotal()} subtotal</p>
        <span>•</span>
        <p className={styles.cartCount} data-testid='total-cart-count'>
          {cartCount > 1 || cartCount < 1
            ? cartCount + ' items'
            : cartCount + ' item'}
        </p>
      </div>
      {cart.length < 1 && (
        <h2 className={styles.emptyCartText}>Your cart is empty</h2>
      )}
      <main className={styles.cartMainContent}>
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <Item key={item.id} data={item} />
          ))}
        </ul>
        {cart.length > 0 && (
          <div className={styles.placeOrderSection}>
            <p className={styles.orderSummary}>Order summary</p>
            <p className={styles.cartSubtotal}>${getCartSubtotal()} subtotal</p>
            <button
              onClick={handlePlacedOrder}
              className={styles.placeOrderBtn}
            >
              Place Order
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
