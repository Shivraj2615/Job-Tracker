import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Smart<span>Track</span>
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {!user ? (
            <>
              <Link
                className={styles.link}
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                className={`${styles.link} ${styles.primary}`}
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                className={styles.link}
                to="/jobs"
                onClick={() => setMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                className={`${styles.link} ${styles.primary}`}
                to="/jobs/add"
                onClick={() => setMenuOpen(false)}
              >
                Add Job
              </Link>
              <Link
                className={`${styles.link} ${styles.primary}`}
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                className={`${styles.link} ${styles.primary}`}
                to="/analyze-jd"
                onClick={() => setMenuOpen(false)}
              >
                JD Analysis
              </Link>
              <Link
                className={`${styles.link} ${styles.primary}`}
                to="/match-resume"
                onClick={() => setMenuOpen(false)}
              >
                Resume Match
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
