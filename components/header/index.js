"use client";
import PropTypes from "prop-types";
import { useRef } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import cx from "classnames";

/**
 * Header component for displaying the application header.
 *
 * @component
 * @param {Function} setSearch - A function to update the search value.
 * @param {boolean} isSearchMobileOpen - Indicates if the mobile search is open.
 * @param {number} filterQuantity - The quantity of active filters.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({ setSearch, isSearchMobileOpen, filterQuantity }) => {
  const refInput = useRef(null);

  return (
    <header
      className={cx(styles.header, {
        [styles.isSearchMobileOpen]: isSearchMobileOpen,
      })}
    >
      <div className={cx("container", styles.mof)}>
        <Image
          width={80}
          height={40}
          src={
            "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_web/48792dd29811/assets/img/logos_desktop/default.png"
          }
          alt="logo"
          className={styles.logo}
        />
        <search className={styles.search}>
          {Boolean(filterQuantity) && !isSearchMobileOpen && (
            <div className={styles.tag}>{filterQuantity}</div>
          )}
          <form>
            <input
              placeholder="Search by location..."
              className={cx(styles.input, "p-2")}
              onKeyPress={(e) =>
                e.key === "Enter" && setSearch(e.currentTarget.value)
              }
              ref={refInput}
            />
          </form>
          <div
            onClick={() => setSearch(refInput.current.value)}
            className={styles.lensBox}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M21.853 20.355l-3.444-3.443a9.428 9.428 0 10-16.761-6.171 9.428 9.428 0 0015.348 7.586l3.443 3.442a1 1 0 101.414-1.414zM5.82 16.245a7.429 7.429 0 115.253 2.175 7.38 7.38 0 01-5.253-2.176z"></path>
            </svg>
          </div>
        </search>
      </div>
    </header>
  );
};

Header.propTypes = {
  setSearch: PropTypes.func.isRequired,
  isSearchMobileOpen: PropTypes.bool.isRequired,
  filterQuantity: PropTypes.number.isRequired,
};

export default Header;
