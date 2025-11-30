"use client";

export default function HomePage() {
  return (
    <main className="home-container">
      {/* HERO CARD */}
      <section className="hero-wrapper">
        <div className="hero-card">
          <h1 className="hero-title">
            Welcome to Project Delta Library System
          </h1>

          <p className="hero-body">
            Explore our digital catalog, manage reservations, track borrowed
            books, and navigate the library system with ease. Designed for
            CSC 131 — Software Engineering, this interface brings clarity and
            structure to our system’s core features.
          </p>

          <div className="hero-actions">
            <a href="/catalog" className="hero-btn-primary">
              Browse Catalog
            </a>
            <a href="/about" className="hero-btn-secondary">
              About the Team
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="features-wrapper">
        <h2 className="features-heading">Key Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Catalog</h3>
            <p className="feature-body">
              Search through the library collection with detailed book
              information and availability across branches.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Wishlist</h3>
            <p className="feature-body">
              Save books you're interested in and keep track of titles to borrow
              later.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Reservations</h3>
            <p className="feature-body">
              View and manage reserved books with clear pickup expectations and
              queue positions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
