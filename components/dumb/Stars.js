import { rating as ratingClass, half, count } from "./index.module.scss";
import { starsInfo } from "@const";
import cx from "classnames";

const Stars = ({ rating, review_count }) => {
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
      <p className={count}>{review_count} Reviews</p>
    </div>
  );
};

export default Stars;
