import { NextResponse } from "next/server";

export async function GET() {
  const time = new Date().toISOString();

  return NextResponse.json(
    { time },
    {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59"
      }
    }
  );
}
