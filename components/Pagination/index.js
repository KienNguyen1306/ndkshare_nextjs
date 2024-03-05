import "./pagination.css";
function Pagination({
  totalPages,
  handleClickpage,
  currentPage,
  handleNextPage,
  handlePrevPage,
}) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="paginationn">
    <nav aria-label="paginationn Page navigation example">
      <ul className="flex items-center flex-wrap items-center -space-x-px text-sm">
        <li
          onClick={() => {
            handlePrevPage(currentPage);
          }}
        >
          <a
            href="#"
            className="flex mb-2 items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        {pages.map((item, index) => {
          return (
            <li key={index} onClick={() => handleClickpage(item)}>
              <a
                href="#"
                className={
                  currentPage === item
                    ? "flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border-blue-300 border bg-blue-100 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white mb-2"
                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white mb-2"
                }
              >
                {item}
              </a>
            </li>
          );
        })}
        <li
          onClick={() => {
            handleNextPage(currentPage);
          }}
        >
          <a
            href="#"
            className="mb-2 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>

    </div>
  );
}

export default Pagination;
