"use client";

import AlertsComponent from "@/components/AlertsComponent";
import ListLession from "@/components/ListLession";
import LoadingFetch from "@/components/Loadingfetch";
import Pagination from "@/components/Pagination";
import Comment from "@/components/comment";
import Search from "@/components/search";
import VideoItem from "@/components/videosItem";
import { usePagination } from "@/hook/usePagination";
import { getCommentCoures, getDetailCourses, postCouresComment } from "@/lib/shareCouresSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CoureseDetail() {
  const params = useParams();
  const dispatch = useDispatch();

  const { dataconver, dataCoures, detailLession, loading, error } = useSelector(
    (state) => state.courses.lessons
  );
  const { list, totalCountCmt, totalPagesCmt } = useSelector(
    (state) => state.courses.comments
  );
  const { currentPage, handleClickPage, handleNextPage, handlePrevPage } =
    usePagination(totalPagesCmt, false);

  useEffect(() => {
    dispatch(getDetailCourses({ id: params.shareCourseID }));
  }, [dispatch, params.shareCourseID]);

  useEffect(() => {
    dispatch(getCommentCoures({ id: params.shareCourseID, page: currentPage }));
  }, [currentPage, dispatch, params.shareCourseID]);

  useEffect(() => {
    if (detailLession?.name) {
      document.title = detailLession?.name;
    }
  }, [detailLession?.name]);


  function handleComment(data) {
    let res = {
      cmt: data.textarea,
      fullname: data.user.name,
      image: data.user.image,
      id_courese:  params.shareCourseID,
      id_user: data.user.id,
    };
    dispatch(postCouresComment(res))
  }
  return (
    <div>
      <div className="video_main">
        <Search type={2} />
        <h2 className="mb-4">{dataCoures[0]?.name}</h2>
        <LoadingFetch type="bars" loading={loading} />
        {error && <AlertsComponent error={error} />}
        {!loading && <VideoItem linkvideo={detailLession?.linkvideo} />}
        <h2 className=" mt-10">{detailLession?.name}</h2>
      </div>
      <h2 className="title_h2 mt-10 mb-10">Danh sách các bài học :</h2>
      <div className="bg-white mx-auto p-6 rounded-lg">
        {dataconver.map((item) => {
          return <ListLession key={item.id} item={item} />;
        })}
      <Comment list={list} totalCountCmt={totalCountCmt}  handleComment={handleComment}/>
      {totalPagesCmt > 1 && (
        <Pagination
          totalPages={totalPagesCmt}
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

export default CoureseDetail;
