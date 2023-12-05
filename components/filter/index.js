import styles from "./index.module.scss";
import cx from "classnames";
import Car from "@public/car.png";
import Image from "next/image";
import { useState } from "react";
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

const Filter = ({ filters, setFilter, filtersQuantity }) => {
  const [classToAdd, setClassToAdd] = useState("");
  const filterPrices = filters[KEY_PRICE] ?? [];
  const filterSuggestions = filters[KEY_SUGGESTED] ?? [];
  const filterCategories = filters[KEY_CATEGORIES] ?? [];
  const filterRadius = filters[KEY_RADIUS] ?? 0;

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
    <aside className={styles.filter}>
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
        <span className={styles.more}>...</span>
        <div className={styles.tagContainer}>
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
                [styles.selected]: key === filterRadius,
              })}
              onClick={() => handleDistance(key, i)}
            >
              <p>{radius[key]}.</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filter;
