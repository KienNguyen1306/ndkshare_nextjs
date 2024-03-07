"use client";

import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../hook/usePagination";

import { useEffect } from "react";
import { getGameMod } from "@/lib/modgameSlice";
import ListProducts from "@/components/ListProducts";
import Pagination from "@/components/Pagination";
import Search from "@/components/search";
import LoadingFetch from "@/components/Loadingfetch";
import AlertsComponent from "@/components/AlertsComponent";
export default function Home() {
  const {
    lists: datas,
    totalPages,
    totalCount: totalItems,
    loading,
    error
  } = useSelector((state) => state.modgame);
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
      <LoadingFetch type="bars" loading={loading}/>
      {error && <AlertsComponent error={error}/>}
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
