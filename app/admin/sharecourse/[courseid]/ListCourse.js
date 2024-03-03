"use client";
import { usePagination } from "@/hook/usePagination";
import { deleteGame } from "@/lib/modgameSlice";
import { deleteCoures, getCoures } from "@/lib/shareCouresSlice";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination";
function ListCourse({}) {
  const datas = useSelector((state) => state.courses.lists);
  const totalPages = useSelector((state) => state.courses.totalPages);

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
        Danh sách khóa học
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Taitle
              </th>
              <th scope="col" className="px-6 py-3">
                {" Time"}
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
                    <img
                      className="w-auto img"
                      src={item?.image}
                      alt={item?.name}
                    />
                  </th>
                  <td className="px-6 py-2 line-clamp-2">
                    {" "}
                    <p className="line-clamp-2">{item?.sub}</p>
                  </td>
                  <td className="px-6 py-2">
                    {dayjs(item?.create_date).format("YYYY-MM-DD")}
                  </td>
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

export default ListCourse;
