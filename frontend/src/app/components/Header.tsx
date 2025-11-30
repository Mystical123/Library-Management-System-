"use client";

import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        
        {/* Left Logo */}
        <div className={styles.logoBlock}>
          <span className={styles.logoTitle}>PROJECT DELTA</span>
          <span className={styles.logoSubtitle}>Library System</span>
        </div>

        {/* Navigation */}
        <nav className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/credits">Credits</Link>
        </nav>

      </div>
    </header>
  );
}
