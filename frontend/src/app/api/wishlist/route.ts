import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/wishlist`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Wishlist GET failed:", err);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND_URL}/api/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Wishlist POST failed:", err);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}


