import { useState } from "react";

export function usePagination(totalPages,scroll) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleClickPage = (page) => {
    console.log('scroll',scroll)
    if(scroll===true){
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
    setCurrentPage(page);
  };
  const handleNextPage = (currentPage) => {
    if (currentPage < totalPages) {
      if(scroll){
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = (currentPage) => {
    if (currentPage > 1) {
      if(scroll){
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
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
