import CardSwap, { Card } from "./Cards";

export default function WhyToChoose() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f1e9] px-4 py-6 text-[#17211b] sm:px-8 sm:py-8 lg:px-16 lg:py-12">
      <section
        id="top"
        className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 py-10 sm:gap-12 sm:py-14 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:py-8"
      >
        <div className="relative z-10 max-w-xl">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e56b42] sm:mb-6 sm:text-xs sm:tracking-[0.24em]">
            <span className="h-2 w-2 rounded-full bg-[#e56b42]" />
            Why choose us
          </p>
          <h1 className="font-display max-w-2xl text-4xl font-bold leading-[0.98] tracking-[-0.065em] sm:text-5xl lg:text-7xl">
            Shopping that feels{" "}
            <span className="text-[#e56b42]">worth it.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-6 text-[#17211b]/65 sm:mt-8 sm:text-lg sm:leading-7">
            Thoughtfully chosen essentials, honest prices, and a smoother
            experience from your first click to your front door.
          </p>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-[#17211b]/15 pt-4 sm:mt-12 sm:gap-5 sm:pt-5">
            <div>
              <p className="font-display text-2xl font-bold tracking-[-0.05em]">
                4.9/5
              </p>
              <p className="mt-1 text-[10px] leading-4 text-[#17211b]/55 sm:text-xs">
                Customer rating
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold tracking-[-0.05em]">
                48h
              </p>
              <p className="mt-1 text-[10px] leading-4 text-[#17211b]/55 sm:text-xs">
                Dispatch time
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold tracking-[-0.05em]">
                30d
              </p>
              <p className="mt-1 text-[10px] leading-4 text-[#17211b]/55 sm:text-xs">
                Easy returns
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[390px] items-center justify-center sm:min-h-[560px] lg:min-h-[600px]">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e56b42]/25 sm:h-[420px] sm:w-[420px] lg:h-[540px] lg:w-[540px]" />
          <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5d7c0]/55 sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]" />
          <div className="relative h-[500px] w-full max-w-[620px]">
            <CardSwap
              width={390}
              height={410}
              cardDistance={54}
              verticalDistance={65}
              delay={4500}
              pauseOnHover
              skewAmount={4}
            >
              <Card className="flex flex-col justify-between border-[#17211b]/10 bg-[#fffdf7] p-8 text-[#17211b] shadow-[0_24px_60px_rgba(23,33,27,0.15)] sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-bold tracking-[-0.08em] text-[#e56b42]">
                    01
                  </span>
                  <span className="rounded-full bg-[#e9f0df] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                    Our promise
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-[-0.06em]">
                    Curated quality
                  </h2>
                  <p className="mt-4 max-w-xs leading-7 text-[#17211b]/60">
                    Every product earns its place through usefulness, materials,
                    and everyday staying power.
                  </p>
                </div>
              </Card>
              <Card className="flex flex-col justify-between border-[#17211b]/10 bg-[#17211b] p-8 text-[#f3f1e9] shadow-[0_24px_60px_rgba(23,33,27,0.22)] sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-bold tracking-[-0.08em] text-[#e7c85d]">
                    02
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
                    Always clear
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-[-0.06em]">
                    Fair prices
                  </h2>
                  <p className="mt-4 max-w-xs leading-7 text-white/60">
                    No inflated markups or confusing offers. Just honest value
                    you can feel good about.
                  </p>
                </div>
              </Card>
              <Card className="flex flex-col justify-between border-[#17211b]/10 bg-[#e56b42] p-8 text-[#fffdf7] shadow-[0_24px_60px_rgba(229,107,66,0.28)] sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-bold tracking-[-0.08em]">
                    03
                  </span>
                  <span className="rounded-full bg-black/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                    On the way
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-[-0.06em]">
                    Delivery you trust
                  </h2>
                  <p className="mt-4 max-w-xs leading-7 text-white/75">
                    Fast dispatch, useful updates, and support from real people
                    when you need it.
                  </p>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>
    </main>
  );
}
