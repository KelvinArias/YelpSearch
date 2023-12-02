import { button } from "./index.module.scss";

const Tag = ({ href, text }) => {
  return (
    <a href={href} target="_blank" className={button}>
      {text}
    </a>
  );
};

export default Tag;
