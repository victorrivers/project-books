import { getAllBooks } from "lib/data/data-source";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const takeParam = searchParams.get("take");
  const skipParam = searchParams.get("skip");

  const take = takeParam ? parseInt(takeParam) : 20;
  const skip = skipParam ? parseInt(skipParam) : 0;

  const query = searchParams.get("query");

  if (query) {
    return NextResponse.json(
      getAllBooks(1000)
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 20)
    );
  }

  return NextResponse.json(getAllBooks(take, skip));
}
