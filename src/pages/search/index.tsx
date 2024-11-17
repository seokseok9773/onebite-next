import SearchableLayout from "@/components/searchable-layout";
// import { useRouter } from "next/router";
import { ReactNode } from "react";
import books from '@/Mock/books.json';
import BookItem from "@/components/book-item";


export default function Page() {
  // 쿼리 스트링으로 주소에서 값을 가져오기 위해 useRouter 훅 사용
  // const router = useRouter();
  // const { q }= router.query;

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book}/>
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}