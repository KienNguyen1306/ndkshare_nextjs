import { useState } from "react";

export function usePagination(totalPages) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleClickPage = (page) => {
    setCurrentPage(page);
  };
  const handleNextPage = (currentPage) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = (currentPage) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return {
    currentPage,
    handleClickPage,
    handleNextPage,
    handlePrevPage,
  };
}
