import { categoryContainer, tag } from "./index.module.scss";

const Tag = ({ categories }) => {
  return (
    <div className={categoryContainer}>
      {categories.map((category) => (
        <div className={tag} key={category.title}>
          {category.title}
        </div>
      ))}
    </div>
  );
};

export default Tag;
