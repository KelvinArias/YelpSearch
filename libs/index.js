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
