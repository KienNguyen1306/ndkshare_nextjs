import { useState } from "react";

export function usePagination(totalPages) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleClickPage = (page) => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    setCurrentPage(page);
  };
  const handleNextPage = (currentPage) => {
    if (currentPage < totalPages) {
      window.scrollTo({top: 0, behavior: 'smooth'})
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = (currentPage) => {
    if (currentPage > 1) {
      window.scrollTo({top: 0, behavior: 'smooth'})
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
