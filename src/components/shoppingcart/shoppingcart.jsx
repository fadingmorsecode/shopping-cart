import { useOutletContext } from 'react-router-dom';

function Item({ data }) {
  return (
    <li>
      <div>
        <img src={data.image} />
        <p>{data.title}</p>
      </div>
      <div>
        <p data-testid='product-quantity'>
          {data.quantity < 2
            ? data.quantity + ' item'
            : data.quantity + ' items'}
        </p>
        <p>${(data.price * data.quantity).toFixed(2)}</p>
        {data.quantity > 1 && <p>{'each $' + data.price}</p>}
      </div>
    </li>
  );
}

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
    <>
      <h2>Cart</h2>
      <div>
        <p>${getCartSubtotal()} subtotal</p>
        <p data-testid='total-cart-count'>
          {cartCount > 2 || cartCount < 1
            ? cartCount + ' items'
            : cartCount + ' item'}
        </p>
      </div>
      <main>
        <ul>
          {cart.map((item) => (
            <Item key={item.id} data={item} />
          ))}
        </ul>
        {cart.length > 0 && (
          <div>
            <p>Order summary</p>
            <p>${getCartSubtotal()} subtotal</p>
            <button onClick={handlePlacedOrder}>Place Order</button>
          </div>
        )}
      </main>
    </>
  );
}
