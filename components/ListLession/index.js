"use client";
import { useState } from "react";
import LessionItem from "./LessionItem";
import { useDispatch } from "react-redux";
import { handleShowTitleLession } from "@/lib/shareCouresSlice";
import { IconAdd, IconMinus } from "../Icon";

function ListLession({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cursor-pointer">
      <div
        className="mb-4"
        onClick={() => dispatch(handleShowTitleLession(item.id))}
      >
        <div className="flex items-center justify-between bg-gray-200 pl-3 pr-2 py-3 w-full rounded text-gray-600 font-bold cursor-pointer hover:bg-gray-300">
          {item.name}
          {item.open ? <IconAdd /> : <IconMinus />}
        </div>
        {item.open && <LessionItem list={item?.children} />}
      </div>
    </div>
  );
}

export default ListLession;
