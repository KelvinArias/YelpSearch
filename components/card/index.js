import styles from "./index.module.scss";
import SignSVG from "@public/sign";
import LocationSVG from "@public/location";
import PhoneSVG from "@public/phone";
import Image from "next/image";
import Tags from "@components/dumb/tag.js";
import Score from "@components/dumb/score.js";
import Button from "@components/dumb/button.js";
import CheckSvg from "@public/check";
import PropTypes from "prop-types";
import noFoundImage from "@public/noFoundImage.png";
import { getMapDirection } from "@libs/index";
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
 * @param {Object} geolocation - indicates the user's location.
 * @param {number} geolocation.latitude - Latitude of the geolocation.
 * @param {number} geolocation.longitude - longitude of the geolocation.
 * @param {boolean} geolocation.status - wether or not the geolocation is active.
 * @param {boolean} geolocation.geoIsLoading - wether or not the geolocation is loading.
 * @param {function} onClick - show the details of the business
 * @returns {JSX.Element} The rendered Card component.
 */
const Card = ({ business, geolocation, onClick, viewed }) => {
  const {
    alias,
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
    coordinates,
  } = business;
  const mapDirection = getMapDirection(coordinates, geolocation);

  return (
    <article className={styles.card} onClick={(e) => onClick(e, alias)}>
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
        <div className={cx(styles.description, { [styles.viewed]: viewed })}>
          <h3>{name}</h3>
          <Tags categories={categories} />
          <Score rating={rating} review_count={review_count} />
        </div>
        <div className={styles.direction} onClick={(e) => e.stopPropagation()}>
          <SignSVG is_closed={is_closed} size={50} />
          <Button
            disabled={!origin}
            href={mapDirection}
            text="Get Directions"
          />
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
            <div key={transaction} className={styles.item}>
              <CheckSvg size={15} />
              <p>{transaction}</p>
            </div>
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
  geolocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
    geoIsLoading: PropTypes.bool.isRequired,
  }),
};

export default Card;
