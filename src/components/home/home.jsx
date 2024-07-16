import { Link } from 'react-router-dom';
import styles from './home.module.css';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <div>
        <p className={styles.mainText}>
          Welcome to Aberdeen, your one-stop destination for an eclectic range
          of high-quality products! We pride ourselves on offering a carefully
          curated selection of goods that cater to all your needs and desires.
          From stylish home décor and cutting-edge electronics to trendy fashion
          accessories and essential everyday items, we have something for
          everyone.
        </p>
        <Link to='shop' className={styles.shopNowBtnLink}>
          <button className={styles.shopNowBtn}>Shop Now</button>
        </Link>
      </div>
      <div className={styles.homeImg}></div>
    </main>
  );
}
