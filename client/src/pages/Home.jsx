import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Track Your Job Applications Smarter</h1>

          <p className={styles.subtitle}>
            Job Tracker helps you organize applications, monitor status, and
            stay consistent in your job search journey.
          </p>

          {!user ? (
            <div className={styles.ctaButtons}>
              <Link to="/register" className={styles.primaryBtn}>
                Get Started
              </Link>
              <Link to="/login" className={styles.secondaryBtn}>
                Login
              </Link>
            </div>
          ) : (
            <div className={styles.ctaButtons}>
              <Link to="/jobs" className={styles.primaryBtn}>
                View Jobs
              </Link>
            </div>
          )}
        </div>

        <div className={styles.heroImage}>
          <img
            src="/job-tracker-facebook.jpg"
            alt="Job tracking illustration"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why use Job Tracker?</h2>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>📋 Organize Applications</h3>
            <p>Keep all job applications in one structured place.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>📈 Track Progress</h3>
            <p>Monitor application status and follow-ups easily.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>⏰ Stay Consistent</h3>
            <p>Build a habit of applying and tracking daily.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
