import { memo } from "react";
import classes from "./Pagination.module.scss";

const NEXT_PAGE = "NEXT";
const PREV_PAGE = "PREV";

const Pagination = ({ currentPage, total, setCurrentPage }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === total;

  const paginationHandler = (action) => {
    if (action === NEXT_PAGE && currentPage < total) {
      setCurrentPage((prevState) => prevState + 1);
    }
    if (action === PREV_PAGE && currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };

  return (
    <div className={classes.Wrapper}>
      <button
        onClick={() => paginationHandler(PREV_PAGE)}
        className={isFirstPage ? classes.Hidden : null}
      >
        Prev
      </button>
      <p className={classes.Pagination}>
        Page: {currentPage} / {total > 0 ? total : 1}
      </p>
      <button
        onClick={() => paginationHandler(NEXT_PAGE)}
        className={isLastPage ? classes.Hidden : null}
      >
        Next
      </button>
    </div>
  );
};

export default memo(Pagination);
