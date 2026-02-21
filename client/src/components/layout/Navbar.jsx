import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Smart<span>Track</span>
        </Link>

        <div className={styles.links}>
          {!user ? (
            <>
              <Link className={styles.link} to="/login">
                Login
              </Link>
              <Link
                className={`${styles.link} ${styles.primary}`}
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className={styles.link} to="/jobs">
                Jobs
              </Link>
              <Link
                className={`${styles.link} ${styles.primary}`}
                to="/jobs/add"
              >
                Add Job
              </Link>
              <Link
                className={`${styles.link} ${styles.primary}`}
                to="/dashboard"
              >
                Dashboard
              </Link>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
