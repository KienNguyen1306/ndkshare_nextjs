"use client";

import { usePagination } from "../hook/usePagination";
import ListProducts from "./components/ListProducts";
import Pagination from "./components/Pagination";
import Search from "./components/search";
export default function Home() {
  const {
    datas,
    totalPages,
    currentPage,
    totalItems,
    handleClickPage,
    handleNextPage,
    handlePrevPage,
  } = usePagination( {initialUrl:"/modgames"});

  return (
    <div>
       <Search type={1}/>
      <h5>GAME MOD BY NDK : Có : {totalItems} game</h5>
      <ListProducts datas={datas} />
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          handleClickpage={handleClickPage}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
    </div>
  );
}
