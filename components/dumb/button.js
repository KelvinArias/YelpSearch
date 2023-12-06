import PropTypes from "prop-types";
import { button } from "./index.module.scss";

/**
 * Tag component for rendering a clickable tag.
 *
 * @component
 * @param {string} href - The URL to link to.
 * @param {string} text - The text content of the tag.
 * @returns {JSX.Element} The rendered Tag component.
 */
const Tag = ({ href, text }) => {
  return (
    <a href={href} target="_blank" className={button}>
      {text}
    </a>
  );
};

Tag.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Tag;
