import styles from "./index.module.scss";
import open from "@public/open.png";
import locationPNG from "@public/location.png";
import Image from "next/image";
import Tags from "../dumb/tag";
import Score from "../dumb/score";
import Button from "../dumb/button";

const Card = ({ business }) => {
  const {
    image_url,
    name,
    location,
    categories,
    display_phone,
    review_count,
    rating,
    photos,
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
        <div className={styles.description}>
          <h3>{name}</h3>
          <Tags categories={categories} />
          <Score rating={rating} review_count={review_count} />
        </div>
      </header>
      <div className={styles.information}>
        <div className={styles.direction}>
          <Image src={open} alt="local image" width={30} height={30} />
          <Button href="https://kresume.dev/" text="Get Directions" />
        </div>
        <div className={styles.address}>
          <Image src={locationPNG} alt="local image" width={20} height={20} />
          <p className="p-0">{location.display_address.join(", ")}</p>
        </div>
        <div className={styles.address}>
          <Image src={locationPNG} alt="local image" width={20} height={20} />
          <p className="p-0">{location.display_address.join(", ")}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
