import Header from '../header/header';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div>
          <p>
            Welcome to Aberdeen, your one-stop destination for an eclectic range
            of high-quality products! At Aberdeen, we pride ourselves on
            offering a carefully curated selection of goods that cater to all
            your needs and desires. From stylish home décor and cutting-edge
            electronics to trendy fashion accessories and essential everyday
            items, we have something for everyone.
          </p>
          <Link to='shop'>
            <button>Shop Now</button>
          </Link>
        </div>
        <img
          src='/aberdeen-home-img.jpg'
          alt='Overhead angle of a person holding an umbrella while walking on a striped-painted ground'
        />
      </main>
    </>
  );
}
