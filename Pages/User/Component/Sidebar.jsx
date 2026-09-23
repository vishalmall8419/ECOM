import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  ShoppingCart,
  UserRound,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Package,
} from "lucide-react";

const UserSidebar = () => {
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [visiblity, setVisiblity] = useState("block");

 const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "My Orders",
    path: "/dashboard/orders",
    icon: Package,
  },
  {
    name: "Wishlist",
    path: "/dashboard/wishlist",
    icon: Heart,
  },
  {
    name: "My Cart",
    path: "/dashboard/cart",
    icon: ShoppingCart,
  },
  {
    name: "My Profile",
    path: "/dashboard/profile",
    icon: UserRound,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

  const handleLogout = () => {
    sessionStorage.removeItem("Role");

    setIsMobileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ========================================
          MOBILE MENU BUTTON
      ======================================== */}

      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#16231D] text-[#F1E8DF] shadow-lg lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={21} />
      </button>

      {/* ========================================
          MOBILE OVERLAY
      ======================================== */}

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-[#16231D]/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ========================================
          SIDEBAR
      ======================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-[#624e3c]/15 bg-[#16231D] text-[#F1E8DF] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ======================================
            SIDEBAR HEADER
        ====================================== */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <NavLink
            to="/"
            onClick={closeMobileSidebar}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3D45D] text-[#16231D]">
              <ShoppingBag size={17} />
            </span>

            <span className="text-xl font-black tracking-[-0.06em]">ECOM.</span>
          </NavLink>

          {/* Mobile Close Button */}

          <button
            type="button"
            onClick={closeMobileSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* ======================================
            NAVIGATION LABEL
        ====================================== */}

        <div className="px-6 pb-3 pt-8">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F3D45D]">
            Main Menu
          </p>
        </div>

        {/* ======================================
            NAVIGATION ITEMS
        ====================================== */}

        <nav className="flex-1 space-y-1 overflow-y-auto px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#F3D45D] text-[#16231D] shadow-md shadow-black/10"
                      : "text-white/60 hover:bg-white/[0.07] hover:text-[#F1E8DF]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />

                      <span>{item.name}</span>
                    </div>

                    <ChevronRight
                      size={15}
                      className={`transition-transform duration-300 ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ======================================
            SIDEBAR FOOTER
        ====================================== */}

        <div className="mt-auto border-t border-white/10 p-4">
          {/* Support */}

          <div
            className={`${visiblity} relative mb-4 rounded-xl bg-[#E96943]/15 p-4`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                // Yahan visibility ko hide karne wala function call karein
                setVisiblity("hidden");
              }}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-[#F1E8DF]/70 transition hover:bg-[#F1E8DF]/10 hover:text-[#F1E8DF]"
              aria-label="Close support box"
            >
              <X size={14} />
            </button>

            <p className="text-xs font-bold text-[#F3D45D]">Need help?</p>

            <p className="mt-1 text-[10px] leading-5 text-white/50">
              Contact our support team for assistance.
            </p>

            <button
              type="button"
              onClick={() => {
                closeMobileSidebar();
                navigate("/contact");
              }}
              className="mt-3 text-[10px] font-bold uppercase tracking-widest text-[#F1E8DF] underline underline-offset-4"
            >
              Contact Support
            </button>
          </div>
          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-white/60 transition hover:bg-[#E96943]/15 hover:text-[#E96943]"
          >
            <LogOut
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />

            <span>Logout</span>
          </button>

          <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-widest text-white/25">
            ECOM © 2026
          </p>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
