import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  UserRound,
  Settings,
  LogOut,
  X,
  ChevronRight,
  Store,
  Tag,
  MessageSquare,
  Headphones,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const AdminSidebar = ({
  isMobileOpen = false,
  setIsMobileOpen,
  isCollapsed: externalCollapsed,
  setIsCollapsed: externalSetCollapsed,
}) => {
  const navigate = useNavigate();

  // Local fallback state
  const [localCollapsed, setLocalCollapsed] = useState(false);

  const [isSupportVisible, setIsSupportVisible] = useState(true);

  // Parent state available ho to use karein,
  // warna local state use karein.
  const isControlled =
    typeof externalCollapsed === "boolean" &&
    typeof externalSetCollapsed === "function";

  const isCollapsed = isControlled
    ? externalCollapsed
    : localCollapsed;

  // Menu Items
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: Package,
    },
    {
      name: "Categories",
      path: "/dashboard/categories",
      icon: Tag,
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      name: "Customers",
      path: "/dashboard/customers",
      icon: Users,
    },
    {
      name: "Cart Overview",
      path: "/dashboard/cart",
      icon: ShoppingCart,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Store Settings",
      path: "/dashboard/store-settings",
      icon: Store,
    },
    {
      name: "Messages",
      path: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      name: "Admin Profile",
      path: "/dashboard/profile",
      icon: UserRound,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  // Close mobile sidebar
  const closeMobileSidebar = () => {
    if (typeof setIsMobileOpen === "function") {
      setIsMobileOpen(false);
    }
  };

  // Open mobile sidebar
  const openMobileSidebar = () => {
    if (typeof setIsMobileOpen === "function") {
      setIsMobileOpen(true);
    }
  };

  // Toggle desktop sidebar
  const toggleSidebar = () => {
    if (isControlled) {
      externalSetCollapsed((previous) => !previous);
    } else {
      setLocalCollapsed((previous) => !previous);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    sessionStorage.removeItem("Role");

    closeMobileSidebar();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close admin sidebar overlay"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-[#16231D]/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-full flex-col
          border-r border-[#624e3c]/15
          bg-[#000000] text-[#F1E8DF]
          transition-all duration-300 ease-in-out

          w-[280px]

          ${isCollapsed ? "lg:w-[88px]" : "lg:w-[280px]"}

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* =====================================
            SIDEBAR HEADER
        ===================================== */}

        <div
          className={`
            flex min-h-[82px] items-center
            border-b border-white/10
            px-4 py-5

            ${
              isCollapsed
                ? "justify-center lg:justify-center"
                : "justify-between"
            }
          `}
        >
          {/* Brand */}

          <NavLink
            to="/"
            onClick={closeMobileSidebar}
            className="flex items-center gap-1 font-logo text-2xl font-bold tracking-tight"
          >
            {/* Logo Icon */}

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3D45D] text-[#16231D]">
              <ShoppingBag size={17} />
            </span>

            {/* Brand Name */}

            <div
              className={`
                flex items-center gap-0

                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <span className="text-[#E56B42]">E</span>

              <span className="bg-[radial-gradient(circle,_rgba(34,193,195,1)_0%,_rgba(253,187,45,1)_100%)] bg-clip-text text-transparent">
                COM
              </span>
            </div>
          </NavLink>

          {/* Desktop Collapse Button */}

      

          {/* Mobile Close Button */}

          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close admin sidebar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* =====================================
            EXPAND BUTTON
            Only visible on desktop when collapsed
        ===================================== */}

        {isCollapsed && (
          <div className="hidden justify-center py-4 lg:flex">
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <PanelLeftOpen size={19} />
            </button>
          </div>
        )}

        {/* =====================================
            NAVIGATION LABEL
        ===================================== */}

        <div
          className={`
            px-6 pb-3 pt-8

            ${isCollapsed ? "lg:hidden" : ""}
          `}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F3D45D]">
            Admin Menu
          </p>
        </div>

        {/* =====================================
            NAVIGATION ITEMS
        ===================================== */}

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeMobileSidebar}
                title={isCollapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `
                  group flex items-center rounded-xl
                  py-3.5 text-sm font-semibold
                  transition-all duration-300

                  ${
                    isCollapsed
                      ? "justify-start px-4 lg:justify-center lg:px-2"
                      : "justify-between px-4"
                  }

                  ${
                    isActive
                      ? "bg-[#F3D45D] text-[#16231D] shadow-md shadow-black/10"
                      : "text-white/60 hover:bg-white/[0.07] hover:text-[#F1E8DF]"
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Icon and Label */}

                    <div
                      className={`
                        flex items-center gap-3

                        ${
                          isCollapsed
                            ? "lg:justify-center"
                            : ""
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.5 : 1.8}
                        className="shrink-0"
                      />

                      {/* 
                        Mobile:
                        Always show label

                        Desktop:
                        Hide label when collapsed
                      */}

                      <span
                        className={`
                          whitespace-nowrap

                          ${
                            isCollapsed
                              ? "lg:hidden"
                              : ""
                          }
                        `}
                      >
                        {item.name}
                      </span>
                    </div>

                    {/* Arrow */}

                    <ChevronRight
                      size={15}
                      className={`
                        shrink-0
                        transition-transform duration-300

                        ${
                          isCollapsed
                            ? "lg:hidden"
                            : ""
                        }

                        ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* =====================================
            SIDEBAR FOOTER
        ===================================== */}

        <div className="mt-auto border-t border-white/10 p-3">
          {/* Support Box */}

          {isSupportVisible && (
            <div
              className={`
                relative mb-4 rounded-xl
                bg-[#E96943]/15 p-4

                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              {/* Close Support Button */}

              <button
                type="button"
                onClick={() => setIsSupportVisible(false)}
                aria-label="Close support box"
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-[#F1E8DF]/70 transition hover:bg-[#F1E8DF]/10 hover:text-[#F1E8DF]"
              >
                <X size={14} />
              </button>

              <div className="pr-5">
                <p className="text-xs font-bold text-[#F3D45D]">
                  Need help?
                </p>

                <p className="mt-1 text-[10px] leading-5 text-white/50">
                  Contact our support team for assistance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeMobileSidebar();
                  navigate("/contact");
                }}
                className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#F1E8DF] underline underline-offset-4"
              >
                <Headphones size={13} />
                Contact Support
              </button>
            </div>
          )}

      

          {/* Logout Button */}

          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : undefined}
            className={`
              group flex w-full items-center
              rounded-xl py-3.5
              text-sm font-semibold
              text-white/60 transition
              hover:bg-[#E96943]/15 hover:text-[#E96943]

              ${
                isCollapsed
                  ? "justify-start px-4 lg:justify-center lg:px-2"
                  : "gap-3 px-4"
              }
            `}
          >
            <LogOut
              size={18}
              className="shrink-0 transition-transform group-hover:translate-x-1"
            />

            <span
              className={`
                whitespace-nowrap

                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              Logout
            </span>
          </button>

          {/* Copyright */}

          <p
            className={`
              mt-4 text-center
              text-[9px] font-bold uppercase
              tracking-widest text-white/25

              ${isCollapsed ? "lg:hidden" : ""}
            `}
          >
            ECOM © 2026
          </p>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;