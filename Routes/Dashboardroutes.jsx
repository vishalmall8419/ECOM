import { Navigate, Route, Routes } from "react-router-dom";

// User Pages
import UserDashboard from "../Pages/User/UserDashboard";
import UserOrders from "../Pages/User/UserOrders";

// Admin Pages
import AdminDashboard from "../Pages/Admin/AdminDashboard";

// User Components
import UserNavbar from "../Pages/User/Component/Navbar";
import UserSidebar from "../Pages/User/Component/Sidebar";

// Admin Components
import AdminSidebar from "../Pages/Admin/Component/Sidebar";
import AdminNavbar from "../Pages/Admin/Component/Navbar";
import UserProfile from "../Pages/User/UserProfile";
import AdminOrders from "../Pages/Admin/AdminOrders";
import AdminProducts from "../Pages/Admin/AdminProducts";
import Wishlist from "../Pages/User/Wishlist";
import UserCart from "../Pages/User/UserCart";
import UserSettings from "../Pages/User/UserSettings";
import Notification from "../Pages/User/Notification";
import AdminCostumers from "../Pages/Admin/AdminCostumers";
import Categories from "../Pages/Admin/Categories";
import AdminCartOverview from "../Pages/Admin/AdminCartOverview";
import AdminAnalytics from "../Pages/Admin/AdminAnalytics";
import AdminProfile from "../Pages/Admin/AdminProfile";
import Settings from "../Pages/Admin/Settings";
import AdminStoreSettings from "../Pages/Admin/AdminStoreSettings";
import Messages from "../Pages/Admin/Messages";

const Dashboardroutes = () => {
  const role = sessionStorage.getItem("Role");

  // Check user role
  if (!role || role.trim() === "") {
    return <Navigate to="/login" replace />;
  }

  // =====================================
  // USER DASHBOARD
  // =====================================

  if (role === "user") {
    return (
      <div className="min-h-screen bg-[#F1E8DF]">
        {/* User Sidebar */}
        <UserSidebar />

        {/* Main Content Area */}
        <main className="min-h-screen lg:ml-[280px]">
          {/* User Navbar */}
          <UserNavbar />

          {/* User Routes */}
          <div>
            <Routes>
              {/* /dashboard */}
              <Route path="/" element={<UserDashboard />} />

              {/* /dashboard/orders */}
              <Route path="orders">
                {/* /dashboard/orders */}
                <Route index element={<UserOrders />} />
              </Route>
              <Route path="profile">
                {/* /dashboard/orders */}
                <Route index element={<UserProfile />} />
              </Route>
              <Route path="wishlist">
                {/* /dashboard/orders */}
                <Route index element={<Wishlist/>} />
              </Route>
              <Route path="cart">
                {/* /dashboard/orders */}
                <Route index element={<UserCart/>} />
              </Route>
              <Route path="settings">
                {/* /dashboard/orders */}
                <Route index element={<UserSettings/>} />
              </Route>
              <Route path="notifications">
                {/* /dashboard/orders */}
                <Route index element={<Notification/>} />
              </Route>
              {/* <Route path="orders" element={<UserOrders />} /> */}
            </Routes>
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
      <div className="min-h-screen bg-[#F1E8DF]">
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <main className="min-h-screen lg:ml-[280px]">
          {/* Admin Navbar */}
          <AdminNavbar />

          {/* Admin Routes */}
          <div>
            <Routes>
              {/* /dashboard */}
              <Route path="/" element={<AdminDashboard />} />
              <Route path="orders">
                <Route index element={<AdminOrders />} />
              </Route>
              <Route path="products">
                <Route index element={<AdminProducts />} />
              </Route>
              <Route path="customers">
                <Route index element={<AdminCostumers/>} />
              </Route>
              <Route path="categories">
                <Route index element={<Categories/>} />
              </Route>
              <Route path="cart">
                <Route index element={<AdminCartOverview/>} />
              </Route>
              <Route path="analytics">
                <Route index element={<AdminAnalytics/>} />
              </Route>
              <Route path="store-settings">
                <Route index element={<AdminStoreSettings/>} />
              </Route>
              <Route path="messages">
                <Route index element={<Messages/>} />
              </Route>
              <Route path="profile">
                <Route index element={<AdminProfile/>} />
              </Route>
              <Route path="settings">
                <Route index element={<Settings/>} />
              </Route>
            </Routes>
          </div>
        </main>
      </div>
    );
  }

  // Invalid role
  return <Navigate to="/login" replace />;
};

export default Dashboardroutes;
