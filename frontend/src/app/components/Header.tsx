import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <nav className={styles.siteNav} aria-label="Main navigation">
        <div className={styles.navLeft}>
          <Link href="/" className={styles.brand}>
            Library Management System
          </Link>
        </div>

        <div className={styles.navRight}>
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/reservation">Reservation</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/about">About</Link>
          <Link href="/credits">Credits</Link>
          <Link href="/contact">Contact</Link>
          <button id="login-btn" className={styles.ghost}>
            Login
          </button>
          <button id="cart-btn" className={styles.ghost}>
            Cart <span id="cart-count">0</span>
          </button>
        </div>
      </nav>
    </header>
  );
}