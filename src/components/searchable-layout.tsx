import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react'
import style from '@/components/searchable-layout.module.css'

function SearchableLayout({ children } : {children: ReactNode}) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onSumbit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`)
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSumbit();
    }
  }

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          placeholder='검색어를 입력하세요...'
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSumbit}>검색</button>
      </div>
      {children}
    </div>
  )
}

export default SearchableLayout