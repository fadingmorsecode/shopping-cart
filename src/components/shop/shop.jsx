import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import styles from './shop.module.css';

function QuantityInput({ quantityVal, setQuantityVal }) {
  function handleChange(e) {
    const value = e.target.value;

    // Ensure the value is a valid number within the range
    if (/^\d*$/.test(value)) {
      const formattedValue =
        value === '' ? '' : Math.max(1, Math.min(9, Number(value)));
      setQuantityVal(formattedValue);
    }
  }

  return (
    <input
      type='number'
      min={1}
      max={9}
      value={quantityVal}
      onChange={handleChange}
      className={styles.productInput}
    />
  );
}

function Product({ data }) {
  const { cart, setCart } = useOutletContext();
  const [quantityVal, setQuantityVal] = useState(1);

  function addToCart() {
    console.log(quantityVal);
    if (quantityVal < 10 && quantityVal > 0) {
      const comparison = cart.find((item) => item.id === data.id);

      if (!comparison) {
        data.quantity = quantityVal;
        setCart([...cart, data]);
      } else {
        setCart(
          cart.map((item) => {
            if (item.id === data.id) {
              const newQuantity = item.quantity + quantityVal;
              return {
                ...item,
                quantity: newQuantity > 9 ? item.quantity : newQuantity,
              };
            }
            return item;
          })
        );
      }
    }
  }

  return (
    <li data-testid='product-element' className={styles.productListItem}>
      <img
        src={data.image}
        data-testid='product-image'
        className={styles.productImage}
      ></img>
      <p className={styles.productTitle}>{data.title}</p>
      <p className={styles.productRating}>⭐️ {data.rating.rate}</p>
      <p className={styles.productPrice}>${data.price}</p>
      <div className={styles.cartManipulationGroup}>
        <div className={styles.buttonsGroup}>
          <button
            onClick={() => {
              console.log(quantityVal);
              if (quantityVal + 1 < 10)
                setQuantityVal((prevVal) => prevVal + 1);
            }}
            className={styles.productIncrement}
          >
            +
          </button>
          <QuantityInput
            quantityVal={quantityVal}
            setQuantityVal={setQuantityVal}
          />
          <button
            onClick={() => {
              console.log(quantityVal);
              if (quantityVal - 1 > 0) setQuantityVal((prevVal) => prevVal - 1);
            }}
            className={styles.productDecrement}
          >
            -
          </button>
        </div>
        <button onClick={addToCart} className={styles.productAdd}>
          Add to Cart
        </button>
      </div>
    </li>
  );
}

Product.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
};

export default function Shop() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => setData(response))
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (error) {
    return <p>A network error occurred</p>;
  }

  return (
    <ul className={styles.productList}>
      {data.map((obj) => {
        obj.quantity = 0;
        return <Product key={obj.id} data={obj} />;
      })}
    </ul>
  );
}
