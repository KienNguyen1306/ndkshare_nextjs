"use client";

import AlertsComponent from "@/components/AlertsComponent";
import LoadingFetch from "@/components/Loadingfetch";
import Search from "@/components/search";
import VideoItem from "@/components/videosItem";
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
  const loading = useSelector((state) => state.courses.lessons.loading);
  const error = useSelector((state) => state.courses.lessons.error);
  const nameLessons = useSelector((state) => state.courses.lessons.nameLessons);
  const dataCoures = useSelector((state) => state.courses.lessons.dataCoures);



  const dispatch = useDispatch();
  const { currentPage, handleClickPage } = usePagination(totalPages);

  useEffect(() => {
    dispatch(getDetailCourses({ id: params.shareCourseID, page: currentPage }));
  }, [currentPage, dispatch, params.shareCourseID]);
  useEffect(() => {
    if (dataCoures?.name) {
      document.title = dataCoures?.name;
    }
  }, [dataCoures?.name]);
  return (
    <div>
      <div className="video_main">
        <Search type={2} />
        <h2>Có {totalItems} bài học</h2>
        <LoadingFetch type="bars" loading={loading} />
        {error && <AlertsComponent error={error}/>}

        {datas.map((item, index) => {
          return (
            <div key={index}>
              <VideoItem item={item} />
            </div>
          );
        })}
      </div>
      <h2 className="title_h2">Danh sách các bài học :</h2>
      <ul className="list_lessons">
        {nameLessons.map((item, index) => {
          return (
            <li
              key={index}
              className={currentPage === index + 1 && "color-bl"}
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
