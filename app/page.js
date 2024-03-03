"use client";

import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../hook/usePagination";

import { useEffect } from "react";
import { getGameMod } from "@/lib/modgameSlice";
import ListProducts from "@/components/ListProducts";
import Pagination from "@/components/Pagination";
import Search from "@/components/search";
export default function Home() {
  const datas = useSelector((state) => state.modgame.lists);
  const totalPages = useSelector((state) => state.modgame.totalPages);
  const totalItems = useSelector((state) => state.modgame.totalCount);

  const dispatch = useDispatch();
  const { currentPage, handleClickPage, handleNextPage, handlePrevPage } =
    usePagination(totalPages);

  useEffect(() => {
    dispatch(getGameMod({ page: currentPage }));
  }, [currentPage, dispatch]);

  return (
    <div>
      <Search type={1} />
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
