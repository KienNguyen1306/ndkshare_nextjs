
import "./videoitem.css";

function VideoItem({ item }) {
  return (
   
      <div className="video">
        <iframe
        className="iframe_video"
          width="560"
          height="315"
          src={item?.linkvideo}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          loading="lazy"
        ></iframe>
        <h3 className="video_name">{item?.name}</h3>
      </div>
    
  );
}

export default VideoItem;
