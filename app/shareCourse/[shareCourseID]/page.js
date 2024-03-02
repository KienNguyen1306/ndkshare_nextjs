"use client";

import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/search";
import VideoItem from "@/app/components/videosItem";
import { callAPI } from "@/fechApi";
import { usePagination } from "@/hook/usePagination";
import { getDetailCourses } from "@/lib/shareCouresSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function CoureseDetail() {
  const params = useParams();
  const datas = useSelector((state) => state.courses.lessons.list);
  const totalPages = useSelector((state) => state.courses.lessons.totalPages);
  const totalItems = useSelector((state) => state.courses.lessons.totalCount);
  const nameLessons = useSelector((state) => state.courses.lessons.nameLessons);



  const dispatch = useDispatch();

  const {
    currentPage,
    handleClickPage,
    handleNextPage,
    handlePrevPage,
  } = usePagination(totalPages);


  useEffect(()=>{
    dispatch(getDetailCourses({id:params.shareCourseID,page:currentPage}));
  },[currentPage, dispatch, params.shareCourseID])
  return (
    <div>
      <div className="video_main">
      <Search type={2}/>
        <h2>Có {totalItems} bài học</h2>
        {datas.map((item,index) => {
          return (
            <div key={index}>
              <VideoItem item={item} />
            </div>
          );
        })}
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
      <h2 className="title_h2">Danh sách các bài học :</h2>
      <ul className="list_lessons">
        {nameLessons.map((item, index) => {
          return (
            <li key={index}
              onClick={() => {
                handleClickPage(index + 1);
              }}
            >
              {item?.name} {index + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CoureseDetail;
