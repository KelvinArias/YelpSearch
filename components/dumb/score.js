import { score, count } from "./index.module.scss";
import Stars from "./Stars";

const Score = ({ rating, review_count }) => {
  return (
    <div className={score}>
      <Stars rating={rating} />
      <p className={count}>{review_count} Reviews</p>
    </div>
  );
};

export default Score;
