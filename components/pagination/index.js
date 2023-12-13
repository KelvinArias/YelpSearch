import PropTypes from "prop-types";
import { paginationConst } from "@const/index";
import Image from "next/image";
import cx from "classnames";
import styles from "./index.module.scss";
import arrow from "@public/arrow.png";

/**
 * Pagination component
 *
 * @component
 * @returns {JSX.Element} The rendered Score component.
 */
const Pagination = ({ currentPage, setPage }) => {
  const prevPageAvailable = paginationConst[0] !== currentPage;
  const nextPageAvailable =
    paginationConst[paginationConst.length - 1] !== currentPage;

  return (
    <div className={styles.pagination}>
      <Image
        className={cx(styles.prev, {
          [styles.noAllowed]: !prevPageAvailable,
        })}
        onClick={() => prevPageAvailable && setPage(currentPage - 1)}
        src={arrow}
        alt="arrow back page"
        width={25}
        height={25}
      />
      {paginationConst.map((value) => (
        <p
          key={value}
          onClick={() => setPage(value)}
          className={cx(styles.page, {
            [styles.selected]: currentPage === value,
          })}
        >
          {value}
        </p>
      ))}
      <Image
        className={cx(styles.next, {
          [styles.noAllowed]: !nextPageAvailable,
        })}
        onClick={() => nextPageAvailable && setPage(currentPage + 1)}
        src={arrow}
        alt="arrow next page"
        width={25}
        height={25}
      />
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
