"use client";
import { getSearchGame } from "@/lib/modgameSlice";
import { getSearchCourese } from "@/lib/shareCouresSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../../hook/usePagination";
import Search from "@/components/search";
import ItemMain from "@/components/item";
import Pagination from "@/components/Pagination";

function SearchPage() {
  const dispatch = useDispatch();
  const {
    lists: datas,
    totalPages,
    totalCount: totalItems,
  } = useSelector((state) => state.modgame.searchgame);
  const searchParams = useSearchParams();
  let k = searchParams.get("k");
  let type = searchParams.get("type");
  const { currentPage, handleClickPage, handleNextPage, handlePrevPage } =
    usePagination();

  useEffect(() => {
    if (type === "1") dispatch(getSearchGame({ k: k, page: currentPage }));
    if (type === "2") dispatch(getSearchCourese({ k: k, page: currentPage }));
  }, [currentPage, dispatch, k, type]);
  return (
    <div className="products colums">
      <Search type={type} />
      <h5>
        Có : {totalItems} Kết quả tìm kiếm từ {k}
      </h5>
      <div className="body">
        {datas.map((item, index) => {
          return (
            <>
              <ItemMain key={index} item={item} />
            </>
          );
        })}
      </div>
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

export default SearchPage;
