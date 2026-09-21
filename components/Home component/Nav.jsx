import { useState } from "react";
import { Heart, Search, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="w-full z-50 bg-[#F1E8DF] px-6 py-3 sm:px-8 lg:px-12 xl:px-20 border-b-1 fixed border-[#a9937d]">
      {/* Navbar Header */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold">
          <span className="text-[#E56B42]">E</span>
          <span className="bg-[radial-gradient(circle,_rgba(34,193,195,1)_0%,_rgba(253,187,45,1)_100%)] bg-clip-text text-transparent">
            COM
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 font-semibold text-[#624e3c] lg:flex">
          <li>
            <Link to="/" className="transition-colors hover:text-[#22a3a5]">
              HOME
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              className="transition-colors hover:text-[#22a3a5]"
            >
              PRODUCT
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="transition-colors hover:text-[#22a3a5]"
            >
              ABOUT
            </Link>
          </li>
        </ul>

        {/* Desktop Icons */}
        <ul className="hidden items-center gap-4 text-[#624e3c] lg:flex">
          <li>
            <Link
              to="/search"
              aria-label="Search"
              className="block transition hover:text-[#22a3a5]"
            >
              <Search size={21} />
            </Link>
          </li>

          <li>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="block transition hover:text-[#22a3a5]"
            >
              <Heart size={21} />
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="block transition hover:text-[#22a3a5]"
            >
              <ShoppingBag size={21} />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-[#624e3c] transition hover:bg-[#e5d9cd] lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[#d8cabe] pb-3 pt-4 lg:hidden">
          {/* Mobile Navigation */}
          <ul className="flex flex-col gap-4 font-semibold text-[#624e3c]">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block py-1 transition hover:text-[#22a3a5]"
              >
                HOME
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                onClick={closeMenu}
                className="block py-1 transition hover:text-[#22a3a5]"
              >
                PRODUCT
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                className="block py-1 transition hover:text-[#22a3a5]"
              >
                ABOUT
              </Link>
            </li>
          </ul>

          {/* Mobile Icons */}
          <div className="mt-5 flex items-center gap-5 border-t border-[#d8cabe] pt-4">
            <Link
              to="/search"
              onClick={closeMenu}
              aria-label="Search"
              className="text-[#624e3c] transition hover:text-[#22a3a5]"
            >
              <Search size={21} />
            </Link>

            <Link
              to="/wishlist"
              onClick={closeMenu}
              aria-label="Wishlist"
              className="text-[#624e3c] transition hover:text-[#22a3a5]"
            >
              <Heart size={21} />
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              aria-label="Shopping Cart"
              className="text-[#624e3c] transition hover:text-[#22a3a5]"
            >
              <ShoppingBag size={21} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
