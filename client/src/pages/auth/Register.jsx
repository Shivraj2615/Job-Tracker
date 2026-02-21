import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All Fields are required");
      return;
    }

    register(name, email, password);

    setName("");
    setEmail("");
    setPassword("");

    navigate("/login");
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h3 className={styles.authTitle}>Create your account</h3>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <input
            className={styles.authInput}
            type="text"
            placeholder="Rahul Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className={styles.authInput}
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={styles.authInput}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={styles.authButton}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className={styles.authFooter}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
