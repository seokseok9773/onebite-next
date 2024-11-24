import type { BookData } from "@/types";

export default async function FetchRandomBooks(): Promise<BookData[]> {
  const url = 'https://onebite-books-server-main-gilt.vercel.app/book/random';

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
