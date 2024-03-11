"use client";

import AlertsComponent from "@/components/AlertsComponent";
import ListLession from "@/components/ListLession";
import LoadingFetch from "@/components/Loadingfetch";
import Search from "@/components/search";
import VideoItem from "@/components/videosItem";
import { getDetailCourses } from "@/lib/shareCouresSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CoureseDetail() {
  const params = useParams();

  const { dataconver, dataCoures, detailLession, loading, error } = useSelector(
    (state) => state.courses.lessons
  );

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getDetailCourses({ id: params.shareCourseID }));
  }, [dispatch, params.shareCourseID]);

  useEffect(() => {
    if (detailLession?.name) {
      document.title = detailLession?.name;
    }
  }, [detailLession?.name]);

  return (
    <div>
      <div className="video_main">
        <Search type={2} />
        <h2 className="mb-4">{dataCoures[0]?.name}</h2>
        <LoadingFetch type="bars" loading={loading} />
        {error && <AlertsComponent error={error} />}
        <VideoItem linkvideo={detailLession?.linkvideo} />
        <h2 className=" mt-10">{detailLession?.name}</h2>
      </div>
      <h2 className="title_h2 mt-10 mb-10">Danh sách các bài học :</h2>
      {/* component */}
      <div className="bg-white mx-auto p-6 rounded-lg">
        {dataconver.map((item) => {
          return <ListLession key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default CoureseDetail;
