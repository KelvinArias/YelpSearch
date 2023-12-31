import cx from "classnames";
import styles from "./index.module.scss";
import PropTypes from "prop-types";

const DOTS = "&#8230;";

/**
 * Generates an array of integers within a specified range.
 *
 * @param {number} start - The starting value of the range (inclusive).
 * @param {number} end - The ending value of the range (inclusive).
 * @returns {number[]} - An array of integers within the specified range.
 * @throws {Error} - Throws an error if the start value is greater than the end value.
 *
 * @example
 * const result = range(1, 5);
 * // Result: [1, 2, 3, 4, 5]
 *
 * @example
 * const result = range(5, 1);
 * // Throws an error because the start value is greater than the end value.
 */
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Custom hook for calculating pagination ranges based on provided parameters.
 *
 * @param {Object} options - Pagination options.
 * @param {number} options.totalCount - Total number of items to paginate.
 * @param {number} options.pageSize - Number of items per page.
 * @param {number} [options.siblingCount=1] - Number of siblings to display on each side of the current page.
 * @param {number} options.currentPage - Current active page.
 * @returns {number[]} - Array representing the range of pages to display in pagination.
 *
 * @example
 * const paginationOptions = {
 *   totalCount: 100,
 *   pageSize: 10,
 *   siblingCount: 1,
 *   currentPage: 1,
 * };
 * const paginationRange = usePagination(paginationOptions);
 * // Result: [1, 2, 3, '...', 10]
 */
const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

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
