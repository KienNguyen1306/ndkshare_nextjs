"use client";
import "./item.css";
import { useRouter } from "next/navigation";
function itemMain({ collum, item }) {
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
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default itemMain;
