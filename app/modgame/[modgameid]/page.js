"use client";
import LoadingFetch from "@/components/Loadingfetch";
import Comment from "@/components/comment";
import Search from "@/components/search";
import { getComment, getDetailGame, postGameComment } from "@/lib/modgameSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./modgame.css";
import AlertsComponent from "@/components/AlertsComponent";
import { usePagination } from "@/hook/usePagination";
import Pagination from "@/components/Pagination";

function ModGameDetail() {
  const params = useParams();
  const detail = useSelector((state) => state.modgame.gameDetail);
  const { list, totalCountCmt, totalPagesCmt } = useSelector(
    (state) => state.modgame.comments
  );

  const loading = useSelector((state) => state.modgame.gameDetail.loading);
  const error = useSelector((state) => state.modgame.gameDetail.error);

  const { currentPage, handleClickPage, handleNextPage, handlePrevPage } =
    usePagination(totalPagesCmt, false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailGame(params.modgameid));
  }, [dispatch, params.modgameid]);

  useEffect(() => {
    dispatch(getComment({ id: params.modgameid, page: currentPage }));
  }, [currentPage, dispatch, params.modgameid]);

  useEffect(() => {
    if (detail?.name) {
      document.title = detail?.name;
    }
  }, [detail?.name]);

  function handleComment(data) {
    let res = {
      cmt: data.textarea,
      fullname: data.user.name,
      image: data.user.image,
      id_game: params.modgameid,
      id_user: data.user.id,
    };
    dispatch(postGameComment(res))
  }
  return (
    <div>
      <Search type={1} />
      {loading || error ? (
        <>
          <LoadingFetch type="balls" loading={loading} />
          {error && <AlertsComponent error={error} />}
        </>
      ) : (
        <div className="modgamedetai">
          <div className="body">
            <h4 className="modgamedetai-name">{detail?.name}</h4>
            <div className="image">
              <img src={detail?.image} alt={detail?.name} />
            </div>
            <div className="detail-content">
              <p className="detail-content-sub">
                <span>version</span>: 1112154
              </p>
              <p className="detail-content-sub">
                <span>{detail?.name}</span>: {detail?.sub}
              </p>
              <p className="detail-content-sub">
                <span>Chức năng</span>: {detail?.mods}
              </p>
              <a className="dowload" target="_blank" href={detail?.link}>
                <span>Tải xuống</span> : {detail?.name}
              </a>
            </div>
          </div>
          {totalPagesCmt > 0 &&  <Comment
            list={list}
            totalCountCmt={totalCountCmt}
            handleComment={handleComment}
          />}
         {totalPagesCmt > 1 && <Pagination
            totalPages={totalPagesCmt}
            handleClickpage={handleClickPage}
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />}
          
        </div>
      )}
    </div>
  );
}

export default ModGameDetail;
