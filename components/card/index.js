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
      <header className={styles.header}>
        <Image
          src={image_url}
          alt="local image"
          layout="fill"
          objectFit="cover"
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

export default Card;
