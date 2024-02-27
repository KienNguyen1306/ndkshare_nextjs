import { useEffect, useState } from "react";
import { callAPI } from "../fechApi"; // Thay thế bằng module gọi API thực tế của bạn
import { formatUrl } from "../helper";

export function usePagination({ initialUrl }) {
  const [datas, setData] = useState([]);
  const [nameLessonsCourses, setNameLessonsCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData(initialUrl);
  }, [initialUrl]);

  const fetchData = (url) => {
    callAPI(url, setData, setTotalPages, setTotalItems, setNameLessonsCourses);
  };

  const handleClickPage = (page) => {
    fetchData(formatUrl(initialUrl,page));
    setCurrentPage(page);
  };
  const handleNextPage = (currentPage) => {
    if (currentPage < totalPages) {
      fetchData(formatUrl(initialUrl,currentPage + 1));
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = (currentPage) => {
    if (currentPage > 1) {
      fetchData(formatUrl(initialUrl,currentPage - 1));
      setCurrentPage(currentPage - 1);
    }
  };
  return {
    datas,
    totalPages,
    currentPage,
    totalItems,
    nameLessonsCourses,
    handleClickPage,
    handleNextPage,
    handlePrevPage,
  };
}
