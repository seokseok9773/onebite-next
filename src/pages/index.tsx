import style from "./index.module.css";
import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
// import books from "@/Mock/books.json";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import {
	// InferGetServerSidePropsType,
	InferGetStaticPropsType,
} from "next";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";
// import { getStaticProps } from "next/dist/build/templates/pages";

/* 
getServerSideProps 라는 Next의 예약어를 사용하면 해당 코드가 있는 페이지는 
서버 사이드 렌더링으로 동작하게 된다.
*/
// export const getServerSideProps = async () => {
//   // 직렬 구조로 데이터를 불러오는 형식
//   // const allBooks = await fetchBooks();
//   // const recoBooks = await fetchRandomBooks();

//   // allBooks 와 rocoBooks를 병렬형태로 가져오기
//   // Promise라는 메서드는 인수로 전달한 배열안의 모든 비동기 함수를 실행시켜줌
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

export const getStaticProps = async () => {
	const [allBooks, recoBooks] = await Promise.all([
		fetchBooks(),
		fetchRandomBooks(),
	]);

	return {
		props: {
			allBooks,
			recoBooks,
		},
	};
};

export default function Home({
	allBooks,
	recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Head>
				<title>한입북스</title>
				<meta property='og:image' content='/thumbnail.png' />
				<meta property='og:title' content='한입북스' />
				<meta
					property='og:description'
					content='한입 북스에 등록된 도서들을 만나보세요.'
				/>
			</Head>
			<div className={style.container}>
				<section>
					<h3>지금 추천하는 도서</h3>
					{recoBooks.map((book) => (
						<BookItem key={book.id} {...book} />
					))}
				</section>
				<section>
					<h3>등록된 모든 도서</h3>
					{allBooks.map((book) => (
						<BookItem key={book.id} {...book} />
					))}
				</section>
			</div>
		</>
	);
}

Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
