
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Search,
  ShoppingBag,
  MoveUpRight,
} from "lucide-react";
import gsap from "gsap";

const Page404 = () => {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const illustrationRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current.querySelectorAll(".char");

      gsap.set(chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 35,
      });

      gsap.set(illustrationRef.current, {
        opacity: 0,
        scale: 0.75,
        rotate: -8,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .to(gridRef.current, {
          opacity: 1,
          duration: 0.8,
        })
        .to(chars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "back.out(1.7)",
        })
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .to(
          illustrationRef.current,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.7"
        );

      // Floating product illustration
      gsap.to(illustrationRef.current, {
        y: -14,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Background glow
      gsap.to(glowRef.current, {
        x: 80,
        y: -40,
        scale: 1.15,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animated grid
      gsap.to(gridRef.current, {
        backgroundPosition: "70px 70px",
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (event) => {
    const element = illustrationRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(element, {
      rotateY: x * 12,
      rotateX: y * -12,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(illustrationRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <main
      ref={pageRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F1E8DF] px-5 py-16 text-[#3B2521]"
    >
      {/* Background Decorations */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#D5D9BC]/50 blur-[110px]"
      />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[#D7A99A]/30 blur-[110px]" />

      {/* Animated Grid */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,37,33,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(59,37,33,0.045) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left Content */}
        <section className="text-center lg:text-left">
          {/* Label */}
          <div className="mb-7 inline-flex items-center gap-2 border border-[#B99C8B] bg-[#E8DCD0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#806052]">
            <span className="h-2 w-2 rounded-full bg-[#C65B45]" />
            Page Not Found
          </div>

          {/* Animated 404 */}
          <h1
            ref={titleRef}
            className="mb-7 flex justify-center overflow-hidden text-[clamp(6rem,18vw,13rem)] font-black leading-[0.8] tracking-[-0.09em] text-[#3B2521] lg:justify-start"
            style={{ perspective: "800px" }}
          >
            {"404".split("").map((char, index) => (
              <span
                key={index}
                className="char inline-block"
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Text Content */}
          <div ref={contentRef}>
            <h2 className="mx-auto max-w-lg font-serif text-3xl font-bold leading-tight tracking-tight text-[#3B2521] sm:text-4xl lg:mx-0">
              Looks like you took a wrong turn.
            </h2>

            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#806B60] lg:mx-0">
              The page you're looking for doesn't exist or may have
              been moved. Let's help you find your way back.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
              <Link
                to="/"
                className="group inline-flex items-center gap-3 rounded-full bg-[#C65B45] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C65B45]/20 transition-colors hover:bg-[#AA4936]"
              >
                <Home size={17} />
                Back to Home

                <ArrowLeft
                  size={17}
                  className="rotate-180 transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full border border-[#BCA394] bg-[#F8F2EC] px-6 py-3.5 text-sm font-semibold text-[#5A4036] shadow-sm transition-colors hover:bg-[#E9DDD1]"
              >
                <ShoppingBag size={17} />
                Explore Products

                <MoveUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Right Illustration */}
        <section
          ref={illustrationRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto flex w-full max-w-[430px] items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Decorative Rings */}
          <div className="absolute aspect-square w-[90%] rounded-full border border-dashed border-[#BCA394]" />

          <div className="absolute aspect-square w-[72%] rounded-full border border-[#D7C6B8]" />

          {/* Floating Dots */}
          <div className="absolute left-[8%] top-[18%] h-4 w-4 rounded-full bg-[#A3A878] shadow-lg shadow-[#A3A878]/30" />

          <div className="absolute bottom-[15%] right-[8%] h-3 w-3 rounded-full bg-[#C65B45] shadow-lg shadow-[#C65B45]/30" />

          {/* Main Illustration Card */}
          <div className="relative flex aspect-square w-[70%] items-center justify-center rounded-[35%] border border-[#D9C8B9] bg-[#F8F2EC] shadow-2xl shadow-[#9B7869]/20">
            {/* Shopping Bag */}
            <div className="relative flex h-44 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A3A878] to-[#7D8558] shadow-xl shadow-[#7D8558]/25 sm:h-52 sm:w-48">
              {/* Bag Handle */}
              <div className="absolute -top-16 h-24 w-24 rounded-t-full border-[11px] border-b-0 border-[#7D8558]" />

              {/* Bag Face */}
              <div className="relative flex flex-col items-center justify-center">
                <div className="mb-4 flex gap-5">
                  <span className="h-3 w-3 rounded-full bg-[#F8F2EC]" />
                  <span className="h-3 w-3 rounded-full bg-[#F8F2EC]" />
                </div>

                <div className="h-5 w-12 rounded-b-full border-b-4 border-[#F8F2EC]" />
              </div>

              {/* Bag Shine */}
              <div className="absolute left-5 top-5 h-16 w-3 rounded-full bg-white/25 blur-sm" />
            </div>

            {/* Search Icon */}
            <div className="absolute -right-7 top-8 flex h-16 w-16 rotate-12 items-center justify-center rounded-2xl border border-[#D9C8B9] bg-[#F8F2EC] text-[#806052] shadow-xl">
              <Search size={27} />
            </div>

            {/* Arrow Icon */}
            <div className="absolute -bottom-5 -left-7 flex h-14 w-14 -rotate-12 items-center justify-center rounded-2xl border border-[#D9C8B9] bg-[#F8F2EC] text-[#C65B45] shadow-xl">
              <ArrowLeft size={24} />
            </div>
          </div>

          {/* Caption */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-[#9B7869]">
            Lost in the store
          </div>
        </section>
      </div>

      {/* Bottom Label */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2 text-xs font-medium text-[#9B7869]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C65B45]" />
          ECOM / Page Not Found
        </div>
      </div>
    </main>
  );
};

export default Page404;