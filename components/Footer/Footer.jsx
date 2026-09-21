import ShapeGrid from "./ShapeGrid";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative isolate min-h-[440px] overflow-hidden bg-[#120f17] text-[#f3f1e9]">
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          speed={0.5}
          squareSize={44}
          direction="diagonal"
          borderColor="#2f293a"
          hoverFillColor="#e56b42"
          hoverTrailAmount={2}
          shape="square"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[440px] max-w-7xl flex-col justify-between px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link to="/" className="text-3xl font-extrabold">
              <span className="text-[#E56B42]">E</span>
              <span className="bg-[radial-gradient(circle,_rgba(229,107,66,1)_0%,_rgba(253,187,45,1)_100%)] bg-clip-text text-transparent">
                COM
              </span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-white/60">
              Better everyday essentials, thoughtfully chosen and delivered with
              care.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                aria-label="Instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold transition hover:border-[#e56b42] hover:bg-[#e56b42]"
              >
                ig
              </a>
              <a
                aria-label="X"
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-bold transition hover:border-[#e56b42] hover:bg-[#e56b42]"
              >
                𝕏
              </a>
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold transition hover:border-[#e56b42] hover:bg-[#e56b42]"
              >
                in
              </a>
              <a
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-bold transition hover:border-[#e56b42] hover:bg-[#e56b42]"
              >
                f
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#e56b42]">
              Shop
            </h2>
            <nav className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <a href="#new-arrivals" className="transition hover:text-white">
                New arrivals
              </a>
              <a href="#best-sellers" className="transition hover:text-white">
                Best sellers
              </a>
              <a href="#collections" className="transition hover:text-white">
                Collections
              </a>
              <a href="#gift-cards" className="transition hover:text-white">
                Gift cards
              </a>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#e56b42]">
              Company
            </h2>
            <nav className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <a href="#about" className="transition hover:text-white">
                About us
              </a>
              <a href="#why-us" className="transition hover:text-white">
                Why choose us
              </a>
              <a href="#journal" className="transition hover:text-white">
                Our journal
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#e56b42]">
              Help
            </h2>
            <nav className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <a href="#shipping" className="transition hover:text-white">
                Shipping & returns
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQs
              </a>
              <a href="#privacy" className="transition hover:text-white">
                Privacy policy
              </a>
              <a href="#terms" className="transition hover:text-white">
                Terms of service
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/15 pt-5 text-xs text-white/45 sm:flex-row">
          <p>© 2026 good.goods. Made for better everyday.</p>
          <a
            className="transition hover:text-white"
            href="mailto:hello@goodgoods.example"
          >
            hello@goodgoods.example
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
