"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import styles from "./index.module.scss";
import cx from "classnames";
import { sortBy } from "@const/index";

/**
 * TitleSearch component for displaying the title and sorting options.
 *
 * @component
 * @param {string} location - The current search value.
 * @param {string} sortValue - The current sort value.
 * @param {Function} setSort - A function to update the sort value.
 * @param {Boolean} isCurrentLocation - Whether the user is using the current location or not.
 * @returns {JSX.Element} The rendered TitleSearch component.
 */
const TitleSearch = ({ location, sortValue, setSort, isCurrentLocation }) => {
  const [showList, setShowList] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowList(false);
      }
    };

    // Attach event listener when the hook is called
    document.addEventListener("mousedown", handleClickOutside);

    // Return a function to remove the event listener (cleanup)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className={styles.titleSearch}>
      <div className={cx("container", styles.mof)}>
        <h2 className="mb-0">{`Best Business in ${
          isCurrentLocation ? "Your city" : location
        }`}</h2>
        <div
          role="select"
          className={styles.select}
          onClick={() => setShowList(!showList)}
          ref={ref}
        >
          <p>{sortBy[sortValue]}</p>
          <div className={cx(styles.arrow, { [styles.rotate]: showList })} />
          {showList && (
            <ul className={styles.list}>
              {Object.keys(sortBy).map((value) => (
                <li
                  onClick={() => setSort(value)}
                  className={cx({ selected: sortValue === value })}
                  key={value}
                  role="option"
                  aria-selected={value}
                >
                  {sortBy[value]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

TitleSearch.propTypes = {
  location: PropTypes.string.isRequired,
  sortValue: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  isCurrentLocation: PropTypes.bool.isRequired,
};

export default TitleSearch;
