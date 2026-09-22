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
import AdminUsers from "../Pages/Admin/AdminUsers";

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
              <Route path="users">
                <Route index element={<AdminUsers />} />
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
