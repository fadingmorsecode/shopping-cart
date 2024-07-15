import { useOutletContext } from 'react-router-dom';

export default function ShoppingCart() {
  const { getCartCount, cart } = useOutletContext();

  function getCartSubtotal() {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    return subtotal.toFixed(2);
  }

  return (
    <>
      <h2>Cart</h2>
      <div>
        <p>{getCartSubtotal()} subtotal</p>
        <p>{getCartCount()} items</p>
      </div>
      <main></main>
    </>
  );
}
