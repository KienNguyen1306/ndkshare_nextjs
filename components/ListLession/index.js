"use client";
import { handleShowTitleLession } from "@/lib/shareCouresSlice";
import { useDispatch } from "react-redux";
import { IconAdd, IconMinus } from "../Icon";
import LessionItem from "./LessionItem";

function ListLession({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cursor-pointer rounded-lg">
      <div
        className="mb-4"
        onClick={() => dispatch(handleShowTitleLession(item.id))}
      >
        <div className="flex items-center justify-between bg-gray-200 pl-3 pr-2 py-3 w-full rounded text-gray-600 font-bold cursor-pointer hover:bg-gray-300">
          {item.name}
          {item.open ? <IconAdd /> : <IconMinus />}
        </div>
        <LessionItem open={item.open} list={item?.children} />
      </div>
    </div>
  );
}

export default ListLession;
