import fetchOneBooks from "@/lib/fetch-one-books";
import style from "@/pages/book/[id].module.css";
import {
	// GetServerSidePropsContext,
	GetStaticPropsContext,
	// InferGetServerSidePropsType,
	InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params!.id;
//   const book = await fetchOneBooks(Number(id));
//   return {
//     props: { book },
//   };
// };

export const getStaticPaths = () => {
	return {
		paths: [
			{ params: { id: "1" } },
			{ params: { id: "2" } },
			{ params: { id: "3" } },
		],
		// 대체, 대비책
		// 역할 : 없는 경로로 요청을 보내게 되면 fallback을 실행시킴
		// 3가지 옵션이 존재
		fallback: true,
		// false: 404 Not Found
		// blocking : SSR방식
		// true: SRR 방식 + 데이터가 없는 풀백 상태의 페이지부터 반환
	};
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const id = context.params!.id;
	const book = await fetchOneBooks(Number(id));

	if (!book) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			book,
		},
	};
};

export default function Page({
	book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	if (router.isFallback) {
		return (
			<>
				<Head>
					<title>한입북스</title>
					<meta property='og:image' content='thumbnail.png' />
					<meta property='og:title' content='한입북스' />
					<meta
						property='og:description'
						content='한입 북스에 등록된 도서들을 만나보세요.'
					/>
				</Head>
				<div>로딩중입니다.</div>
			</>
		);
	}
	if (!book) return "문제가 발생했습니다. 다시 시도해주세요.";

	const { title, subTitle, description, author, publisher, coverImgUrl } = book;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta property='og:image' content={coverImgUrl} />
				<meta property='og:title' content={title} />
				<meta property='og:description' content={description} />
			</Head>
			<div className={style.container}>
				<div
					className={style.cover_img_container}
					style={{ backgroundImage: `url('${coverImgUrl})` }}
				>
					{/* <img src={coverImgUrl} /> */}
					<Image
						src={coverImgUrl}
						alt={"사진이 없습니다."}
						width={250}
						height={350}
					/>
				</div>
				<div className={style.title}>{title}</div>
				<div className={style.subTitle}>{subTitle}</div>
				<div className={style.author}>
					{author} | {publisher}
				</div>
				<div className={style.description}>{description}</div>
			</div>
		</>
	);
}
