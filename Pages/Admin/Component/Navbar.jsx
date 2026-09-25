import { Link, useNavigate } from "react-router-dom";

import {
  Bell,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
  Menu,
  LayoutDashboard,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useState } from "react";

const AdminNavbar = ({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // =====================================
  // MOBILE SIDEBAR HANDLER
  // =====================================

  const handleMenuClick = () => {
    if (typeof setIsMobileOpen === "function") {
      setIsMobileOpen(true);
    }
  };

  // =====================================
  // DESKTOP SIDEBAR HANDLER
  // =====================================

  const handleSidebarToggle = () => {
    if (typeof setIsCollapsed === "function") {
      setIsCollapsed((previousValue) => !previousValue);
    }
  };

  // =====================================
  // LOGOUT HANDLER
  // =====================================

  const handleLogout = () => {
    sessionStorage.removeItem("Role");

    setIsProfileOpen(false);

    if (typeof setIsMobileOpen === "function") {
      setIsMobileOpen(false);
    }

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#624e3c]/30 bg-[#000000] backdrop-blur-md">
      <div className="flex h-[82px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* =====================================
            LEFT SECTION
        ===================================== */}

        <div className="flex shrink-0 items-center gap-3">
          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={handleMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3D45D] text-[#16231D] transition hover:bg-[#E5C34B] lg:hidden"
            aria-label="Open admin sidebar"
          >
            <Menu size={19} />
          </button>

          {/* Mobile Brand */}

          <Link
            to="/"
            className="flex items-center gap-1 font-logo text-xl font-bold tracking-tight lg:hidden"
          >
            <span className="text-[#E56B42]">E</span>

            <span className="bg-[radial-gradient(circle,_rgba(34,193,195,1)_0%,_rgba(253,187,45,1)_100%)] bg-clip-text text-transparent">
              COM
            </span>
          </Link>

          {/* Desktop Sidebar Toggle */}

          <button
            type="button"
            onClick={handleSidebarToggle}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#624e3c]/40 bg-[#16231D] text-white/60 transition hover:bg-white/10 hover:text-[#F3D45D] lg:flex"
            aria-label={
              isCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            title={
              isCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {isCollapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <PanelLeftClose size={19} />
            )}
          </button>

          {/* Desktop Heading */}

          <div className="hidden lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Admin Portal
            </p>

          </div>
        </div>

        {/* =====================================
            RIGHT SECTION
        ===================================== */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Orders */}

          <Link
            to="/dashboard/orders"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#624e3c]/40 bg-[#16231D] text-white/60 transition hover:bg-white/[0.07] hover:text-[#F3D45D] sm:flex"
            aria-label="Orders"
          >
            <Package size={18} strokeWidth={1.8} />
          </Link>

          {/* Notifications */}

          <button
            type="button"
            onClick={() => navigate("/dashboard/notifications")}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#624e3c]/40 bg-[#16231D] text-white/60 transition hover:bg-white/[0.07] hover:text-[#F3D45D]"
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
                setIsProfileOpen(
                  (previousValue) => !previousValue,
                );
              }}
              className="flex items-center gap-2 rounded-full border border-[#624e3c]/40 bg-[#16231D] p-1.5 pr-2 transition hover:bg-white/[0.07] sm:gap-3 sm:pr-3"
              aria-expanded={isProfileOpen}
              aria-label="Open admin profile menu"
            >
              {/* Admin Avatar */}

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3D45D] text-xs font-bold text-[#16231D]">
                A
              </span>

              {/* Admin Name */}

              <span className="hidden text-left sm:block">
                <span className="block text-[10px] font-black text-[#F1E8DF]">
                  Admin
                </span>

                <span className="block text-[9px] text-white/50">
                  Administrator
                </span>
              </span>

              <ChevronDown
                size={15}
                className={`hidden text-white/50 transition-transform sm:block ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* =====================================
                PROFILE DROPDOWN
            ===================================== */}

            {isProfileOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-56 overflow-hidden rounded-2xl border border-[#624e3c]/40 bg-[#16231D] p-2 shadow-xl shadow-black/30">
                {/* Dropdown Header */}

                <div className="border-b border-white/10 px-3 py-3">
                  <p className="text-xs font-black text-[#F1E8DF]">
                    Admin Account
                  </p>

                  <p className="mt-1 text-[10px] text-white/50">
                    Manage admin settings
                  </p>
                </div>

                {/* Dashboard */}

                <Link
                  to="/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-white/60 transition hover:bg-white/[0.07] hover:text-[#F1E8DF]"
                >
                  <LayoutDashboard size={16} />

                  Dashboard
                </Link>

                {/* Profile */}

                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-white/60 transition hover:bg-white/[0.07] hover:text-[#F1E8DF]"
                >
                  <UserRound size={16} />

                  My Profile
                </Link>

                {/* Settings */}

                <Link
                  to="/dashboard/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-white/60 transition hover:bg-white/[0.07] hover:text-[#F1E8DF]"
                >
                  <Settings size={16} />

                  Settings
                </Link>

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#E96943] transition hover:bg-[#E96943]/15"
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