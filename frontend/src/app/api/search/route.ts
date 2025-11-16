import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";
    const field = url.searchParams.get("field") || "all";

    // forward to backend
    const backendUrl = `${BACKEND_URL}/api/search?q=${encodeURIComponent(q)}&field=${encodeURIComponent(field)}`;
    const res = await fetch(backendUrl);

    if (!res.ok) {
      console.error(await res.text());
      return NextResponse.json({ error: "Backend search failed" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Next search proxy failed:", err);
    return NextResponse.json({ error: "Search proxy failed" }, { status: 500 });
  }
}
