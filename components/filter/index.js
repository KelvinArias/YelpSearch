import { useRef, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import cx from "classnames";
import Car from "@public/car.png";
import Image from "next/image";
import {
  KEY_PRICE,
  KEY_CATEGORIES,
  KEY_RADIUS,
  KEY_SUGGESTED,
  prices,
  suggestedValues,
  categories,
  radius,
} from "@const/index";
import Loading from "@components/dumb/loading";

/**
 * Filter component for displaying and handling business filters.
 *
 * @component
 * @param {Object} filters - The current set of filters.
 * @param {Function} setFilter - A function to update the filters.
 * @param {number} filtersQuantity - The quantity of active filters.
 * @param {Boolean} isSearchMobileOpen - Indicates whether the filter is open or closed in mobile.
 * @param {Function} setIsSearchMobileOpen - A function to update the var isSearchMobileOpen
 * @param {boolean} isLoading - Indicates whether the filter is loading
 * @param {boolean} businessQuantity - Indicates how many business were found
 * @returns {JSX.Element} The rendered Filter component.
 */
const Filter = ({
  filters,
  setFilter,
  filtersQuantity,
  isSearchMobileOpen,
  setIsSearchMobileOpen,
  isLoading,
  businessQuantity,
}) => {
  const [classToAdd, setClassToAdd] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const ref = useRef(null);
  const filterPrices = filters[KEY_PRICE] ?? [];
  const filterSuggestions = filters[KEY_SUGGESTED] ?? [];
  const filterCategories = filters[KEY_CATEGORIES] ?? [];
  const filterRadius = filters[KEY_RADIUS] ?? 0;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = ref.current.getBoundingClientRect().top <= 100;
      setIsFixed(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsFixed]);

  const removeFilter = (key) => {
    const { [key]: _, ...others } = filters;
    setFilter(others);
  };

  const handleSelection = (value, array, key) => {
    const valueIsInArray = array.includes(value);
    const newArray = valueIsInArray
      ? array.filter((valueArray) => valueArray !== value)
      : [...array, value];

    if (!Boolean(newArray.length)) {
      // if it's empty we need to remove the key from the filters object
      removeFilter(key);
    } else {
      // add or remove values from price
      setFilter({ ...filters, [key]: newArray });
    }
  };

  const handleDistance = (value, i) => {
    if (value === filterRadius) {
      setClassToAdd("");
      removeFilter(KEY_RADIUS);
    } else {
      setClassToAdd("option" + i);
      setFilter((prevState) => ({ ...prevState, [KEY_RADIUS]: value }));
    }
  };

  return (
    <Fragment>
      <div
        ref={ref}
        className={cx(styles.positionPlaceHolder, {
          [styles.placeHolder]: isFixed,
        })}
      />
      <aside
        className={cx(styles.filter, {
          [styles.isSearchMobileOpen]: isSearchMobileOpen,
          [styles.isFixed]: isFixed,
        })}
        style={{
          left: isFixed ? ref.current.getBoundingClientRect().left + "px" : 0,
        }}
      >
        <div className={styles.showResultsMobile}>
          <p>Results:</p>
          {isLoading ? (
            <Loading className={styles.loading} width={20} height={20} />
          ) : (
            <p className={styles.businessQuantity}>{businessQuantity}</p>
          )}
        </div>
        <p className={styles.title}>{filtersQuantity} Filters</p>
        {Boolean(filtersQuantity) && (
          <p
            className={styles.clear}
            onClick={() => {
              setFilter({});
              setClassToAdd("");
            }}
          >
            clear all
          </p>
        )}
        <div className={styles.prices}>
          {prices.map((price) => (
            <p
              className={cx({
                [styles.priceSelected]: filterPrices.includes(price),
              })}
              key={price}
              onClick={() => handleSelection(price, filterPrices, KEY_PRICE)}
            >
              {"$".repeat(price)}
            </p>
          ))}
        </div>
        <div className={styles.suggested}>
          <p className={styles.title}>Suggested</p>
          <fieldset>
            {Object.keys(suggestedValues).map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={filterSuggestions.includes(key)}
                  onChange={(e) =>
                    handleSelection(
                      e.target.value,
                      filterSuggestions,
                      KEY_SUGGESTED
                    )
                  }
                  title={key}
                  value={key}
                />
                <span className={styles.check}></span>
                {suggestedValues[key]}
              </label>
            ))}
          </fieldset>
        </div>
        <div className={styles.categories}>
          <p className={styles.title}>Category</p>
          <span onClick={() => setShowMore(!showMore)} className={styles.more}>
            ...
          </span>
          <div
            className={cx(styles.tagContainer, { [styles.showMore]: showMore })}
          >
            {Object.keys(categories).map((key) => (
              <p
                key={key}
                onClick={() =>
                  handleSelection(key, filterCategories, KEY_CATEGORIES)
                }
                className={cx(styles.tag, {
                  [styles.selected]: filterCategories.includes(key),
                })}
              >
                {categories[key]}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.distance}>
          <p className={styles.title}>Distance</p>
          <div
            role="range"
            className={cx(styles.range, {
              [styles.thereIsDistance]: filterRadius,
              [styles[classToAdd]]: Boolean(classToAdd),
            })}
          >
            <Image
              className={styles.car}
              src={Car}
              alt="Car distance"
              width={40}
              height={40}
            />
            {Object.keys(radius).map((key, i) => (
              <div
                key={key}
                className={cx(styles.point, {
                  [styles.selected]: Number(key) === filterRadius,
                })}
                onClick={() => handleDistance(Number(key), i)}
              >
                <p>{radius[key]}.</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.button}
          onClick={() => setIsSearchMobileOpen(false)}
        >
          Close
        </button>
      </aside>
    </Fragment>
  );
};

Filter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  filtersQuantity: PropTypes.number.isRequired,
  setIsSearchMobileOpen: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  businessQuantity: PropTypes.number.isRequired,
};

export default Filter;
