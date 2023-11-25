import BookDetails from "lib/components/book-details/book-details";

export default async function Page({ params }: { params: { id: string } }) {
  return <BookDetails id={params.id} />;
}
