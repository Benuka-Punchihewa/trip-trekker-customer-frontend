import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../global.css";

const Slider = ({ images }) => {
  return (
    <Carousel infiniteLoop autoPlay>
      {images?.map((image) => (
        <img src={image} style={{ objectFit: "cover" }} />
      ))}
    </Carousel>
  );
};

export default Slider;
