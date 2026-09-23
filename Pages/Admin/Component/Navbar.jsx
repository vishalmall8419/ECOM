import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  ShoppingBag,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
  Menu,
  LayoutDashboard,
  Package,
} from "lucide-react";

const AdminNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Search Handler
  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    navigate(`/dashboard/search?query=${encodeURIComponent(query)}`);
  };

  // Logout Handler
  const handleLogout = () => {
    sessionStorage.removeItem("Role");

    setIsProfileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#624e3c]/15 bg-[#F1E8DF]/95 backdrop-blur-md">
      <div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* =====================================
            LEFT SECTION
        ===================================== */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16231D] text-[#F1E8DF] transition hover:bg-[#E96943] lg:hidden"
            aria-label="Open admin sidebar"
          >
            <Menu size={19} />
          </button>

          {/* Mobile Brand */}
          <Link
            to="/"
            className="text-xl font-black tracking-[-0.07em] text-[#16231D] lg:hidden"
          >
            ECOM.
          </Link>

          {/* Desktop Heading */}
          <div className="hidden lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#624e3c]/60">
              Admin Portal
            </p>

            <h1 className="mt-1 text-xl font-black tracking-[-0.05em] text-[#16231D]">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* =====================================
            SEARCH BAR
        ===================================== */}
        <form
          onSubmit={handleSearch}
          className="hidden max-w-md flex-1 md:flex"
        >
          <div className="group relative w-full">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#624e3c]/50 transition group-focus-within:text-[#E96943]"
            />

            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search users, products..."
              className="w-full rounded-full border border-[#624e3c]/20 bg-white/60 py-3 pl-11 pr-4 text-xs text-[#16231D] outline-none transition placeholder:text-[#624e3c]/50 focus:border-[#E96943] focus:bg-white"
            />
          </div>
        </form>

        {/* =====================================
            RIGHT SECTION
        ===================================== */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/search")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#624e3c]/15 bg-white/50 text-[#16231D] transition hover:bg-[#F3D45D] md:hidden"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Orders */}
          <Link
            to="/dashboard/orders"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#624e3c]/15 bg-white/50 text-[#16231D] transition hover:bg-[#F3D45D] sm:flex"
            aria-label="Orders"
          >
            <Package size={18} strokeWidth={1.8} />
          </Link>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/notifications")}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#624e3c]/15 bg-white/50 text-[#16231D] transition hover:bg-[#F3D45D]"
            aria-label="Notifications"
          >
            <Bell size={18} strokeWidth={1.8} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#E96943]" />
          </button>

          {/* Admin Profile */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen((previousValue) => !previousValue);
              }}
              className="flex items-center gap-2 rounded-full border border-[#624e3c]/15 bg-white/50 p-1.5 pr-2 transition hover:bg-[#F3D45D] sm:gap-3 sm:pr-3"
              aria-expanded={isProfileOpen}
              aria-label="Open admin profile menu"
            >
              {/* Admin Avatar */}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16231D] text-xs font-bold text-[#F3D45D]">
                A
              </span>

              {/* Admin Name */}
              <span className="hidden text-left sm:block">
                <span className="block text-[10px] font-black text-[#16231D]">
                  Admin
                </span>

                <span className="block text-[9px] text-[#624e3c]/60">
                  Administrator
                </span>
              </span>

              <ChevronDown
                size={15}
                className={`hidden text-[#624e3c] transition-transform sm:block ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* =====================================
                PROFILE DROPDOWN
            ===================================== */}
            {isProfileOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-56 overflow-hidden rounded-2xl border border-[#624e3c]/15 bg-[#F1E8DF] p-2 shadow-xl shadow-[#624e3c]/10">
                {/* Dropdown Header */}
                <div className="border-b border-[#624e3c]/15 px-3 py-3">
                  <p className="text-xs font-black text-[#16231D]">
                    Admin Account
                  </p>

                  <p className="mt-1 text-[10px] text-[#624e3c]/60">
                    Manage admin settings
                  </p>
                </div>

                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#624e3c] transition hover:bg-[#F3D45D] hover:text-[#16231D]"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>

                {/* Profile */}
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#624e3c] transition hover:bg-[#F3D45D] hover:text-[#16231D]"
                >
                  <UserRound size={16} />
                  My Profile
                </Link>

                {/* Settings */}
                <Link
                  to="/dashboard/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#624e3c] transition hover:bg-[#F3D45D] hover:text-[#16231D]"
                >
                  <Settings size={16} />
                  Settings
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#E96943] transition hover:bg-[#E96943]/10"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
