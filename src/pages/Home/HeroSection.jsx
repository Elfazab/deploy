import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css"; // Optional theme CSS
import "slick-carousel/slick/slick.css"; // Required CSS for react-slick
import "./Home.css";

// Carousel images
const carouselImages = [
  "https://i.pinimg.com/736x/e4/7b/53/e47b53bcb1a2fd4c17797a19aba368da.jpg",
  "https://i.pinimg.com/736x/d7/f0/61/d7f061fb7fcd70338abb1e3a3f0520c4.jpg",
  "https://i.pinimg.com/736x/ee/59/8c/ee598cdc8871357a1b1ac337b2fcd588.jpg",
];

// Custom Previous Arrow Component
const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button className={`${className} custom-prev-arrow`} onClick={onClick}>
      ❮
    </button>
  );
};

// Custom Next Arrow Component
const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button className={`${className} custom-next-arrow`} onClick={onClick}>
      ❯
    </button>
  );
};

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="hero-section">
      <Slider {...settings} className="hero-carousel">
        {carouselImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className="hero-image" />
          </div>
        ))}
      </Slider>
      <div className="hero-text">
        <h2 className="welcome-title">
          Welcome to the All Ethiopian Banks Currency Exchange App
        </h2>
        <p className="description">
          Check the latest exchange rates to make smarter choices for travel,
          business, or personal use.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
