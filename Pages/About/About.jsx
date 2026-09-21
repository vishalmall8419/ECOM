
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Heart,
  MoveUpRight,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const pageRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroVisualRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ================= HERO ANIMATION =================

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      heroTimeline
        .from(".about-nav-item", {
          y: -25,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
        })
        .from(".about-hero-line", {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
        }, "-=0.3")
        .from(".about-hero-description", {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, "-=0.5")
        .from(".about-hero-shape", {
          scale: 0,
          rotation: -30,
          opacity: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
        }, "-=0.8")
        .from(".about-hero-image", {
          scale: 1.2,
          opacity: 0,
          duration: 1.4,
        }, "-=0.9");

      // ================= HERO PARALLAX =================

      gsap.to(heroVisualRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroVisualRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ================= SCROLL REVEALS =================

      gsap.utils.toArray(".about-reveal").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      // ================= MARQUEE =================

      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      // ================= ROTATING BADGE =================

      gsap.to(".about-rotate-badge", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      // ================= CARD PARALLAX =================

      gsap.utils.toArray(".about-floating-card").forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -45 : 45,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#F1E8DF] text-[#16231D]"
    >

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative min-h-screen px-5 pb-16 pt-8 sm:px-10 md:px-16 lg:px-20">

        {/* Small Top Navigation */}
        <div className="about-nav-item mb-16 flex items-center justify-between border-b border-[#624e3c]/30 pb-5">

          <span className="text-sm font-bold tracking-[0.25em] text-[#624e3c]">
            ECOM / ABOUT
          </span>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#624e3c]/70">
            Est. 2026
          </span>

        </div>


        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Hero Text */}
          <div>

            <div className="mb-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#E96943]" />

              <p className="about-hero-description text-xs font-bold uppercase tracking-[0.3em] text-[#624e3c]">
                Beyond Shopping
              </p>
            </div>


            {/* Overflow hidden for reveal */}
            <div className="overflow-hidden">
              <h1
                ref={heroTitleRef}
                className="about-hero-line text-[clamp(3.8rem,9vw,9rem)] font-black leading-[0.82] tracking-[-0.08em]"
              >
                MORE
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1 className="about-hero-line text-[clamp(3.8rem,9vw,9rem)] font-black leading-[0.82] tracking-[-0.08em] text-[#E96943]">
                THAN
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1 className="about-hero-line text-[clamp(3.8rem,9vw,9rem)] font-black leading-[0.82] tracking-[-0.08em]">
                THINGS.
              </h1>
            </div>


            <p className="about-hero-description mt-10 max-w-md text-base leading-7 text-[#624e3c] sm:text-lg">
              We believe shopping is more than buying something new.
              It is about discovering what fits your world, your style,
              and your everyday life.
            </p>


            <div className="about-hero-description mt-9 flex flex-wrap items-center gap-5">

              <Link
                to="/product"
                className="group inline-flex items-center gap-4 rounded-full bg-[#16231D] px-6 py-4 text-sm font-bold text-[#F1E8DF] transition hover:bg-[#E96943]"
              >
                Explore ECOM

                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <span className="text-xs font-bold uppercase tracking-widest text-[#624e3c]">
                Scroll to discover ↓
              </span>

            </div>

          </div>


          {/* Hero Visual */}
          <div
            ref={heroVisualRef}
            className="relative mx-auto min-h-[420px] w-full max-w-[470px] sm:min-h-[520px]"
          >

            {/* Orange Background */}
            <div className="about-hero-shape absolute right-0 top-0 h-[75%] w-[85%] rounded-[45%_45%_0_45%] bg-[#E96943]" />

            {/* Decorative Yellow Circle */}
            <div className="about-hero-shape absolute bottom-12 left-0 h-32 w-32 rounded-full bg-[#F3D45D] sm:h-44 sm:w-44" />

            {/* Image Container */}
            <div className="about-hero-image absolute bottom-0 right-0 z-10 h-[88%] w-[82%] overflow-hidden rounded-t-[50%] rounded-b-[1.5rem] bg-[#D9CBB8]">

              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"
                alt="Fashion collection"
                className="h-full w-full object-cover grayscale-[15%]"
              />

            </div>


            {/* Rotating Badge */}
            <div className="about-rotate-badge absolute bottom-0 left-0 z-20 flex h-28 w-28 items-center justify-center rounded-full bg-[#F3D45D] sm:h-36 sm:w-36">

              <div className="text-center">
                <Sparkles size={22} className="mx-auto mb-2" />

                <span className="block text-[10px] font-black uppercase tracking-widest">
                  Style
                </span>

                <span className="block text-[10px] font-black uppercase tracking-widest">
                  Meets
                </span>

                <span className="block text-[10px] font-black uppercase tracking-widest">
                  Everyday
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* Scroll Indicator */}
        <div className="about-nav-item mx-auto mt-14 flex max-w-7xl items-center justify-between border-t border-[#624e3c]/30 pt-5 text-xs font-bold uppercase tracking-widest text-[#624e3c]">

          <span>Discover / 01</span>

          <ArrowDown size={18} />

          <span>Scroll Down</span>

        </div>

      </section>


      {/* =====================================================
          MARQUEE SECTION
      ===================================================== */}

      <section className="overflow-hidden bg-[#16231D] py-6 text-[#F1E8DF]">

        <div
          ref={marqueeRef}
          className="flex w-max items-center whitespace-nowrap"
        >

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-8 px-4"
            >

              <span className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
                WEAR YOUR STORY
              </span>

              <span className="text-3xl text-[#F3D45D] sm:text-5xl">
                ✳
              </span>

            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          BRAND STORY
      ===================================================== */}

      <section className="px-5 py-24 sm:px-10 md:px-16 lg:px-20 lg:py-36">

        <div className="mx-auto max-w-7xl">

          <div className="about-reveal mb-20 flex items-center justify-between border-b border-[#624e3c]/30 pb-5">

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E96943]">
              02 / The Beginning
            </span>

            <span className="text-xs font-bold text-[#624e3c]">
              OUR STORY
            </span>

          </div>


          <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">

            <div className="about-reveal">

              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-6xl md:text-7xl">
                A LITTLE
                <br />
                <span className="text-[#E96943]">MORE</span>
                <br />
                MEANING.
              </h2>

            </div>


            <div className="about-reveal">

              <p className="mb-8 text-xl font-medium leading-8 text-[#624e3c] sm:text-2xl">
                We are building a space where good design,
                useful products, and everyday living come together.
              </p>

              <p className="mb-6 text-base leading-8 text-[#624e3c]/80">
                ECOM is a contemporary shopping concept created
                around the idea of making product discovery simple,
                clear, and enjoyable.
              </p>

              <p className="text-base leading-8 text-[#624e3c]/80">
                From garments to cosmetics and everyday essentials,
                our goal is to create a connected shopping experience
                that feels personal without becoming complicated.
              </p>


              <div className="mt-10 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E96943] text-white">
                  <Heart size={20} />
                </div>

                <span className="text-sm font-bold uppercase tracking-widest text-[#624e3c]">
                  Designed with intention
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ASYMMETRICAL VALUES SECTION
      ===================================================== */}

      <section className="bg-[#E8DDCB] px-5 py-24 sm:px-10 md:px-16 lg:px-20 lg:py-36">

        <div className="mx-auto max-w-7xl">

          <div className="about-reveal mb-16">

            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-[#E96943]">
              03 / Our Philosophy
            </p>

            <h2 className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-8xl">
              WHAT WE
              <br />
              <span className="text-[#E96943]">STAND</span>
              FOR.
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-2">

            {/* Card 1 */}
            <div className="about-reveal about-floating-card rounded-[2rem] bg-[#16231D] p-8 text-[#F1E8DF] sm:p-12">

              <div className="flex items-start justify-between">

                <span className="text-5xl font-black text-[#F3D45D]">
                  01
                </span>

                <ArrowUpRight className="text-[#F3D45D]" size={30} />

              </div>

              <h3 className="mt-24 text-3xl font-black tracking-tight sm:text-4xl">
                Honest
                <br />
                Simplicity.
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                We believe product discovery should be clear.
                Useful information and straightforward presentation
                help make shopping easier.
              </p>

            </div>


            {/* Card 2 */}
            <div className="about-reveal about-floating-card mt-0 rounded-[2rem] bg-[#E96943] p-8 text-[#16231D] md:mt-20 sm:p-12">

              <div className="flex items-start justify-between">

                <span className="text-5xl font-black text-[#F3D45D]">
                  02
                </span>

                <ArrowUpRight size={30} />

              </div>

              <h3 className="mt-24 text-3xl font-black tracking-tight sm:text-4xl">
                Everyday
                <br />
                Expression.
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#16231D]/70">
                From fashion to personal care, we celebrate products
                that fit naturally into different lifestyles.
              </p>

            </div>


            {/* Card 3 */}
            <div className="about-reveal about-floating-card rounded-[2rem] bg-[#F3D45D] p-8 text-[#16231D] sm:p-12">

              <div className="flex items-start justify-between">

                <span className="text-5xl font-black">
                  03
                </span>

                <ArrowUpRight size={30} />

              </div>

              <h3 className="mt-24 text-3xl font-black tracking-tight sm:text-4xl">
                Thoughtful
                <br />
                Selection.
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#16231D]/70">
                A carefully structured product experience helps
                customers explore different categories in one place.
              </p>

            </div>


            {/* Card 4 */}
            <div className="about-reveal about-floating-card rounded-[2rem] border-2 border-[#16231D] bg-transparent p-8 sm:p-12">

              <div className="flex items-start justify-between">

                <span className="text-5xl font-black">
                  04
                </span>

                <ArrowUpRight size={30} />

              </div>

              <h3 className="mt-24 text-3xl font-black tracking-tight sm:text-4xl">
                Human
                <br />
                Experience.
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#624e3c]">
                We aim to keep the shopping journey welcoming,
                accessible, and easy to understand.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BIG STATEMENT
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F1E8DF] px-5 py-28 sm:px-10 md:px-16 lg:px-20 lg:py-44">

        {/* Decorative Shape */}
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full border-[40px] border-[#E96943]/20" />

        <div className="about-reveal relative mx-auto max-w-7xl">

          <p className="mb-10 text-xs font-black uppercase tracking-[0.3em] text-[#E96943]">
            04 / Our Promise
          </p>

          <h2 className="max-w-6xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl md:text-8xl lg:text-[9rem]">
            YOUR STYLE.
            <br />
            YOUR SPACE.
            <br />
            <span className="text-[#E96943]">YOUR ECOM.</span>
          </h2>


          <div className="mt-16 flex flex-col justify-between gap-8 border-t border-[#624e3c]/30 pt-6 sm:flex-row sm:items-end">

            <p className="max-w-md text-base leading-7 text-[#624e3c] sm:text-lg">
              Discover products that fit your everyday life.
              Explore your preferences and make your shopping
              experience your own.
            </p>

            <span className="text-6xl font-black text-[#F3D45D]">
              ✳
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-[#16231D] px-5 py-24 text-[#F1E8DF] sm:px-10 md:px-16 lg:px-20 lg:py-36">

        <div className="about-reveal mx-auto max-w-7xl">

          <div className="mb-12 flex items-center justify-between border-b border-white/20 pb-6">

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F3D45D]">
              05 / Start Exploring
            </span>

            <ShoppingBag size={24} className="text-[#F3D45D]" />

          </div>


          <h2 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl md:text-8xl">
            FIND YOUR
            <br />
            <span className="text-[#E96943]">NEXT</span>
            <br />
            FAVORITE.
          </h2>


          <div className="mt-14 flex flex-col justify-between gap-10 border-t border-white/20 pt-8 sm:flex-row sm:items-end">

            <p className="max-w-md text-base leading-7 text-white/60">
              Browse our collection of garments, cosmetics,
              and everyday essentials.
            </p>

            <Link
              to="/product"
              className="group inline-flex items-center justify-center gap-5 rounded-full bg-[#F3D45D] px-7 py-4 font-bold text-[#16231D] transition hover:bg-[#E96943] hover:text-white"
            >
              Shop Collection

              <MoveUpRight
                size={20}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER NOTE
      ===================================================== */}

      <div className="flex flex-col justify-between gap-4 bg-[#16231D] px-5 pb-8 text-xs font-semibold uppercase tracking-widest text-white/40 sm:flex-row sm:px-10 md:px-16 lg:px-20">

        <span>ECOM © 2026</span>

        <span>Made for everyday discovery.</span>

      </div>

    </main>
  );
};

export default About;