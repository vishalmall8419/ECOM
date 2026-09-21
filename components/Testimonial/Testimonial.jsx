import { useState } from "react";
import BounceCards from "./BounceCards";

const images = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop&auto=format",
];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)",
];

const testimonials = [
  {
    quote: "Everything feels considered and easy to love.",
    name: "Ava Mitchell",
    location: "Portland",
  },
  {
    quote: "The photos match what arrives. That is rare.",
    name: "Theo Brooks",
    location: "Austin",
  },
  {
    quote: "The quality is genuinely noticeable every day.",
    name: "Nia Carter",
    location: "Chicago",
  },
  {
    quote: "Simple, useful, and beautifully made.",
    name: "Maya Lewis",
    location: "Brooklyn",
  },
  {
    quote: "A smooth experience from click to delivery.",
    name: "Eli Morgan",
    location: "Seattle",
  },
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f1e9] px-4 py-8 text-[#17211b] sm:px-8 sm:py-12 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 border-b border-[#17211b]/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e56b42] sm:text-xs sm:tracking-[0.24em]">
              <span className="h-2 w-2 rounded-full bg-[#e56b42]" />
              Kind words from good people
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
              The good stuff is better{" "}
              <span className="text-[#e56b42]">together.</span>
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#17211b]/65 sm:pb-1">
            Real routines, real recommendations, and a little proof that
            thoughtful shopping makes a difference.
          </p>
        </div>

        <div className="grid items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-20">
          <div className="flex min-h-[300px] items-center justify-center overflow-visible sm:min-h-[390px]">
            <div className="origin-center scale-[0.55] sm:scale-[0.76] lg:scale-100">
              <BounceCards
                className="custom-bounceCards"
                images={images}
                containerWidth={500}
                containerHeight={300}
                animationDelay={0.7}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.5)"
                transformStyles={transformStyles}
                testimonials={testimonials}
                onCardHover={(index) => setActiveIndex(index ?? 0)}
                enableHover
              />
            </div>
          </div>

          <div className="relative max-w-xl" aria-live="polite">
            <span className="font-display text-7xl leading-none text-[#e56b42]/35">
              “
            </span>
            <div key={activeIndex} className="animate-[fade-in_300ms_ease-out]">
              <blockquote className="-mt-4 font-display text-2xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl">
                {activeTestimonial.quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-4 border-t border-[#17211b]/15 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e56b42] font-display font-bold text-white">
                  {activeTestimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-bold">{activeTestimonial.name}</p>
                  <p className="text-sm text-[#17211b]/55">
                    Verified customer · {activeTestimonial.location}
                  </p>
                </div>
                <span className="ml-auto text-sm tracking-[0.2em] text-[#e56b42]">
                  ★★★★★
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-[#17211b]/15 pt-8 sm:grid-cols-3">
          <article className="rounded-2xl bg-[#fffdf7] p-6 shadow-[0_12px_30px_rgba(23,33,27,0.06)]">
            <p className="text-sm leading-6 text-[#17211b]/70">
              “The quality is genuinely noticeable. These are the things I reach
              for first every morning.”
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#e56b42]">
              Nia · Chicago
            </p>
          </article>
          <article className="rounded-2xl bg-[#17211b] p-6 text-[#f3f1e9] shadow-[0_12px_30px_rgba(23,33,27,0.1)]">
            <p className="text-sm leading-6 text-white/70">
              “Finally, a shop where the photos match what arrives. Simple,
              useful, and beautifully made.”
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#e7c85d]">
              Theo · Austin
            </p>
          </article>
          <article className="rounded-2xl bg-[#e56b42] p-6 text-white shadow-[0_12px_30px_rgba(229,107,66,0.16)]">
            <p className="text-sm leading-6 text-white/80">
              “The return process was effortless, but I have not needed it yet.
              Everything has been a keeper.”
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-white/75">
              Maya · Brooklyn
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Testimonial;
