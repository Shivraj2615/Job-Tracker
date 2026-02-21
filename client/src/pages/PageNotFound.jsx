import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>

        <p className={styles.text}>
          Oops! The page you are looking for doesn’t exist.
        </p>

        <Link to="/" className={styles.button}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
