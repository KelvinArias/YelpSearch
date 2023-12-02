import { rating as ratingClass, half } from "./index.module.scss";
import { starsInfo } from "@const/index.js";
import cx from "classnames";

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

export default Stars;
