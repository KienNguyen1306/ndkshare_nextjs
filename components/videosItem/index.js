"use client";
import { useEffect, useState } from "react";
import "./videoitem.css";
import ReactLoading from "react-loading";

function VideoItem({ linkvideo }) {
  const [loading, setloading] = useState(true);

  function handleIframeLoad() {
    setloading(false);
  }

  useEffect(() => {
    setloading(true);
  }, [linkvideo]);
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-96">
          <ReactLoading type="cylon" color="#1d4ed8" />
        </div>
      )}
      <div className="container">
        <iframe
          className="responsive-iframe"
          src={linkvideo}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
          style={{ display: loading ? "none" : "block" }}
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </>
  );
}

export default VideoItem;
