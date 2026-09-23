import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

import {
  ArrowUpRight,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShoppingBag,
  Sparkles,

} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const decorativeRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(pageRef.current, {
          opacity: 0,
          duration: 0.35,
        })
        .from(
          headerRef.current?.children || [],
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.1",
        )
        .from(
          cardRef.current,
          {
            opacity: 0,
            y: 70,
            scale: 0.96,
            duration: 1,
          },
          "-=0.25",
        )
        .from(
          leftPanelRef.current?.querySelectorAll(".login-left-item") || [],
          {
            opacity: 0,
            y: 28,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.45",
        )
        .from(
          headingRef.current?.querySelectorAll(".login-word") || [],
          {
            opacity: 0,
            y: 45,
            rotateX: -70,
            transformOrigin: "50% 100%",
            duration: 0.8,
            stagger: 0.13,
          },
          "-=0.5",
        )
        .from(
          rightPanelRef.current?.querySelectorAll(".login-right-item") || [],
          {
            opacity: 0,
            y: 25,
            duration: 0.6,
            stagger: 0.1,
            clearProps: "opacity,transform",
          },
          "-=0.65",
        );

      decorativeRefs.current.forEach((element, index) => {
        if (!element) return;

        gsap.fromTo(
          element,
          {
            scale: 0.75,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            delay: index * 0.15,
            ease: "power2.out",
          },
        );
      });

      gsap.to(".login-floating-sparkle", {
        y: -10,
        rotate: 8,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
    const role = "admin"
    const DummyToken = "ajkhdadsakjsdhadlkasdhadsnasdvavdjasdabdsakhdsakjdsavdsbkajdaksdnbasjd"
    sessionStorage.setItem("DummyToken", DummyToken)
    sessionStorage.setItem("Role", role)
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#F1E8DF] text-[#16231D]"
    >
      <header
        ref={headerRef}
        className="flex items-center justify-between px-5 py-6 sm:px-10 lg:px-16"
      >
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16231D] text-[#F3D45D]">
            <ShoppingBag size={17} />
          </span>

          <span className="text-xl font-black tracking-[-0.06em]">ECOM.</span>
        </Link>

        <Link
          to="/"
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#624e3c] transition hover:text-[#E96943]"
        >
          Back to store
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      </header>

      <section className="relative flex min-h-[calc(100vh-100px)] items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
        <div
          ref={(element) => (decorativeRefs.current[0] = element)}
          className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#F3D45D]/50 blur-[1px]"
        />

        <div
          ref={(element) => (decorativeRefs.current[1] = element)}
          className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#E96943]/15"
        />

        <div className="login-floating-sparkle pointer-events-none absolute right-[10%] top-10 hidden text-[#E96943] sm:block">
          <Sparkles size={38} strokeWidth={1.5} />
        </div>

        <div
          ref={cardRef}
          className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#624e3c]/15 bg-[#E8DDCB] shadow-2xl shadow-[#624e3c]/10 lg:grid-cols-2"
        >
          <div
            ref={leftPanelRef}
            className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-[#16231D] p-10 text-[#F1E8DF] sm:p-14 lg:flex"
          >
            <div
              ref={(element) => (decorativeRefs.current[2] = element)}
              className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#E96943]"
            />

            <div
              ref={(element) => (decorativeRefs.current[3] = element)}
              className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#F3D45D]"
            />

            <div className="login-left-item relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F3D45D]">
                ECOM / ACCESS
              </span>

              <span className="text-xs font-semibold text-white/50">
                EST. 2026
              </span>
            </div>

            <div className="login-left-item relative z-10">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#E96943]" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                  Welcome Back
                </span>
              </div>

              <h1
                ref={headingRef}
                className="text-6xl font-black leading-[0.88] tracking-[-0.07em] xl:text-8xl"
              >
                <span className="login-word inline-block">YOUR</span>

                <span className="login-word inline-block">STYLE.</span>

                <br />

                <span className="text-[#E96943] pr-2">
                  <span className="login-word inline-block">YOUR</span>
                </span>

                <span className="login-word inline-block">SPACE.</span>
              </h1>

              <p className="mt-10 max-w-sm text-sm leading-7 text-white/60">
                Discover a world of everyday essentials, personal style, and
                products made to fit your unique lifestyle.
              </p>
            </div>

            <div className="login-left-item relative z-10 flex items-end justify-between border-t border-white/15 pt-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#a95d07]">
                  More than shopping.
                </p>

                <p className="mt-2 text-xs text-white/60">
                  Discover. Explore. Belong.
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F3D45D] text-[#16231D]">
                <ArrowUpRight size={23} />
              </div>
            </div>
          </div>

          <div
            ref={rightPanelRef}
            className="flex min-h-[650px] flex-col justify-center bg-[#F1E8DF] p-6 sm:p-12 lg:p-14 xl:p-20"
          >
            <div className="mb-10 flex items-center gap-2 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16231D] text-[#F3D45D]">
                <ShoppingBag size={17} />
              </span>

              <span className="text-xl font-black tracking-[-0.06em]">
                ECOM.
              </span>
            </div>

            <div className="mb-3">
              <span className="mb-2 inline-block rounded-full bg-[#F3D45D] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#16231D]">
                Member Access
              </span>

              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                WELCOME
                <span className="ml-2 text-[#E96943]">BACK.</span>
              </h2>

              <small className="mt-1 max-w-sm text-sm leading-6 text-[#624e3c]/80">
                Sign in to continue your shopping journey and explore your
                favorites.
              </small>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-black uppercase tracking-widest text-[#624e3c]"
                >
                  Email Address
                </label>

                <div className="group relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#624e3c]/60 transition group-focus-within:text-[#E96943]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#624e3c]/25 bg-white/50 py-4 pl-12 pr-4 text-sm text-[#16231D] outline-none transition placeholder:text-[#624e3c]/40 focus:border-[#E96943] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-black uppercase tracking-widest text-[#624e3c]"
                >
                  Password
                </label>

                <div className="group relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#624e3c]/60 transition group-focus-within:text-[#E96943]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-[#624e3c]/25 bg-white/50 py-4 pl-12 pr-12 text-sm text-[#16231D] outline-none transition placeholder:text-[#624e3c]/40 focus:border-[#E96943] focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#624e3c]/60 transition hover:text-[#E96943]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-[#624e3c]">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 cursor-pointer accent-[#E96943]"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-[#E96943] transition hover:text-[#16231D]"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-4 rounded-full bg-[#16231D] px-6 py-4 text-sm font-bold text-[#F1E8DF] transition duration-300 hover:bg-[#E96943]"
              >
                Sign In
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="my-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#624e3c]/20" />

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#624e3c]/60">
                New here?
              </span>

              <div className="h-px flex-1 bg-[#624e3c]/20" />
            </div>

            <Link
              to="/register"
              className="group flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#16231D] px-6 py-3.5 text-sm font-bold text-[#16231D] transition duration-300 hover:bg-[#F3D45D]"
            >
              Create an Account
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>

            <p className="mt-8 text-center text-[10px] leading-5 text-[#624e3c]/60">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="font-bold text-[#624e3c] underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-bold text-[#624e3c] underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-3 px-5 pb-6 text-[10px] font-bold uppercase tracking-widest text-[#624e3c]/60 sm:flex-row sm:px-10 lg:px-16">
        <span>ECOM © 2026</span>

        <span>Designed for everyday discovery.</span>
      </footer>
    </main>
  );
};

export default Login;
