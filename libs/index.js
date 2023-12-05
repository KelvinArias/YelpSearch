import { useEffect } from "react";

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export const getFiltersQuantity = (filters) => {
  let quantity = 0;

  Object.keys(filters).forEach((key) => {
    if (Array.isArray(filters[key])) {
      quantity += filters[key].length;
    } else {
      quantity++;
    }
  });

  return quantity;
};
