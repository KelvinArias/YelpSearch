import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import cx from "classnames";
import Image from "next/image";
import SignSVG from "@public/sign";
import Score from "../dumb/score";
import noFoundImage from "@public/noFoundImage.png";
import defaultUserAvatar from "@public/defaultUserAvatar.png";
import Map from "../dumb/map";
import Button from "../dumb/button";
import { getMapDirection } from "@libs/index";
import Loading from "@components/dumb/loading";
import Stars from "@components/dumb/Stars";
import { getDayName, formatTime } from "@libs/index";

/**
 * Detail component displays detailed information about a business.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.business - Business information object.
 * @param {Function} props.onClose - Callback function to close the detail view.
 * @param {Function} props.isLoading - Indicates if the detail view is loading
 * @param {Object} props.geolocation - Geolocation information.
 * @param {Array} props.reviews - Array of reviews for the business.
 * @param {boolean} props.isLoadingReviews - Loading state for reviews.
 * @param {string} props.googleAPI - Google API key for Map component.
 * @returns {JSX.Element} - Rendered component.
 */
const Detail = ({
  business,
  onClose,
  isLoading,
  geolocation,
  reviews,
  isLoadingReviews,
  googleAPI,
}) => {
  const [showPhone, setShowPhone] = useState(false);
  const {
    image_url,
    name,
    review_count,
    display_phone,
    rating,
    is_closed,
    price,
    photos,
    coordinates,
    location,
    hours,
  } = business;
  const [imageSelected, setImageSelected] = useState(0);
  const today = new Date().getDay();

  return (
    <section className={styles.detail}>
      <div className={styles.close} onClick={onClose} />
      <article className={styles.article}>
        {isLoading ? (
          <Loading width={100} height={100} />
        ) : (
          <div className={styles.container}>
            <header
              className={cx(styles.header, {
                [styles.noFoundImage]: !image_url,
              })}
            >
              <Image
                src={photos[imageSelected] || noFoundImage}
                alt="local image"
                width={300}
                height={300}
                priority={true}
                className={styles.img}
              />
              <div className={styles.information}>
                <h3>{name}</h3>
                <Score rating={rating} review_count={review_count} />
                <div className={styles.positionSign}>
                  <SignSVG is_closed={is_closed} size={50} />
                </div>
                <p className={styles.price}>Price: {price}</p>
              </div>
            </header>
            <div className={styles.gallery}>
              {photos.map((url, index) => (
                <div
                  key={index}
                  className={cx(styles.item, {
                    [styles.imgSelected]: imageSelected === index,
                  })}
                  onClick={() => setImageSelected(index)}
                >
                  <Image
                    src={url}
                    alt="local image"
                    width={100}
                    height={100}
                    priority={true}
                    className={styles.img}
                  />
                </div>
              ))}
            </div>
            <div className={styles.content}>
              <div className={styles.location}>
                <button
                  type="button"
                  className={cx(styles.book, { [styles.showPhone]: showPhone })}
                  onClick={() => setShowPhone(true)}
                >
                  {showPhone ? display_phone : "Book Now"}
                </button>
                <h3>Location & Hours</h3>
                <div className={styles.map}>
                  <Map
                    latitude={coordinates.latitude}
                    longitude={coordinates.longitude}
                    googleAPI={googleAPI}
                  />
                  <div className={styles.infoAddress}>
                    <div className={styles.address}>
                      <p>{location.display_address[0]}</p>
                      <p>{location.display_address[1]}</p>
                    </div>
                    <Button
                      href={getMapDirection(coordinates, geolocation)}
                      className={styles.getDirection}
                      text="Get Directions"
                    />
                  </div>
                </div>

                <div className={styles.hours}>
                  {hours ? (
                    <table>
                      <tbody>
                        {hours[0].open.map((hour, index) => (
                          <tr
                            className={cx({
                              [styles.isOpenToday]:
                                hour.day === today && hours[0].is_open_now,
                              [styles.isClosedToday]:
                                hour.day === today && !hours[0].is_open_now,
                            })}
                            key={index}
                          >
                            <td>{getDayName(hour.day)}</td>
                            <td>{formatTime(hour.start)}</td>
                            <td>{formatTime(hour.end)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className={styles.notHours}>
                      <p>No schedule Found</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.reviews}>
                <h3>Recommended Reviews</h3>
                {isLoadingReviews ? (
                  <Loading />
                ) : (
                  reviews.map((review) => (
                    <div className={styles.review} key={review.id}>
                      <div className={styles.user}>
                        <div className={styles.portrait}>
                          <Image
                            src={review.user.image_url || defaultUserAvatar}
                            alt="user image"
                            width={100}
                            height={100}
                            className={styles.img}
                          />
                        </div>
                        <div className={styles.rating}>
                          <p className={styles.userName}>{review.user.name}</p>
                          <Stars rating={review.rating} />
                        </div>
                      </div>
                      <div className={styles.comment}>
                        <p>{review.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </section>
  );
};

Detail.propTypes = {
  business: PropTypes.shape({
    image_url: PropTypes.string,
    name: PropTypes.string,
    review_count: PropTypes.number,
    display_phone: PropTypes.string,
    rating: PropTypes.number,
    is_closed: PropTypes.bool,
    price: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    coordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    location: PropTypes.shape({
      display_address: PropTypes.arrayOf(PropTypes.string),
    }),
    hours: PropTypes.array,
  }),
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  geolocation: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  isLoadingReviews: PropTypes.bool.isRequired,
  googleAPI: PropTypes.string.isRequired,
};

export default Detail;
