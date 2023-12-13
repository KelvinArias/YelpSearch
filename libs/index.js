import React, { useMemo } from "react";
import { DOTS } from "@const/index";
/**
 * Custom hook to handle click events outside a specified ref element.
 *
 * @function
 * @param {React.MutableRefObject} ref - Reference to the React element.
 * @param {Function} callback - Callback function to execute when a click outside occurs.
 * @returns {void}
 */
export const useClickOutside = (ref, callback) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  // Attach event listener when the hook is called
  document.addEventListener("mousedown", handleClickOutside);

  // Return a function to remove the event listener (cleanup)
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
};

/**
 * Function to calculate the quantity of active filters.
 *
 * @function
 * @param {Object} filters - The filters object.
 * @returns {number} The quantity of active filters.
 */
export const getFiltersQuantity = (filters) => {
  let quantity = 0;
  const copyFilters = filters || {};

  Object.keys(copyFilters).forEach((key) => {
    if (Array.isArray(copyFilters[key])) {
      quantity += copyFilters[key].length;
    } else {
      quantity++;
    }
  });

  return quantity;
};

const range = (start, end) => {
  let length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
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

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    // Check if the Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
      // Get the current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // The latitude and longitude are available in the position.coords object
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error.message);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};
