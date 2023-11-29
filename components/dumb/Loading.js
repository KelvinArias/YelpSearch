import Image from "next/image";
import loadingSvg from "@public/loading.gif";

const Loading = () => {
  return (
    <div className="container pt-5 pb-5 d-flex align-center justify-content-center">
      <Image src={loadingSvg} alt="Loader" width="150" height="100" />
    </div>
  );
};

export default Loading;
