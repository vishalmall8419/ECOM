
import { useState, useEffect, useRef } from "react";

import {
  Heart,
  Search,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import gsap from "gsap";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ==========================================
  // REFS
  // ==========================================

  const navRef = useRef(null);
  const logoRef = useRef(null);

  const desktopLinksRef = useRef([]);
  const desktopIconsRef = useRef([]);

  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const mobileIconsRef = useRef(null);

  const lastScrollY = useRef(0);

  // ==========================================
  // ADD REFS
  // ==========================================

  const addDesktopLink = (element) => {
    if (
      element &&
      !desktopLinksRef.current.includes(element)
    ) {
      desktopLinksRef.current.push(element);
    }
  };

  const addDesktopIcon = (element) => {
    if (
      element &&
      !desktopIconsRef.current.includes(element)
    ) {
      desktopIconsRef.current.push(element);
    }
  };

  const addMobileLink = (element) => {
    if (
      element &&
      !mobileLinksRef.current.includes(element)
    ) {
      mobileLinksRef.current.push(element);
    }
  };

  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMenu = () => {
    setIsOpen(false);
  };

  // ==========================================
  // 1. NAVBAR ENTRANCE ANIMATION
  // ==========================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          logoRef.current,
          {
            x: -30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          desktopLinksRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
          },
          "-=0.3"
        )
        .from(
          desktopIconsRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // ==========================================
  // 2. HIDE / SHOW NAVBAR ON SCROLL
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep navbar visible when mobile menu is open
      if (isOpen) {
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scroll Down
      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > 100
      ) {
        gsap.to(navRef.current, {
          yPercent: -100,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      }

      // Scroll Up
      else if (currentScrollY < lastScrollY.current) {
        gsap.to(navRef.current, {
          yPercent: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // ==========================================
  // 3. MOBILE MENU ANIMATION
  // ==========================================

  useEffect(() => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.killTweensOf(menu);

        gsap.set(menu, {
          display: "block",
          height: 0,
          opacity: 0,
        });

        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        tl.to(menu, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
        })
          .from(
            mobileLinksRef.current,
            {
              x: -25,
              opacity: 0,
              duration: 0.4,
              stagger: 0.1,
            },
            "-=0.2"
          )
          .from(
            mobileIconsRef.current,
            {
              y: 20,
              opacity: 0,
              duration: 0.4,
            },
            "-=0.2"
          );
      } else {
        gsap.killTweensOf(menu);

        gsap.to(menu, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(menu, {
              display: "none",
            });
          },
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, [isOpen]);

  // ==========================================
  // 4. TEXT HOVER ANIMATION
  // ==========================================

  const handleTextEnter = (element) => {
    gsap.to(element, {
      y: -3,
      color: "#22a3a5",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleTextLeave = (element) => {
    gsap.to(element, {
      y: 0,
      color: "#624e3c",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // ==========================================
  // RETURN JSX
  // ==========================================

  return (
    <nav
      ref={navRef}
      className="fixed left-0 top-0 z-50 w-full border-b border-[#a9937d] bg-[#F1E8DF]"
    >
      {/* ==========================================
          NAVBAR HEADER
      ========================================== */}

      <div className="flex items-center justify-between px-6 py-3 sm:px-8 lg:px-12 xl:px-20">

        {/* LOGO */}

        <Link
          ref={logoRef}
          to="/"
          className="font-logo text-4xl font-bold tracking-tight"
        >
          <span className="text-[#E56B42]">E</span>

          <span className="bg-[radial-gradient(circle,_rgba(34,193,195,1)_0%,_rgba(253,187,45,1)_100%)] bg-clip-text text-transparent">
            COM
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <ul className="font-nav hidden items-center gap-8 text-sm font-semibold tracking-[0.12em] text-[#624e3c] lg:flex">

          <li>
            <Link
              ref={addDesktopLink}
              to="/"
              className="inline-block transition-colors"
              onMouseEnter={(e) =>
                handleTextEnter(e.currentTarget)
              }
              onMouseLeave={(e) =>
                handleTextLeave(e.currentTarget)
              }
            >
              HOME
            </Link>
          </li>

          <li>
            <Link
              ref={addDesktopLink}
              to="/products"
              className="inline-block transition-colors"
              onMouseEnter={(e) =>
                handleTextEnter(e.currentTarget)
              }
              onMouseLeave={(e) =>
                handleTextLeave(e.currentTarget)
              }
            >
              PRODUCT
            </Link>
          </li>

          <li>
            <Link
              ref={addDesktopLink}
              to="/about"
              className="inline-block transition-colors"
              onMouseEnter={(e) =>
                handleTextEnter(e.currentTarget)
              }
              onMouseLeave={(e) =>
                handleTextLeave(e.currentTarget)
              }
            >
              ABOUT
            </Link>
          </li>

        </ul>

        {/* DESKTOP ICONS */}

        <ul className="font-nav hidden items-center gap-5 text-[#624e3c] lg:flex">

          <li>
            <Link
              ref={addDesktopIcon}
              to="/search"
              aria-label="Search"
              className="block transition-colors hover:text-[#22a3a5]"
            >
              <Search size={21} strokeWidth={1.8} />
            </Link>
          </li>

          <li>
            <Link
              ref={addDesktopIcon}
              to="/wishlist"
              aria-label="Wishlist"
              className="block transition-colors hover:text-[#22a3a5]"
            >
              <Heart size={21} strokeWidth={1.8} />
            </Link>
          </li>

          <li>
            <Link
              ref={addDesktopIcon}
              to="/cart"
              aria-label="Shopping Cart"
              className="block transition-colors hover:text-[#22a3a5]"
            >
              <ShoppingBag size={21} strokeWidth={1.8} />
            </Link>
          </li>

        </ul>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-[#624e3c] transition hover:bg-[#e5d9cd] lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={26} strokeWidth={1.8} />
          ) : (
            <Menu size={26} strokeWidth={1.8} />
          )}
        </button>

      </div>

      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      <div
        ref={mobileMenuRef}
        className="hidden overflow-hidden border-t border-[#d8cabe] px-6 pb-3 pt-4 sm:px-8 lg:hidden"
      >

        {/* MOBILE NAVIGATION */}

        <ul className="font-nav flex flex-col gap-4 text-sm font-semibold tracking-[0.1em] text-[#624e3c]">

          <li>
            <Link
              ref={addMobileLink}
              to="/"
              onClick={closeMenu}
              className="block py-1 transition-colors hover:text-[#22a3a5]"
            >
              HOME
            </Link>
          </li>

          <li>
            <Link
              ref={addMobileLink}
              to="/products"
              onClick={closeMenu}
              className="block py-1 transition-colors hover:text-[#22a3a5]"
            >
              PRODUCT
            </Link>
          </li>

          <li>
            <Link
              ref={addMobileLink}
              to="/about"
              onClick={closeMenu}
              className="block py-1 transition-colors hover:text-[#22a3a5]"

>
              ABOUT
            </Link>
          </li>

        </ul>

        {/* MOBILE ICONS */}

        <div
          ref={mobileIconsRef}
          className="mt-5 flex items-center gap-5 border-t border-[#d8cabe] pt-4"
        >

          <Link
            to="/search"
            onClick={closeMenu}
            aria-label="Search"
            className="text-[#624e3c] transition-colors hover:text-[#22a3a5]"
          >
            <Search size={21} strokeWidth={1.8} />
          </Link>

          <Link
            to="/wishlist"
            onClick={closeMenu}
            aria-label="Wishlist"
            className="text-[#624e3c] transition-colors hover:text-[#22a3a5]"
          >
            <Heart size={21} strokeWidth={1.8} />
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
            aria-label="Shopping Cart"
            className="text-[#624e3c] transition-colors hover:text-[#22a3a5]"
          >
            <ShoppingBag size={21} strokeWidth={1.8} />
          </Link>

        </div>

      </div>

    </nav>
  );
};

export default Nav;