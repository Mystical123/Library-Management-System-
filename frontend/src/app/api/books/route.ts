import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/books`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Books GET failed:", err);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
