import { Link } from "react-router-dom";
import { slides } from "./ProductDetails";
import React, { useState, useEffect } from "react";

const ImageCarousel = ({ autoSlide = true, autoSlideInterval = 5000 }) => {
  // state to track current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // effect to handle auto sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlideInterval]);

  return (
    <>
      <section className="relative max-w-7xl">
        <h3 className="text-base md:text-lg font-bold">Deals for you !</h3>
        <div className="bg-gradient-to-r from-[#4AA58B] to-[#1C3F35] rounded-lg relative overflow-hidden">
          {/* map through slides array  */}
          {slides.map((slide, id) => (
            <div
              key={id}
              className={`relative w-full transition-transform duration-500 ease-in-out ${
                id === currentSlide ? "translate-x-0" : "translate-x-full"
              }`}
              style={{
                position: id === currentSlide ? "relative" : "absolute",
                top: 0,
                left: 0
              }}
            >
              {/* Background Image with overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.image}
                  alt={`Background ${id + 1}`}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#4AA58B] to-[#1C3F35]/30" />
              </div>

              {/* Content Layout */}
              <div className="relative z-10">
                {/* Main Image */}
                <div className="w-full min-h-[20rem] md:min-h-[20rem] flex items-center justify-center">
                  {/* content container */}
                  <div className="w-full md:w-1/2 text-center">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
                      BLACK FRIDAY SALES !
                    </h2>
                    <p className="text-base md:text-lg text-white mb-4 md:mb-6">
                      Enjoy 50% discount on every purchase of more than ₦20,000
                    </p>
                    <Link
                      to="/category"
                      className="bg-[#fe6900] hover:bg-[#fe6c00] text-white px-6 md:px-8 py-2 md:py-3 rounded-full w-max text-base md:text-lg"
                    >
                      Shop Now
                    </Link>
                  </div>
                  {/* <img
                    src={slide.image}
                    alt={`Slide ${id + 1}`}
                    className="w-full max-w-[180px] md:max-w-[400px] h-auto object-contain rounded-md"
                  /> */}
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, id) => (
              <button
                key={id}
                onClick={() => setCurrentSlide(id)}
                className={`w-2 h-2 rounded-full transition-all ${
                  id === currentSlide ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageCarousel;
