"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Book } from "../types";
import styles from "./catalog.module.css";

export default function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(new Set());

  // Search state
  const [query, setQuery] = useState("");
  const [field, setField] = useState<"all" | "title" | "author" | "genre">("all");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // Fetch books + wishlist
  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      setLoading(true);
      try {
        let res;
        if (debouncedQuery) {
          res = await fetch(
            `/api/search?q=${encodeURIComponent(debouncedQuery)}&field=${encodeURIComponent(field)}`,
            { signal: controller.signal }
          );
        } else {
          res = await fetch("/api/books", { signal: controller.signal });
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Book[] = await res.json();
        setBooks(data);

        // Fetch wishlist
        const wishlistRes = await fetch("/api/wishlist");
        if (wishlistRes.ok) {
          const wishlistData: { book_id: number }[] = await wishlistRes.json();
          setWishlistIds(new Set(wishlistData.map((w) => w.book_id)));
        }
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
          setError("Could not load catalog or wishlist");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [debouncedQuery, field]);

  const closeModal = () => setSelectedBook(null);
  const toggleModal = (book: Book) =>
    setSelectedBook((prev) => (prev && prev.id === book.id ? null : book));

  const handleAddToWishlist = async (bookId: number) => {
    if (wishlistIds.has(bookId)) return;

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book_id: bookId }),
      });
      if (!res.ok) throw new Error("Failed to add");

      // local update so button shows "Added" immediately
      setWishlistIds(new Set([...wishlistIds, bookId]));

      // notify other components/pages in this tab to refresh their data
      window.dispatchEvent(new Event("wishlist:changed"));
    } catch (err: unknown) {
      console.error(err);
      alert("Could not add to wishlist");
    }
  };



  const renderWishlistButton = (book: Book) => {
    const added = wishlistIds.has(book.id);
    return (
      <button
        className={styles.catalogButtonOutline}
        onClick={() => handleAddToWishlist(book.id)}
        disabled={added}
      >
        {added ? "Added" : "Add to Wishlist"}
      </button>
    );
  };

  if (loading) return <div className={styles.catalogCenter}>Loading catalog…</div>;
  if (error) return <div className={styles.catalogCenterError}>{error}</div>;
  if (!books.length) return <div className={styles.catalogCenter}>No books available yet.</div>;

  return (
    <>
      {/* Modal */}
      {selectedBook && (
        <div
          className={styles.catalogOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${selectedBook.title}`}
          onClick={closeModal}
        >
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalThumb}>
              {selectedBook.image_url ? (
                <Image
                  src={selectedBook.image_url}
                  alt={selectedBook.title}
                  fill
                  sizes="(max-width: 600px) 100vw, 360px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className={styles.catalogPlaceholder}>No image</div>
              )}
            </div>

            <div className={styles.modalBody}>
              <h2 className={styles.catalogTitle}>{selectedBook.title}</h2>
              <p className={styles.catalogMeta}><strong>Author:</strong> {selectedBook.author}</p>
              <p className={styles.catalogMeta}><strong>Genre:</strong> {selectedBook.genre}</p>
              <p className={styles.catalogMeta}><strong>Year:</strong> {selectedBook.year_published}</p>
              <p className={styles.catalogDescription}>{selectedBook.description}</p>

              <div className={styles.catalogActions}>
                <button className={styles.catalogButton} onClick={closeModal}>Hide details</button>
                {renderWishlistButton(selectedBook)}
                <button className={styles.catalogButtonOutline}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main catalog */}
      <main className={styles.catalogContainer}>
        <h1 className={styles.catalogHeading}>Catalog</h1>

        {/* Search bar */}
        <div className={styles.catalogSearchBar}>
          <input
            className={styles.catalogSearchInput}
            type="search"
            placeholder="Search by title, author, or genre…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className={styles.catalogSelect}
            value={field}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setField(e.target.value as "all" | "title" | "author" | "genre")
            }
          >
            <option value="all">All</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
          </select>

          <button
            className={styles.catalogClearButton}
            onClick={() => {
              setQuery("");
              setDebouncedQuery("");
              setField("all");
            }}
          >
            Clear
          </button>
        </div>

        {/* Book Grid */}
        <div className={styles.catalogGrid}>
          {books.map((book) => (
            <article className={styles.catalogCard} key={book.id}>
              <div className={styles.catalogThumb}>
                {book.image_url ? (
                  <Image
                    src={book.image_url}
                    alt={book.title}
                    fill
                    sizes="(max-width: 600px) 100vw, 240px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className={styles.catalogPlaceholder}>No image</div>
                )}
              </div>

              <div className={styles.catalogCardBody}>
                <h2 className={styles.catalogTitle}>{book.title}</h2>
                <p className={styles.catalogMeta}><strong>Author:</strong> {book.author}</p>
                <p className={styles.catalogMeta}><strong>Genre:</strong> {book.genre}</p>
                <p className={styles.catalogMeta}><strong>Year:</strong> {book.year_published}</p>
                <p className={styles.catalogDescription}>
                  {book.description?.length > 220
                    ? `${book.description.slice(0, 220)}…`
                    : book.description}
                </p>

                <div className={styles.catalogActions}>
                  <button className={styles.catalogButton} onClick={() => toggleModal(book)}>
                    {selectedBook && selectedBook.id === book.id ? "Hide details" : "Details"}
                  </button>

                  {renderWishlistButton(book)}
                  <button className={styles.catalogButtonOutline}>Add to Cart</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
