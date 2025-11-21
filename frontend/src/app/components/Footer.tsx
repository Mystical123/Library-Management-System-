// Footer.tsx
import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerText}>
        © 2025 Library Management System — Project Delta
      </div>
      <div className={styles.socialIcons}>
        <a
          href="https://www.instagram.com/project_delta_csus/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/instagram.png"
            alt="Instagram"
            width={28}
            height={28}
          />
        </a>
        <a
          href="https://github.com/P-Delta/Library-Management"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/icons/github.webp" alt="GitHub" width={28} height={28} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Image src="/icons/linkden2.png" alt="LinkedIn" width={28} height={28} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Image src="/icons/facebook.webp" alt="Facebook" width={28} height={28} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Image src="/icons/twitter.png" alt="Twitter" width={28} height={28} />
        </a>
      </div>
    </footer>
  );
}
