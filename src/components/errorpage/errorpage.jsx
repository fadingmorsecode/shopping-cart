import { Link } from 'react-router-dom';
import styles from './errorpage.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.errorElsContainer}>
      <div className={styles.image404Group}>
        <img className={styles.image} src='/error-svgrepo-com.svg'></img>
        <span className={styles.span}>404</span>
      </div>
      <p className={styles.errorText}>Page not found</p>
      <Link className={styles.returnHomeBtn} to='/'>
        Return to Home
      </Link>
    </div>
  );
}
