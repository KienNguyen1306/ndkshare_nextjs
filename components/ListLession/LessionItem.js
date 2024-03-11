import { handleUpdateDetaiLession } from "@/lib/shareCouresSlice";
import { useDispatch, useSelector } from "react-redux";
function LessionItem({ list, open }) {
  const { detailLession } = useSelector((state) => state.courses.lessons);
  const dispatch = useDispatch();
  return (
    <div
      className={`overflow-hidden transition-all duration-15000 ease-in-out ${
        open ? "p-1 h-auto" : "p-0 h-0"
      }`}
    >
      {list.length > 0 ? (
        <>
          {list.map((item) => {
            return (
              <p
                key={item.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  dispatch(handleUpdateDetaiLession(item.id));
                }}
                className={`mb-3 cursor-pointer ${
                  detailLession.id === item.id && "underline text-blue-600"
                }`}
              >
                {item.name}
              </p>
            );
          })}
        </>
      ) : (
        <p className="text-gray-600 mb-3 cursor-pointer">Đang cập nhập</p>
      )}
    </div>
  );
}

export default LessionItem;
