import { handleUpdateDetaiLession } from "@/lib/shareCouresSlice";
import { useDispatch } from "react-redux";

function LessionItem({ list }) {
  const dispatch = useDispatch();

  return (
    <div className="p-3">
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
                className="text-gray-600 mb-3 cursor-pointer"
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
