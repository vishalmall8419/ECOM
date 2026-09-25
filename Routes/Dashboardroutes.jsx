import { useState, lazy, Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

// =====================================
// USER PAGES
// =====================================

const UserDashboard = lazy(() => import("../Pages/User/UserDashboard"));
const UserOrders = lazy(() => import("../Pages/User/UserOrders"));
const UserProfile = lazy(() => import("../Pages/User/UserProfile"));
const Wishlist = lazy(() => import("../Pages/User/Wishlist"));
const UserCart = lazy(() => import("../Pages/User/UserCart"));
const UserSettings = lazy(() => import("../Pages/User/UserSettings"));
const Notification = lazy(() => import("../Pages/User/Notification"));

// =====================================
// ADMIN PAGES
// =====================================

const AdminOrders = lazy(() => import("../Pages/Admin2/AdminOrders"));
const AdminProducts = lazy(() => import("../Pages/Admin2/AdminProducts"));
const AdminCostumers = lazy(() => import("../Pages/Admin2/AdminCostumes"));
const Categories = lazy(() => import("../Pages/Admin2/AdminCategories"));
const AdminCartOverview = lazy(() => import("../Pages/Admin2/AdminCart"));
const AdminAnalytics = lazy(() => import("../Pages/Admin2/AdminAnalytics"));
const AdminProfile = lazy(() => import("../Pages/Admin2/AdminProfile"));
const Settings = lazy(() => import("../Pages/Admin/Settings"));
const AdminStoreSettings = lazy(() => import("../Pages/Admin2/AdminStoreSettings"));
const Messages = lazy(() => import("../Pages/Admin2/AdminMessage"));

// =====================================
// USER COMPONENTS
// =====================================

import UserNavbar from "../Pages/User/Component/Navbar";
import UserSidebar from "../Pages/User/Component/Sidebar";

// =====================================
// ADMIN COMPONENTS
// =====================================

const DashBoard = lazy(() => import("../Pages/Admin2/DashBoard"));
import AnimatedBackground from "../Pages/Admin2/Component/AnimatedBackground";
import Sidebar from "../Pages/Admin2/Component/Sidebar";
import Navbar from "../Pages/Admin2/Component/Navbar";

const Dashboardroutes = () => {
  // =====================================
  // AUTHENTICATION
  // =====================================

  const role = sessionStorage.getItem("Role");

  // =====================================
  // SIDEBAR STATE
  // =====================================

  /*
    Desktop (1024px+) par sidebar initially open rahega.
    Mobile aur tablet par sidebar initially closed rahega.
  */

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth >= 1024;
  });

  // =====================================
  // SIDEBAR TOGGLE
  // =====================================

  const handleToggleSidebar = () => {
    setIsSidebarOpen((previousState) => !previousState);
  };

  // =====================================
  // CLOSE SIDEBAR
  // =====================================

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // =====================================
  // ROLE CHECK
  // =====================================

  if (!role || role.trim() === "") {
    return <Navigate to="/login" replace />;
  }
 

  // =====================================
  // USER DASHBOARD
  // =====================================

  if (role === "user") {
    return (
      <div className="min-h-screen bg-[#F1E8DF]">
        {/* =====================================
            USER SIDEBAR
        ===================================== */}

        <UserSidebar />

        {/* =====================================
            USER MAIN CONTENT
        ===================================== */}

        <main className="min-h-screen lg:ml-[280px]">
          {/* User Navbar */}

          <UserNavbar />

          {/* =====================================
              USER ROUTES
          ===================================== */}

          <div>
            <Suspense fallback={<div className="flex h-[80vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-(--primary) border-t-transparent"></div></div>}>
              <Routes>
              {/* /dashboard */}

              <Route
                path="/"
                element={<UserDashboard />}
              />

              {/* /dashboard/orders */}

              <Route path="orders">
                <Route
                  index
                  element={<UserOrders />}
                />
              </Route>

              {/* /dashboard/profile */}

              <Route path="profile">
                <Route
                  index
                  element={<UserProfile />}
                />
              </Route>

              {/* /dashboard/wishlist */}

              <Route path="wishlist">
                <Route
                  index
                  element={<Wishlist />}
                />
              </Route>

              {/* /dashboard/cart */}

              <Route path="cart">
                <Route
                  index
                  element={<UserCart />}
                />
              </Route>

              {/* /dashboard/settings */}

              <Route path="settings">
                <Route
                  index
                  element={<UserSettings />}
                />
              </Route>

              {/* /dashboard/notifications */}

              <Route path="notifications">
                <Route
                  index
                  element={<Notification />}
                />
              </Route>
            </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    );
  }

  // =====================================
  // ADMIN DASHBOARD
  // =====================================

  if (role === "admin") {
    return (
      <div
        className="dashboard-page min-h-screen relative"
      >
        <AnimatedBackground />

        {/* =====================================
            MOBILE AND TABLET OVERLAY
        ===================================== */}

        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={handleCloseSidebar}
            className="
              fixed
              inset-0
              z-40
              cursor-default
              bg-black/40
              backdrop-blur-[2px]
              lg:hidden
            "
          />
        )}

        {/* =====================================
            ADMIN SIDEBAR
        ===================================== */}

        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        />

        {/* =====================================
            ADMIN MAIN CONTENT
        ===================================== */}

        <main
          className={`
            min-h-screen
            min-w-0
            transition-[margin]
            duration-300
            ease-in-out

            ${
              isSidebarOpen
                ? "lg:ml-60"
                : "lg:ml-0"
            }
          `}
        >
          {/* =====================================
              ADMIN NAVBAR
          ===================================== */}

          <Navbar
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={handleToggleSidebar}
          />

          {/* =====================================
              ADMIN ROUTES
          ===================================== */}

          <div className="min-w-0">
            <Suspense fallback={<div className="flex h-[80vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-(--primary) border-t-transparent"></div></div>}>
              <Routes>
              {/* /dashboard */}

              <Route
                path="/"
                element={<DashBoard />}
              />

              {/* /dashboard/orders */}

              <Route path="orders">
                <Route
                  index
                  element={<AdminOrders />}
                />
              </Route>

              {/* /dashboard/products */}

              <Route path="products">
                <Route
                  index
                  element={<AdminProducts />}
                />
              </Route>

              {/* /dashboard/customers */}

              <Route path="customers">
                <Route
                  index
                  element={<AdminCostumers />}
                />
              </Route>

              {/* /dashboard/categories */}

              <Route path="categories">
                <Route
                  index
                  element={<Categories />}
                />
              </Route>

              {/* /dashboard/cart */}

              <Route path="cart">
                <Route
                  index
                  element={<AdminCartOverview />}
                />
              </Route>

              {/* /dashboard/analytics */}

              <Route path="analytics">
                <Route
                  index
                  element={<AdminAnalytics />}
                />
              </Route>

              {/* /dashboard/store-settings */}

              <Route path="store-settings">
                <Route
                  index
                  element={<AdminStoreSettings />}
                />
              </Route>

              {/* /dashboard/messages */}

              <Route path="messages">
                <Route
                  index
                  element={<Messages />}
                />
              </Route>

              {/* /dashboard/profile */}

              <Route path="profile">
                <Route
                  index
                  element={<AdminProfile />}
                />
              </Route>

              {/* /dashboard/settings */}

              <Route path="settings">
                <Route
                  index
                  element={<Settings />}
                />
              </Route>
            </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    );
  }

  // =====================================
  // INVALID ROLE
  // =====================================

  return <Navigate to="/login" replace />;
};

export default Dashboardroutes;




