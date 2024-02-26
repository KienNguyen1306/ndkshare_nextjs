"use client";
import { Suspense, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ItemMain from "../components/item";
import { callAPI } from "../fechApi";
import URL from "../constans/baseUrl";
import Loading from "./loading";
import { usePagination } from "../hook/usePagination";
import Search from "../components/search";
function ShareCourse() {
  const {
    datas,
    totalPages,
    currentPage,
    totalItems,
    handleClickPage,
    handleNextPage,
    handlePrevPage,
  } = usePagination({initialUrl:"/courses"});

  return (
    <div>
       <Search type={2}/>
      <h4>ShareCourse: Có :{totalItems} khóa học </h4>
      <div className="products">
        <div className="body">
          {datas.map((item) => {
            return <ItemMain item={item} collum />;
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
