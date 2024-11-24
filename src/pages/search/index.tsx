import SearchableLayout from "@/components/searchable-layout";
// import { useRouter } from "next/router";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import Head from "next/head";

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const q = context.query.q;
	const books = await fetchBooks(q as string);
	return {
		props: {
			books,
		},
	};
};

export default function Page({
	books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	// 쿼리 스트링으로 주소에서 값을 가져오기 위해 useRouter 훅 사용
	// const router = useRouter();
	// const { q }= router.query;

	return (
		<>
			<Head>
				<title>한입북스 - 검색결과</title>
				<meta property='og:image' content='/thumbnail.png' />
				<meta property='og:title' content='한입북스 - 검색결과' />
				<meta
					property='og:description'
					content='한입 북스에 등록된 도서들을 만나보세요.'
				/>
			</Head>
			<div>
				{books.map((book) => (
					<BookItem key={book.id} {...book} />
				))}
			</div>
		</>
	);
}

Page.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
