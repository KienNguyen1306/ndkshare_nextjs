"use client";
import { usePagination } from "../hook/usePagination";
import ItemMain from "../components/item";
import Pagination from "../components/Pagination";
import { useSearchParams } from "next/navigation";
import Search from "../components/search";

function SearchPage() {
  const searchParams = useSearchParams();
  let k = searchParams.get("k");
  let type = searchParams.get("type");
  let url = "";
  if (type === "1") {
    url = `/modgames/searchgame?k=${k}`;
  }
  if (type === "2") {
    url = `/courses/searchcourses?k=${k}`;
  }
  const {
    datas,
    totalPages,
    currentPage,
    totalItems,
    handleClickPage,
    handleNextPage,
    handlePrevPage,
  } = usePagination({ initialUrl: url });

  return (
    <div className="products colums">
      <Search type={type} />
      <h5>GAME MOD BY NDK : Có : {totalItems} game</h5>
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
