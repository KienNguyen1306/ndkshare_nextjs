"use client";

import AlertsComponent from "@/components/AlertsComponent";
import ListLession from "@/components/ListLession";
import LoadingFetch from "@/components/Loadingfetch";
import Search from "@/components/search";
import VideoItem from "@/components/videosItem";
import { getDetailCourses } from "@/lib/shareCouresSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CoureseDetail() {
  const params = useParams();
  const [currentLession, setCurrenrLession] = useState(0);
  const [showLessionTitle, setShowLessionTitle] = useState(0);

  const { dataconver, dataCoures, dataLission, loading, error } = useSelector(
    (state) => state.courses.lessons
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailCourses({ id: params.shareCourseID }));
  }, [dispatch, params.shareCourseID]);

  useEffect(() => {
    if (dataCoures[currentLession]?.name) {
      document.title = dataCoures[currentLession]?.name;
    }
  }, [currentLession, dataCoures]);

  function handleClicklession(id,showLessionTitle) {
    setCurrenrLession(dataLission.findIndex((item)=>item.id === id));
    setShowLessionTitle(showLessionTitle)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleShowLessionTitle(index){
    setShowLessionTitle(index)
  }
  return (
    <div>
      <div className="video_main">
        <Search type={2} />
        <h2 className="mb-20">{dataCoures[0]?.name}</h2>
        <LoadingFetch type="bars" loading={loading} />
        {error && <AlertsComponent error={error} />}
        <VideoItem linkvideo={dataLission[currentLession]?.linkvideo} />
        <h2 className=" mt-10">{dataLission[currentLession]?.name}</h2>
      </div>
      <h2 className="title_h2 mt-10 mb-10">Danh sách các bài học :</h2>
      {/* component */}
      <div className="bg-white mx-auto p-6">
        {dataconver.map((item,index) => {
          return (
            <ListLession
              key={item.id}
              item={item}
              index={index}
              showLessionTitle={showLessionTitle}
              handleShowLessionTitle={handleShowLessionTitle}
              handleClicklession={handleClicklession}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CoureseDetail;
