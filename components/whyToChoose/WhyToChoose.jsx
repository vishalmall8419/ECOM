import CardSwap, { Card } from "./Cards";

export default function WhyToChoose() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f1e9] px-6 py-8 text-[#17211b] sm:px-10 lg:px-16 lg:py-12">
      {/* <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-[#17211b]/15 pb-6">
        <a
          className="font-display text-lg font-bold tracking-[-0.04em]"
          href="#top"
        >
          good<span className="text-[#e56b42]">.</span>goods
        </a>
        <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-[#17211b]/55 sm:block">
          The better way to shop
        </span>
        <button className="rounded-full border border-[#17211b]/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-[#17211b] hover:text-[#f3f1e9]">
          Explore shop
        </button>
      </nav> */}

      <section
        id="top"
        className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:py-8"
      >
        <div className="relative z-10 max-w-xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e56b42]">
            <span className="h-2 w-2 rounded-full bg-[#e56b42]" />
            Why choose us
          </p>
          <h1 className="font-display max-w-2xl text-5xl font-bold leading-[0.96] tracking-[-0.065em] sm:text-7xl">
            Shopping that feels{" "}
            <span className="text-[#e56b42]">worth it.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#17211b]/65 sm:text-lg">
            Thoughtfully chosen essentials, honest prices, and a smoother
            experience from your first click to your front door.
          </p>
          <div className="mt-12 grid max-w-md grid-cols-3 gap-5 border-t border-[#17211b]/15 pt-5">
            <div>
              <p className="font-display text-2xl font-bold tracking-[-0.05em]">
                4.9/5
              </p>
              <p className="mt-1 text-xs text-[#17211b]/55">Customer rating</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold tracking-[-0.05em]">
                48h
              </p>
              <p className="mt-1 text-xs text-[#17211b]/55">Dispatch time</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold tracking-[-0.05em]">
                30d
              </p>
              <p className="mt-1 text-xs text-[#17211b]/55">Easy returns</p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[560px] items-center justify-center lg:min-h-[600px]">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e56b42]/25 sm:h-[540px] sm:w-[540px]" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5d7c0]/55 sm:h-[400px] sm:w-[400px]" />
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
