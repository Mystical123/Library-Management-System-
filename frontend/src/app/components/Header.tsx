import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <div className="nav-left">
          <Link href="/" className="brand">Library Management System</Link>
        </div>

        <div className="nav-right">
          <Link href="/">Home</Link>
          <Link href="/search">Catalog</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/reservation">Reservation</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/about">About</Link>
          <Link href="/credits">Credits</Link>
          <Link href="/contact">Contact</Link>
          <button id="login-btn" className="ghost">Login</button>
          <button id="cart-btn" className="ghost">
            Cart <span id="cart-count">0</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

