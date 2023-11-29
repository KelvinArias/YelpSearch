import styles from "./index.module.scss";
import Image from "next/image";
import Tags from "../dumb/Tag";
import Stars from "../dumb/Stars";

const Card = ({ business }) => {
  const {
    image_url,
    name,
    location,
    categories,
    display_phone,
    review_count,
    rating,
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
          <Stars rating={rating} review_count={review_count} />
        </div>
      </header>
    </article>
  );
};

export default Card;
