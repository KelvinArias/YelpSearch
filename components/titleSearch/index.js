"use client";
import { useState, useRef } from "react";
import { useClickOutside } from "@libs/index.js";
import styles from "./index.module.scss";
import cx from "classnames";
import { listValues } from "@const/index.js";

const TitleSearch = ({ searchValue, sortValue, setSort }) => {
  const [showList, setShowList] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setShowList(false));

  return (
    <section className={styles.titleSearch}>
      <div className={cx("container", styles.mof)}>
        <h2 className="mb-0">{`Best Business in ${searchValue}`}</h2>
        <div
          role="select"
          className={styles.select}
          onClick={() => setShowList(!showList)}
          ref={ref}
        >
          <p>{sortValue}</p>
          <div className={cx(styles.arrow, { rotate: showList })} />
          {showList && (
            <ul className={styles.list}>
              {listValues.map((value) => (
                <li
                  onClick={() => setSort(value)}
                  className={cx({ selected: sortValue === value })}
                  key={value}
                  role="option"
                  aria-selected={value}
                >
                  {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default TitleSearch;
