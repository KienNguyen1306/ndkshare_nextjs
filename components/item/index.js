"use client";
import "./item.css";
import { useRouter } from "next/navigation";
function ItemMain({ collum, item }) {
  const router = useRouter();

  const handleClick = () => {
    if (item.cate === "game") {
      router.push(`/modgame/${item.id}`, { scroll: true });
    }
    if (item.cate === "courses") {
      router.push(`/shareCourse/${item.id}`, { scroll: true });
    }
  };
  return (
    <div onClick={handleClick} className={`item ${collum ? "" : "row"}`}>
      <div className="image">
        <img src={item?.image} alt={item?.name} />
      </div>
      <div className="content">
        <h6 className="name line-clamp-2">{item?.name} </h6>
        {!collum && <p className="sub line-clamp-2"> sub: {item?.sub}</p>}
        {item?.cate === "game" && (
          <p className="sub line-clamp-2"> Mod: {item?.mods}</p>
        )}
      </div>
    </div>
  );
}

export default ItemMain;
