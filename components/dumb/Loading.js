import Image from "next/image";
import loadingSvg from "@public/loading.gif";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Loading component for displaying a loading indicator.
 *
 * @param {number} width - width of the loading indicator
 * @param {number} height - height of the loading indicator
 * @component
 * @returns {JSX.Element} The rendered Loading component.
 */
const Loading = ({ width, height, className }) => {
  console.log({ className });
  return (
    <div
      className={cx(
        "container pt-5 pb-5 d-flex align-center justify-content-center",
        { [className]: className }
      )}
    >
      <Image src={loadingSvg} alt="Loader" width={width} height={height} />
    </div>
  );
};

Loading.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Loading;
