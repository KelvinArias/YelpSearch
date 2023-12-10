import { Fragment } from "react";
import styles from "./index.module.scss";
import SignSVG from "@public/sign";
import LocationSVG from "@public/location";
import PhoneSVG from "@public/phone";
import Image from "next/image";
import Tags from "../dumb/tag";
import Score from "../dumb/score";
import Button from "../dumb/button";
import CheckSvg from "@public/check";
import PropTypes from "prop-types";
import noFoundImage from "@public/noFoundImage.png";
import cx from "classnames";

/**
 * Card component for displaying business information.
 *
 * @component
 * @param {Object} business - The business data to display.
 * @param {string} business.image_url - The URL of the business image.
 * @param {string} business.name - The name of the business.
 * @param {string} business.location - The location of the business.
 * @param {Array} business.location.display_address - display address of the business
 * @param {Array} business.categories - The categories of the business.
 * @param {string} business.display_phone - The phone number of the business.
 * @param {number} business.review_count - The number of reviews for the business.
 * @param {number} business.rating - The rating of the business.
 * @param {boolean} business.is_closed - Indicates if the business is closed.
 * @param {Array} business.transactions - The transactions associated with the business.
 * @param {string} business.price - The price category of the business.
 * @returns {JSX.Element} The rendered Card component.
 */
const Card = ({ business }) => {
  const {
    image_url,
    name,
    location,
    categories,
    display_phone,
    review_count,
    rating,
    is_closed,
    transactions,
    price,
  } = business;

  return (
    <article className={styles.card}>
      <header
        className={cx(styles.header, { [styles.noFoundImage]: !image_url })}
      >
        <Image
          src={image_url || noFoundImage}
          alt="local image"
          width={400}
          height={400}
          priority={true}
        />
      </header>
      <div className={styles.information}>
        <div className={styles.description}>
          <h3>{name}</h3>
          <Tags categories={categories} />
          <Score rating={rating} review_count={review_count} />
        </div>
        <div className={styles.direction}>
          <SignSVG is_closed={is_closed} size={50} />
          <Button href="https://kresume.dev/" text="Get Directions" />
        </div>
        <div className={styles.address}>
          <LocationSVG color={is_closed ? "#E00707" : "#008055"} size={20} />
          <p className="p-0">
            {location.display_address.join(", ")}.<span>{price}</span>
          </p>
        </div>
        <div className={styles.address}>
          <PhoneSVG color={is_closed ? "#E00707" : "#008055"} size={20} />
          <p className="p-0">{display_phone}</p>
        </div>
        <div className={styles.transactions}>
          {transactions.map((transaction) => (
            <Fragment key={transaction}>
              <CheckSvg size={15} />
              <p>{transaction}</p>
            </Fragment>
          ))}
        </div>
      </div>
    </article>
  );
};

Card.propTypes = {
  business: PropTypes.shape({
    image_url: PropTypes.string,
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      display_address: PropTypes.array.isRequired,
    }).isRequired,
    categories: PropTypes.array.isRequired,
    display_phone: PropTypes.string.isRequired,
    review_count: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    is_closed: PropTypes.bool.isRequired,
    transactions: PropTypes.array.isRequired,
    price: PropTypes.string,
  }),
};

export default Card;
