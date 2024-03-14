"use client";

import { formatDateTime } from "@/helper";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Comment({ list, totalCountCmt ,handleComment}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [textarea,setTextarea] =useState('')

  return (
    <div className="bg-gray-100 w-fullbg-white rounded-lg border p-1 md:p-3 m-1">
      <h3 className="font-semibold p-1">
         Có {totalCountCmt} bình luận
      </h3>
      {session ? (
        <>
          <div className="w-full px-3 mb-2 mt-6">
            <textarea
              className=" rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Comment"
              required=""
              defaultValue={""}
              onChange={(e)=>setTextarea(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-end px-3 my-3">
            <input
              type="submit"
              onClick={()=>handleComment({textarea,user:session.user})}
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg cursor-pointer"
              defaultValue="Comment"
            />
          </div>
        </>
      ) : (
        <div
          className="my-2 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 cursor-pointer"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <Link href={`/login?next=${pathname}`}>
            Vui lòng đăng nhập để comment. Đăng nhập
          </Link>
        </div>
      )}

      <div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="flex w-full justify-between border rounded-md mt-5 bg-white"
            >
              <div className="p-3">
                <div className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                    alt="avata"
                  />
                  <h3 className="font-bold">
                    {item.fullname}{" "}
                    <span className="text-sm text-zinc-500 font-thin">
                      {formatDateTime(item?.create_time)}
                    </span>
                    <br />
                    {/* <span className="text-sm text-gray-400 font-normal">Level 1</span> */}
                  </h3>
                </div>
                <p className="text-gray-600 mt-2">{item.cmt}</p>
                {/* <button className="text-right text-blue-500">Reply</button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comment;
