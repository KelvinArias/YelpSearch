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

/**
 * Tag component for rendering a clickable tag.
 *
 * @component
 * @returns {JSX.Element} The rendered Tag component.
 */
const Detail = ({
  business,
  onClose,
  isLoading,
  geolocation,
  reviews,
  isLoadingReviews,
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
  const [imageSelected, setImageSelected] = useState(image_url);
  const today = new Date().getDay();

  // Helper function to get the day name from the day number
  const getDayName = (day) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day];
  };

  // Helper function to format time in HH:MM AM/PM format
  function formatTime(value) {
    // Convert the value to a string
    const stringValue = value.toString();

    // Extract hours and minutes
    const hours = stringValue.padStart(4, "0").substring(0, 2);
    const minutes = stringValue.padStart(4, "0").substring(2);

    // Convert hours to 12-hour format
    const formattedHours = (parseInt(hours) % 12 || 12)
      .toString()
      .padStart(2, "0");

    // Determine AM/PM
    const period = parseInt(hours) < 12 ? "AM" : "PM";

    // Return the formatted time string
    return `${formattedHours}:${minutes} ${period}`;
  }

  return (
    <section className={styles.detail}>
      <div className={styles.close} onClick={onClose} />
      <article className={styles.article}>
        <div className={styles.container}>
          <header
            className={cx(styles.header, { [styles.noFoundImage]: !image_url })}
          >
            <Image
              src={imageSelected || noFoundImage}
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
            {photos.map((url, i) => (
              <div
                key={i}
                className={cx(styles.item, {
                  [styles.imgSelected]: imageSelected === url,
                })}
                onClick={() => setImageSelected(url)}
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
              {hours && (
                <div className={styles.hours}>
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
                </div>
              )}
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
      </article>
    </section>
  );
};

export default Detail;
