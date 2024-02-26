"use client";

import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/search";
import VideoItem from "@/app/components/videosItem";
import { callAPI } from "@/app/fechApi";
import { usePagination } from "@/app/hook/usePagination";
import { useParams } from "next/navigation";

function CoureseDetail() {
  const params = useParams();
  const {
    datas,
    totalPages,
    currentPage,
    totalItems,
    nameLessonsCourses,
    handleClickPage,
    handleNextPage,
    handlePrevPage,
  } = usePagination( {initialUrl:`/courses/${params.shareCourseID}`});

  return (
    <div>
      <div className="video_main">
      <Search type={2}/>
        <h2>Có {totalItems} bài học</h2>
        {datas.map((item) => {
          return (
            <div>
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
        {nameLessonsCourses.map((item, index) => {
          return (
            <li
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
