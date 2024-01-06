"use client";
import PropTypes from "prop-types";
import { button, disabledButton } from "./index.module.scss";
import cx from "classnames";

/**
 * Tag component for rendering a clickable tag.
 *
 * @component
 * @param {string} href - The URL to link to.
 * @param {string} text - The text content of the tag.
 * @param {boolean} disabled - Whether the tag is disabled or not.
 * @param {string} classNames - different classnames given to the button
 * @returns {JSX.Element} The rendered Tag component.
 */
const Tag = ({ href, text, disabled, className }) => {
  return (
    <a
      href={href}
      target="_blank"
      className={cx(button, {
        [disabledButton]: disabled,
        [className]: className,
      })}
    >
      {text}
    </a>
  );
};

Tag.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Tag;
