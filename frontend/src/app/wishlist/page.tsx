"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "../types";
import styles from "./wishlist.module.css";

// Extend Book type with wishlist_id from backend
type WishlistItem = Book & { wishlist_id: number };

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load wishlist items from backend
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/wishlist", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data: WishlistItem[] = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
      setError("Could not load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Listen for wishlist changes dispatched from other pages/components
  useEffect(() => {
    const onWishlistChanged = () => {
      fetchWishlist();
    };
    window.addEventListener("wishlist:changed", onWishlistChanged);
    return () => window.removeEventListener("wishlist:changed", onWishlistChanged);
  }, []);

  // Remove an item from wishlist
  const remove = async (wishlistId: number) => {
    const prev = [...items];
    setItems((s) => s.filter((i) => i.wishlist_id !== wishlistId));

    try {
      const res = await fetch(`/api/wishlist/${wishlistId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");
    } catch (e) {
      console.error(e);
      alert("Could not remove item");
      setItems(prev); // rollback on failure
    }
  };

  return (
    <main
      className={`${styles.wishlistContainer} ${
        items.length > 0 ? styles.hasItems : ""
      }`}
    >
      <h1 className={styles.wishlistHeading}>Wishlist</h1>
      <p className={styles.wishlistIntro}>
        Books you’re interested in and want to keep track of.
      </p>

      <div className={styles.wishlistGrid}>
        {/* Add-book Card */}
        <article className={styles.wishlistPlusCard}>
          <div className={styles.plusWrapper}>
            <Link href="/catalog" aria-label="Add a book to wishlist">
              +
            </Link>
          </div>
          <div className={styles.wishlistCardBody}>
            <h2 className={styles.wishlistTitle}>Add a book</h2>
            <p className={styles.wishlistMeta}>Browse catalog to add books</p>
            <div className={styles.wishlistActions}>
              <Link href="/catalog" className={styles.wishlistButton}>
                Browse Catalog
              </Link>
            </div>
          </div>
        </article>

        {/* Wishlist Items */}
        {items.map((book) => (
          <article className={styles.wishlistCard} key={book.wishlist_id}>
            <div className={styles.wishlistThumb}>
              {book.image_url ? (
                <Image
                  src={book.image_url}
                  alt={book.title}
                  fill
                  sizes="(max-width: 600px) 100vw, 240px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className={styles.wishlistPlaceholder}>No image</div>
              )}
            </div>

            <div className={styles.wishlistCardBody}>
              <h2 className={styles.wishlistTitle}>{book.title}</h2>

              <p className={styles.wishlistMeta}>
                <strong>Author:</strong> {book.author}
              </p>
              <p className={styles.wishlistMeta}>
                <strong>Genre:</strong> {book.genre}
              </p>

              <p className={styles.wishlistDescription}>
                {book.description?.length > 220
                  ? `${book.description.slice(0, 220)}…`
                  : book.description}
              </p>

              <div className={styles.wishlistActions}>
                <button
                  className={styles.wishlistButton}
                  onClick={() => remove(book.wishlist_id)}
                >
                  Remove
                </button>
                <Link href="/catalog" className={styles.wishlistButtonOutline}>
                  Browse
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {loading && (
        <div className={styles.wishlistCenter}>Loading wishlist…</div>
      )}
      {error && (
        <div className={styles.wishlistCenterError}>{error}</div>
      )}
    </main>
  );
}
