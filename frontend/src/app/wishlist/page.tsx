"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "../types";
import styles from "./wishlist.module.css";

type WishlistItem = Book & { wishlist_id: number };

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch wishlist items from api
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/wishlist");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: WishlistItem[] = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
      setError("Could not load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // load the wishlist when page first loads
  useEffect(() => {
    fetchWishlist();
  }, []);

  // remove element from wishlist
  const remove = async (wishlistId: number) => {
    const prev = [...items]; // save prev if needed
    setItems((s) => s.filter((i) => i.wishlist_id !== wishlistId));
    try {
      const res = await fetch(`/api/wishlist/${wishlistId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
    } catch (e) {
      console.error(e);
      setItems(prev); // rollback
      alert("Could not remove item");
    }
  };

  return (
    <>
      <Header />
      <main className={`${styles.wishlistContainer} ${items.length > 0 ? styles.hasItems : ""}`}>
        <h1 className={styles.wishlistHeading}>My Wishlist</h1>

        <div className={styles.wishlistGrid}>
          {/* Plus card */}
          <article className={styles.wishlistPlusCard}>
            <div className={styles.wishlistThumb}>
              <div className={styles.plusWrapper}>
                <Link href="/catalog" aria-label="Add a book to wishlist">+</Link>
              </div>
            </div>
            <div className={styles.wishlistCardBody}>
              <h2 className={styles.wishlistTitle}>Add a book</h2>
              <p className={styles.wishlistMeta}>Browse catalog to add books</p>
              <div className={styles.wishlistActions}>
                <Link href="/catalog" className={styles.wishlistButton}>Browse catalog</Link>
              </div>
            </div>
          </article>

          {/* Wishlist items */}
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
                <p className={styles.wishlistMeta}><strong>Author:</strong> {book.author}</p>
                <p className={styles.wishlistMeta}><strong>Genre:</strong> {book.genre}</p>
                <p className={styles.wishlistDescription}>
                  {book.description?.length > 220 ? `${book.description.slice(0, 220)}…` : book.description}
                </p>
                <div className={styles.wishlistActions}>
                  <button className={styles.wishlistButton} onClick={() => remove(book.wishlist_id)}>Remove</button>
                  <Link href="/catalog" className={styles.wishlistButtonOutline}>Browse</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {loading && <div className={styles.wishlistCenter}>Loading wishlist…</div>}
        {error && <div className={styles.wishlistCenterError}>{error}</div>}
      </main>
      <Footer />
    </>
  );
}
