import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";

import gsap from "gsap";

// ============================================
// GOOGLE ICON
// ============================================

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"
    />

    <path
      fill="#34A853"
      d="M12 21.67c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.67Z"
    />

    <path
      fill="#FBBC05"
      d="M6.53 13.76a5.86 5.86 0 0 1 0-3.52V7.71H3.28a9.75 9.75 0 0 0 0 8.58l3.25-2.53Z"
    />

    <path
      fill="#EA4335"
      d="M12 6.21c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 3.3 14.63 2.33 12 2.33a9.74 9.74 0 0 0-8.72 5.38l3.25 2.53C7.3 7.93 9.46 6.21 12 6.21Z"
    />
  </svg>
);

// ============================================
// REGISTER COMPONENT
// ============================================

const Register = () => {
  // ============================================
  // REFS
  // ============================================

  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // ============================================
  // STATES
  // ============================================

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  // ============================================
  // GSAP ANIMATION
  // ============================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // ----------------------------------------
      // CARD ANIMATION
      // ----------------------------------------

      timeline.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          clearProps: "opacity,transform",
        }
      );

      // ----------------------------------------
      // LEFT PANEL ANIMATION
      // ----------------------------------------

      const leftItems =
        leftRef.current?.querySelectorAll(
          ".register-left-item"
        ) || [];

      timeline.fromTo(
        leftItems,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          clearProps: "opacity,transform",
        },
        "-=0.35"
      );

      // ----------------------------------------
      // LEFT HEADING TEXT STAGGER
      // ----------------------------------------

      const registerWords =
        leftRef.current?.querySelectorAll(
          ".register-word"
        ) || [];

      timeline.fromTo(
        registerWords,
        {
          opacity: 0,
          y: 30,
          rotateX: -70,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.12,
          transformOrigin: "top center",
          clearProps: "opacity,transform",
        },
        "-=0.25"
      );

      // ----------------------------------------
      // RIGHT PANEL ANIMATION
      // IMPORTANT:
      // Use fromTo instead of only from.
      // This prevents opacity 0 issue.
      // ----------------------------------------

      const rightItems =
        rightRef.current?.querySelectorAll(
          ".register-right-item"
        ) || [];

      timeline.fromTo(
        rightItems,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          clearProps: "opacity,transform",
        },
        "-=0.3"
      );

      // ----------------------------------------
      // DECORATIVE CIRCLES
      // ----------------------------------------

      gsap.fromTo(
        ".register-decoration",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.12,
          clearProps: "opacity,transform",
        }
      );

      // ----------------------------------------
      // FINAL VISIBILITY SAFETY
      // ----------------------------------------

      timeline.call(() => {
        gsap.set(rightItems, {
          opacity: 1,
          visibility: "visible",
        });
      });
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // ============================================
  // HANDLE REGISTER SUBMIT
  // ============================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!formData.agree) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    console.log("Register Data:", formData);

    // Connect your real registration API here.
  };

  // ============================================
  // GOOGLE AUTH
  // ============================================

  const handleGoogleAuth = () => {
    // Connect Firebase or Google OAuth here.
    console.log("Google Authentication clicked");
  };

  // ============================================
  // INPUT CLASSES
  // ============================================

  const inputClass =
    "w-full rounded-lg border border-[#624e3c]/25 bg-white/50 py-3 pl-10 pr-3 text-xs text-[#16231D] outline-none transition placeholder:text-[#624e3c]/40 focus:border-[#E96943] focus:bg-white";

  const passwordClass =
    "w-full rounded-lg border border-[#624e3c]/25 bg-white/50 py-3 pl-10 pr-10 text-xs text-[#16231D] outline-none transition placeholder:text-[#624e3c]/40 focus:border-[#E96943] focus:bg-white";

  const labelClass =
    "mb-1.5 block text-[10px] font-black uppercase tracking-widest text-[#624e3c]";

  // ============================================
  // JSX
  // ============================================

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#F1E8DF] text-[#16231D]"
    >
      {/* ========================================
          HEADER
      ======================================== */}

      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16231D] text-[#F3D45D]">
            <ShoppingBag size={15} />
          </span>

          <span className="text-lg font-black tracking-[-0.06em]">
            ECOM.
          </span>
        </Link>

        <Link
          to="/"
          className="group flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#624e3c] transition hover:text-[#E96943]"
        >
          Back to store

          <ArrowUpRight
            size={14}
            className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      </header>

      {/* ========================================
          MAIN SECTION
      ======================================== */}

      <section className="relative flex items-center justify-center px-4 py-5 sm:px-8">

        {/* Background Decorations */}

        <div className="register-decoration pointer-events-none absolute -left-24 top-5 h-56 w-56 rounded-full bg-[#F3D45D]/50" />

        <div className="register-decoration pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[#E96943]/15" />

        <div className="pointer-events-none absolute right-[10%] top-5 hidden text-[#E96943] sm:block">
          <Sparkles
            size={32}
            strokeWidth={1.5}
          />
        </div>

        {/* ========================================
            MAIN CARD
        ======================================== */}

        <div
          ref={cardRef}
          className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-[#624e3c]/15 bg-[#E8DDCB] shadow-xl lg:grid-cols-2"
        >

          {/* ======================================
              LEFT PANEL
          ====================================== */}

          <div className="relative hidden min-h-[590px] flex-col justify-between overflow-hidden bg-[#16231D] p-10 text-[#F1E8DF] lg:flex">

            {/* Left Decorations */}

            <div className="register-decoration absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#E96943]" />

            <div className="register-decoration absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#F3D45D]" />

            {/* Left Content */}

            <div
              ref={leftRef}
              className="relative z-10 flex h-full flex-col justify-between"
            >

              {/* Top Content */}

              <div className="register-left-item flex justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F3D45D]">
                  ECOM / JOIN US
                </span>

                <span className="text-[10px] text-white/50">
                  EST. 2026
                </span>
              </div>

              {/* Main Branding */}

              <div className="register-left-item">

                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#E96943]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Create Your Account
                  </span>
                </div>

                <h1 className="text-6xl font-black leading-[0.86] tracking-[-0.07em]">
                  <span className="register-word inline-block">
                    FIND
                  </span>

                  <br />

                  <span className="register-word inline-block">
                    YOUR
                  </span>

                  <br />

                  <span className="register-word inline-block text-[#E96943]">
                    STYLE.
                  </span>
                </h1>

                <p className="mt-7 max-w-xs text-xs leading-6 text-white/60">
                  Discover everyday essentials, personal style,
                  and products made for your unique lifestyle.
                </p>
              </div>

              {/* Bottom Content */}

              <div className="register-left-item flex items-end justify-between border-t border-white/15 pt-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#e8ae4b]">
                    Your journey starts here.
                  </p>

                  <p className="mt-1 text-[10px] text-white/70">
                    Discover. Explore. Belong.
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3D45D] text-[#16231D]">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* ======================================
              RIGHT PANEL
          ====================================== */}

          <div
            ref={rightRef}
            className="bg-[#F1E8DF] p-5 sm:p-8 lg:p-10"
          >

            {/* Mobile Logo */}

            <div className="register-right-item mb-5 flex items-center gap-2 lg:hidden">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16231D] text-[#F3D45D]">
                <ShoppingBag size={15} />
              </span>

              <span className="text-lg font-black tracking-[-0.06em]">
                ECOM.
              </span>
            </div>

            {/* Heading */}

            <div className="register-right-item mb-5">
              <span className="mb-3 inline-block rounded-full bg-[#F3D45D] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#16231D]">
                New Member
              </span>

              <h2 className="text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl">
                CREATE
                <br />

                <span className="text-[#E96943]">
                  ACCOUNT.
                </span>
              </h2>

              <p className="mt-3 text-xs leading-5 text-[#624e3c]/80">
                Create your account and start your shopping journey.
              </p>
            </div>

            {/* Google Button */}

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="register-right-item flex w-full items-center justify-center gap-3 rounded-xl border border-[#624e3c]/25 bg-white/60 px-4 py-3 text-xs font-bold transition hover:border-[#E96943] hover:bg-white"
            >
              <GoogleIcon />

              Continue with Google
            </button>

            {/* Divider */}

            <div className="register-right-item my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#624e3c]/20" />

              <span className="text-[9px] font-bold uppercase tracking-widest text-[#624e3c]/60">
                Or use email
              </span>

              <div className="h-px flex-1 bg-[#624e3c]/20" />
            </div>

            {/* ====================================
                REGISTER FORM
            ==================================== */}

            <form
              onSubmit={handleSubmit}
              className="register-right-item space-y-3"
            >

              {/* Full Name */}

              <div>
                <label
                  htmlFor="name"
                  className={labelClass}
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#624e3c]/60"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className={labelClass}
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#624e3c]/60"
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
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="password"
                  className={labelClass}
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#624e3c]/60"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className={passwordClass}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setShowPassword((previousValue) => !previousValue);
                    }}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#624e3c]/60 hover:text-[#E96943]"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className={labelClass}
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#624e3c]/60"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className={passwordClass}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setShowConfirmPassword(
                        (previousValue) => !previousValue
                      );
                    }}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#624e3c]/60 hover:text-[#E96943]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}

              <label className="flex cursor-pointer items-start gap-2 pt-1 text-[10px] leading-4 text-[#624e3c]">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-0.5 h-3.5 w-3.5 cursor-pointer accent-[#E96943]"
                />

                <span>
                  I agree to the{" "}

                  <Link
                    to="/terms"
                    className="font-bold underline"
                  >
                    Terms
                  </Link>

                  {" "}and{" "}

                  <Link
                    to="/privacy"
                    className="font-bold underline"
                  >
                    Privacy Policy
                  </Link>

                  .
                </span>
              </label>

              {/* Error Message */}

              {error && (
                <p className="text-[10px] font-semibold text-[#E96943]">
                  {error}
                </p>
              )}

              {/* Create Account Button */}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#16231D] px-5 py-3.5 text-xs font-bold text-[#F1E8DF] transition hover:bg-[#E96943]"
              >
                Create Account

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Already Member Divider */}

            <div className="register-right-item my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#624e3c]/20" />

              <span className="text-[9px] font-bold uppercase tracking-widest text-[#624e3c]/60">
                Already a member?
              </span>

              <div className="h-px flex-1 bg-[#624e3c]/20" />
            </div>

            {/* Sign In Link */}

            <Link
              to="/login"
              className="register-right-item group flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#16231D] px-5 py-3 text-xs font-bold text-[#16231D] transition hover:bg-[#F3D45D]"
            >
              Sign In

              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
      ======================================== */}

      <footer className="flex justify-between gap-3 px-4 pb-4 text-[9px] font-bold uppercase tracking-widest text-[#624e3c]/60 sm:px-8">
        <span>ECOM © 2026</span>

        <span>Designed for everyday discovery.</span>
      </footer>
    </main>
  );
};

export default Register;