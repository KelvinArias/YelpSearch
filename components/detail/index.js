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
  } = business;
  const [imageSelected, setImageSelected] = useState(image_url);
  console.log({ reviews, isLoadingReviews });

  return (
    <section className={styles.detail}>
      <article className={styles.article}>
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
          <button
            type="button"
            className={cx(styles.book, { [styles.showPhone]: showPhone })}
            onClick={() => setShowPhone(true)}
          >
            {showPhone ? display_phone : "Book Now"}
          </button>
          <div className={styles.location}>
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
            <div className={styles.hours}></div>
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
      </article>
    </section>
  );
};

export default Detail;
