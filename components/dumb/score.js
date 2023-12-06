import PropTypes from "prop-types";
import { score, count } from "./index.module.scss";
import Stars from "./Stars";

/**
 * Score component for displaying a rating and review count.
 *
 * @component
 * @param {number} rating - The rating value.
 * @param {number} review_count - The number of reviews.
 * @returns {JSX.Element} The rendered Score component.
 */
const Score = ({ rating, review_count }) => {
  return (
    <div className={score}>
      <Stars rating={rating} />
      <p className={count}>{review_count} Reviews</p>
    </div>
  );
};

Score.propTypes = {
  rating: PropTypes.number.isRequired,
  review_count: PropTypes.number.isRequired,
};

export default Score;
