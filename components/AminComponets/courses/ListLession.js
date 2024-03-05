"use client";
import Pagination from "@/components/Pagination";
import { usePagination } from "@/hook/usePagination";
import { deleteLession, getDetailCourses } from "@/lib/shareCouresSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostLession from "./PostLession";

function ListLession({}) {
  const [formLes,setFormLess]=useState(false)

  const datas = useSelector((state) => state.courses.lessons.list);
  const totalPages = useSelector((state) => state.courses.lessons.totalPages);
  const dispatch = useDispatch();

  const courseid = useParams().courseid;

  const { currentPage, handleClickPage, handleNextPage, handlePrevPage } =
    usePagination(totalPages);

  function handleDeleteLession(id) {
    dispatch(deleteLession(id));
  }

  function hanleShowForm(){
    setFormLess(!formLes)
  }
  useEffect(() => {
    dispatch(getDetailCourses({id:courseid,page:currentPage,limit:10}))
  }, [courseid, currentPage, dispatch]);


  
  return (
    <>
      <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Danh sách Bài học
      </h1>
      <button onClick={hanleShowForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5">
        Thêm danh sách bài học
      </button>
      {formLes && <PostLession/>}
     

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Lessons name
              </th>
              <th scope="col" className="px-6 py-3">
                Link video
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {datas.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="line-clamp-2">{item?.name}</p>
                  </th>
                  <th
                    scope="row"
                    className="w-40 h-10 px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="line-clamp-2">{item?.linkvideo}</p>
                  </th>
                  <td className="px-6 py-2 text-right">
                    <Link
                      href={`/admin/sharecourse/${item?.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      onClick={() => handleDeleteLession(item?.id)}
                      className="ml-5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          handleClickpage={handleClickPage}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
    </>
  );
}

export default ListLession;
