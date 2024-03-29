"use client";
import { usePagination } from "../../hook/usePagination";
import { useEffect } from "react";
import { getCoures } from "@/lib/shareCouresSlice";
import { useDispatch, useSelector } from "react-redux";
import Search from "@/components/search";
import Pagination from "@/components/Pagination";
import ItemMain from "@/components/item";
import LoadingFetch from "@/components/Loadingfetch";
import AlertsComponent from "@/components/AlertsComponent";
function ShareCourse() {
  const datas = useSelector((state) => state.courses.lists);
  const totalItems = useSelector((state) => state.courses.totalCount);
  const totalPages = useSelector((state) => state.courses.totalPages);
  const loading = useSelector((state) => state.courses.loading);
  const error = useSelector((state) => state.courses.error);



  const dispatch = useDispatch();

  const { currentPage, handleClickPage, handleNextPage, handlePrevPage } =
    usePagination(totalPages);

  useEffect(() => {
    dispatch(getCoures({ page: currentPage }));
  }, [currentPage, dispatch]);
  return (
    <div>
      <Search type={2} />
      <h4>ShareCourse: Có :{totalItems} khóa học </h4>
      <LoadingFetch type="bars" loading={loading}/>
      {error && <AlertsComponent error={error}/>}
      <div className="products">
        <div className="body">
          {datas.map((item, index) => {
            return <ItemMain key={index} item={item} collum />;
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
    </div>
  );
}

export default ShareCourse;
