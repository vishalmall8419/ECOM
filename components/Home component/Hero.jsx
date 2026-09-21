
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

// Images
import NewArival from "../../assists/img.png";
import NewArival2 from "../../assists/img2.png";
import NewArival3 from "../../assists/img3.png";

// Hero Component
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // GSAP References
  const trackRef = useRef(null);
  const heroRef = useRef(null);

  // Dynamic Carousel Images
  const slides = [
    {
      id: 1,
      smallText: "New Arrival",
      title: "The Boxy Cross",
      image: NewArival,
      link: "/products",
    },
    {
      id: 2,
      smallText: "Trending Now",
      title: "Classic Collection",
      image: NewArival2,
      link: "/products",
    },
    {
      id: 3,
      smallText: "Best Seller",
      title: "Premium Style",
      image: NewArival3,
      link: "/products",
    },
  ];

  const totalSlides = slides.length;

  // GSAP Text Animation - Only Once
  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const textElements =
        heroRef.current.querySelectorAll(".hero-text");

      gsap.fromTo(
        textElements,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // GSAP Slide Animation
  useEffect(() => {
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      xPercent: -(currentSlide * (100 / totalSlides)),
      duration: 1.1,
      ease: "power3.inOut",
    });
  }, [currentSlide, totalSlides]);

  // Auto Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Dot Click Handler
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      ref={heroRef}
      className="overflow-hidden bg-[#F1E8DF] pt-16 sm:pt-20"
    >
      {/* Carousel Track */}
      <div
        ref={trackRef}
        className="flex w-full"
        style={{
          width: `${totalSlides * 100}%`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex w-full shrink-0 flex-col items-center justify-center gap-8 px-6 py-8 sm:flex-row sm:justify-between sm:px-16 md:px-24 lg:px-32"
            style={{
              width: `${100 / totalSlides}%`,
            }}
          >
            {/* Hero Content */}
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <small className="hero-text mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[#9B8670]">
                {slide.smallText}
              </small>

              <h1 className="hero-text max-w-md text-4xl font-semibold leading-tight text-[#3B2521] sm:text-5xl md:text-6xl">
                {slide.title}
              </h1>

              <p className="hero-text mt-4 max-w-sm text-sm leading-6 text-[#8B7868] sm:text-base">
                Discover timeless styles designed to elevate your everyday
                look with comfort and confidence.
              </p>

              <Link
                to={slide.link}
                className="hero-text mt-7 inline-flex items-center border-b border-[#C65B45] pb-1 text-sm font-semibold text-[#C65B45] transition hover:border-[#3B2521] hover:text-[#3B2521]"
              >
                Explore All Now
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Hero Image */}
            <div className="flex w-full justify-center sm:w-1/2">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-auto max-h-[360px] w-auto max-w-full object-contain sm:max-h-[460px] md:max-h-[520px]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="flex items-center justify-center gap-3 pb-8">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-8 bg-[#C65B45]"
                : "w-2.5 bg-[#CBB8A5] hover:bg-[#9B8670]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;