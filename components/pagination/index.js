import cx from "classnames";
import { usePagination } from "@libs/index";
import styles from "./index.module.scss";
import { DOTS } from "@const/index";
import PropTypes from "prop-types";

/**
 * Pagination component for navigating through pages.
 * @component
 * @param {function} onPageChange - Callback function triggered when a page is selected.
 * @param {number} totalCount - The total number of items to paginate.
 * @param {number} [siblingCount=1] - The number of siblings on each side of the current page.
 * @param {number} currentPage - The current active page.
 * @param {number} pageSize - The number of items per page.
 * @returns {JSX.Element|null} Returns the Pagination component JSX or null if pagination is not required.
 */
const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.pagination}>
      <li
        className={cx(styles.paginationItem, {
          [styles.disabled]: currentPage === 1,
        })}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <div className={cx(styles.arrow, styles.left)} />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              key={pageNumber}
              className={cx(styles.paginationItem, styles.dots)}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={cx(styles.paginationItem, {
              [styles.selected]: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={cx(styles.paginationItem, {
          [styles.disabled]: currentPage === lastPage,
        })}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <div className={cx(styles.arrow, styles.right)} />
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
