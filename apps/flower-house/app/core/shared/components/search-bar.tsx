import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

// onSearch 함수의 타입을 지정합니다. 이 함수는 문자열을 인자로 받고 반환값은 없습니다.
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

// 검색창 컴포넌트 정의. props의 타입으로 SearchBarProps를 사용합니다.
const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
  const [query, setQuery] = useState<string>(""); // 검색어 상태 관리. query의 타입을 string으로 지정합니다.

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    if (!query.trim()) return; // 검색어가 비어있으면 함수 종료
    onSearch(query); // 검색 실행 함수 호출
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // 입력 필드 값 변경 시 상태 업데이트. e의 타입을 ChangeEvent<HTMLInputElement>로 지정합니다.
  };

  return (
    <div className="mt-4 mx-auto w-10/12 md:w-4/12 z-10 rounded-xl  shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-xl bg-white overflow-hidden"
      >
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-3 border-none focus:ring-0 focus:outline-none focus:border-none"
          value={query}
          enterKeyHint="search"
          inputMode="search"
          onChange={handleChange} // 입력 필드 값 변경 시 상태 업데이트. e의 타입을 ChangeEvent<HTMLInputElement>로 지정합니다.
        />
        <button type="submit" className="p-3">
          <Image src="/icons/search.svg" width={20} height={20} alt="search" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
