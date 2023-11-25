import { getBook } from "lib/data/data-source";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (id !== null) {
    const bookId = parseInt(id);
    if (!isNaN(bookId)) {
      const data = getBook(bookId - 1);
      if (data !== undefined) {
        return NextResponse.json(getBook(bookId - 1));
      }
    }
  }

  return NextResponse.json(null);
}
