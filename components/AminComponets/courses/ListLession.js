"use client";
import Pagination from "@/components/Pagination";
import { usePagination } from "@/hook/usePagination";
import { deleteCoures, getCoures } from "@/lib/shareCouresSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ListLession({}) {
  const datas = useSelector((state) => state.courses.lessons.list);
  const totalPages = useSelector((state) => state.courses.lessons.totalPages);
  const dispatch = useDispatch();
  const { currentPage, handleClickPage, handleNextPage, handlePrevPage } =
    usePagination(totalPages);

  function handleDeleteCoures(id) {
    dispatch(deleteCoures(id))
  }

  useEffect(() => {
    dispatch(getCoures({ page: currentPage }));
  }, [currentPage, dispatch]);
  return (
    <>
      <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Danh sách Bài học
      </h1>
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
                      onClick={() => handleDeleteCoures(item?.id)}
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
