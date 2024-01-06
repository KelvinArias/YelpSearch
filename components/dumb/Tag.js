"use client";
import PropTypes from "prop-types";
import { categoryContainer, tag } from "./index.module.scss";

/**
 * Tag component for rendering a list of categories.
 *
 * @component
 * @param {Array} categories - The array of category objects to be displayed.
 * @param {String} categories.title - The category's value.
 * @returns {JSX.Element} The rendered Tag component.
 */
const Tag = ({ categories }) => (
  <div className={categoryContainer}>
    {categories.map((category) => (
      <div className={tag} key={category.title}>
        {category.title}
      </div>
    ))}
  </div>
);

Tag.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Tag;
