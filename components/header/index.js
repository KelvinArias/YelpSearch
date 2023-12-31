"use client";
import PropTypes from "prop-types";
import { Fragment, useRef } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import cx from "classnames";
import logo from "@public/logo.png";
import SearchSVG from "@public/search.js";

/**
 * Header component for displaying the application header.
 *
 * @component
 * @param {Function} setSearch - A function to update the search value.
 * @param {boolean} isSearchMobileOpen - Indicates if the mobile search is open.
 * @param {number} filterQuantity - The quantity of active filters.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({
  setSearch,
  isSearchMobileOpen,
  filterQuantity,
  headerRef,
}) => {
  const refInput = useRef(null);

  return (
    <Fragment>
      <div className={styles.placeHolder} />
      <header
        className={cx(styles.header, {
          [styles.isSearchMobileOpen]: isSearchMobileOpen,
        })}
        ref={headerRef}
      >
        <div className={cx("container", styles.mof)}>
          <Image
            width={80}
            height={40}
            src={logo}
            alt="logo"
            className={styles.logo}
          />
          <search className={styles.search}>
            {Boolean(filterQuantity) && !isSearchMobileOpen && (
              <div className={styles.tag}>{filterQuantity}</div>
            )}
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                placeholder="Search by location..."
                className={cx(styles.input, "p-2")}
                onKeyDown={(e) =>
                  e.code === "Enter" && setSearch(e.target.value)
                }
                type="search"
                ref={refInput}
              />
            </form>
            <div
              onClick={() => setSearch(refInput.current.value)}
              className={styles.lensBox}
            >
              <SearchSVG size={24} />
            </div>
          </search>
        </div>
      </header>
    </Fragment>
  );
};

Header.propTypes = {
  setSearch: PropTypes.func.isRequired,
  isSearchMobileOpen: PropTypes.bool.isRequired,
  filterQuantity: PropTypes.number.isRequired,
};

export default Header;
