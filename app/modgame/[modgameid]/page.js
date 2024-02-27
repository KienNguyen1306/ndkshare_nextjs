"use client" 
import { useParams } from "next/navigation";
import "./modgame.css";
import Comment from "@/app/components/comment";
import { useEffect, useState } from "react";
import { callAPI } from "@/fechApi";
import Search from "@/app/components/search";

function ModGameDetail() {
  const [detail,setDetail]=useState()
  const params = useParams()
  
  useEffect(()=>{
    callAPI(`/modgames/${params.modgameid}`,setDetail)
  },[params.modgameid])
  return (
    <div className="modgamedetai">
      <Search type={1}/>
      <div className="body">
        <h4 className="modgamedetai-name">{detail?.name}</h4>
        <div className="image">
          <img
            src={detail?.image}
            alt={detail?.name}
          />
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
          <a
            className="dowload"
            target="_blank"
            href={detail?.link}
          >
            <span>Tải xuống</span> : {detail?.name}
          </a>
        </div>
      </div>
      <Comment/>
    </div>
  );
}

export default ModGameDetail;
