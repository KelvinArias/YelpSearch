"use client";
import PropTypes from "prop-types";
import { rating as ratingClass, half } from "./index.module.scss";
import { starsInfo } from "@const/index";
import cx from "classnames";

/**
 * Stars component for displaying a rating using star icons.
 *
 * @component
 * @param {number} rating - The rating value.
 * @returns {JSX.Element} The rendered Stars component.
 */
const Stars = ({ rating }) => {
  return (
    <div className={ratingClass}>
      {starsInfo.map((info) => (
        <label
          key={info.id}
          className={cx({ [half]: !Number.isInteger(info.value) })}
          htmlFor={info.htmlFor}
          title={info.title}
          data-rating={rating >= info.value ? "color" : "no-color"}
        />
      ))}
    </div>
  );
};

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Stars;
