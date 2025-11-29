import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Delta – Library Management System",
  description: "CSC 131 Library Management System · Sacramento State",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body">
        <div className="app-shell">
          {/* SITE HEADER */}
          <header className="site-header">
            <div className="site-header-inner">
              <Link href="/" className="site-logo">
                <span className="site-logo-title">Project Delta</span>
                <span className="site-logo-subtitle">Library System</span>
              </Link>

              <nav className="site-nav">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/catalog">Catalog</NavLink>
                <NavLink href="/wishlist">Wishlist</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                <NavLink href="/credits">Credits</NavLink>
              </nav>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="site-main">{children}</main>

          {/* FOOTER */}
          <footer className="site-footer">
            <div className="site-footer-inner">
              <p>© {new Date().getFullYear()} Project Delta · CSC 131</p>
              <div className="site-footer-links">
                <a href="https://linkedin.com" target="_blank">
                  LinkedIn
                </a>
                <a href="https://github.com/Mystical123/Library-Management-System-/tree/ui-update" target="_blank">
                  GitHub
                </a>
                <a href="https://facebook.com" target="_blank">
                  Facebook
                </a>
                <a href="https://twitter.com" target="_blank">
                  Twitter
                </a>
                <a href="https://www.instagram.com/project_delta_csus/" target="_blank">
                  Instagram
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="nav-link">
      {children}
    </Link>
  );
}
