import type { BookData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import style from "@/components/book-item.module.css";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <Image
        className={style.image}
        src={coverImgUrl}
        alt={"이미지를 찾을 수 없습니다."}
        width={80}
        height={100}
      />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
