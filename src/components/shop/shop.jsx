import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Product({ data }) {
  return (
    <li>
      <img src={data.image}></img>
      <p>{data.title}</p>
      <p>⭐️ {data.rating.rate}</p>
      <p>${data.price}</p>
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
          return <Product key={obj.id} data={obj} />;
        })}
      </ul>
    )) || <h1>Loading...</h1>
  );
}
