import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';

function QuantityInput({ quantityVal, setQuantityVal }) {
  function handleChange(e) {
    setQuantityVal(e.target.value);
  }

  return (
    <input
      type='number'
      min={1}
      max={9}
      value={quantityVal}
      onChange={handleChange}
    />
  );
}

function Product({ data }) {
  const [cart, setCart] = useOutletContext();
  const [quantityVal, setQuantityVal] = useState(1);

  function addToCart() {
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

  return (
    <li data-testid='product-element'>
      <img src={data.image} data-testid='product-image'></img>
      <p>{data.title}</p>
      <p>⭐️ {data.rating.rate}</p>
      <p>${data.price}</p>
      <div>
        <button
          onClick={() => {
            if (quantityVal + 1 < 10) setQuantityVal((prevVal) => prevVal + 1);
          }}
        >
          +
        </button>
        <QuantityInput
          quantityVal={quantityVal}
          setQuantityVal={setQuantityVal}
        />
        <button
          onClick={() => {
            if (quantityVal - 1 > 0) setQuantityVal((prevVal) => prevVal - 1);
          }}
        >
          -
        </button>
        <button onClick={addToCart}>Add to Cart</button>
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
  useEffect(() => {
    fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);
  return (
    (data && (
      <ul>
        {data.map((obj) => {
          obj.quantity = 0;
          return <Product key={obj.id} data={obj} />;
        })}
      </ul>
    )) || <h1>Loading...</h1>
  );
}
