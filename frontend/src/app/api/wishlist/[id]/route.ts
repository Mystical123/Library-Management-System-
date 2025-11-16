
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1]; // extract dynamic :id

    const res = await fetch(`${BACKEND_URL}/api/wishlist/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.ok ? 200 : 500,
    });
  } catch (err) {
    console.error("Wishlist DELETE failed:", err);
    return NextResponse.json(
      { error: "Failed to delete from wishlist" },
      { status: 500 }
    );
  }
}
