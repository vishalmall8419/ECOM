
import {
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ChevronRight,
  UserRound,
  MapPin,
  CreditCard,
  Truck,
} from "lucide-react";

import { Link } from "react-router-dom";

const UserDashboard = () => {
  // Dashboard Statistics
  const stats = [
    {
      title: "Total Orders",
      value: "24",
      description: "All your orders",
      icon: ShoppingBag,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending Orders",
      value: "05",
      description: "Orders in progress",
      icon: Clock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Completed Orders",
      value: "16",
      description: "Successfully delivered",
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Cancelled Orders",
      value: "03",
      description: "Cancelled orders",
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  // Recent Orders
  const recentOrders = [
    {
      id: "#ORD-1024",
      date: "Sep 22, 2026",
      product: "Premium Cotton Shirt",
      category: "Garments",
      amount: "₹1,299",
      status: "Delivered",
      statusStyle: "bg-green-100 text-green-700",
      image:
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=200&auto=format&fit=crop",
    },
    {
      id: "#ORD-1023",
      date: "Sep 20, 2026",
      product: "Face Care Essentials",
      category: "Cosmetics",
      amount: "₹899",
      status: "Processing",
      statusStyle: "bg-blue-100 text-blue-700",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop",
    },
    {
      id: "#ORD-1022",
      date: "Sep 18, 2026",
      product: "Casual T-Shirt",
      category: "Garments",
      amount: "₹699",
      status: "Shipped",
      statusStyle: "bg-purple-100 text-purple-700",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1E8DF] p-4 sm:p-6 lg:p-8">

      {/* =====================================
          WELCOME HEADER
      ===================================== */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">
            User Dashboard
          </p>

          <h1 className="text-2xl font-bold text-[#2D2926] sm:text-3xl">
            Welcome back, Vishal! 👋
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track your orders and manage your account.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2D2926] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4A403A]"
        >
          Continue Shopping
          <ArrowUpRight size={17} />
        </Link>

      </div>

      {/* =====================================
          STATISTICS CARDS
      ===================================== */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#E7DCD2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-[#2D2926]">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon
                    size={22}
                    className={stat.iconColor}
                  />
                </div>

              </div>

              <p className="mt-4 text-xs text-gray-500">
                {stat.description}
              </p>

            </div>
          );
        })}

      </div>

      {/* =====================================
          MAIN CONTENT GRID
      ===================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* =====================================
            RECENT ORDERS
        ===================================== */}

        <div className="rounded-2xl border border-[#E7DCD2] bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">

          <div className="mb-6 flex items-center justify-between gap-3">

            <div>
              <h2 className="text-lg font-bold text-[#2D2926]">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest purchases
              </p>
            </div>

            <Link
              to="/dashboard/orders"
              className="flex items-center gap-1 text-sm font-semibold text-[#8B5E3C] hover:underline"
            >
              View All
              <ChevronRight size={16} />
            </Link>

          </div>

          {/* Orders List */}

          <div className="space-y-4">

            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-[#D9C4B4] sm:flex-row sm:items-center sm:justify-between"
              >

                {/* Product Information */}

                <div className="flex min-w-0 items-center gap-3">

                  <img
                    src={order.image}
                    alt={order.product}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0">

                    <h3 className="truncate text-sm font-semibold text-[#2D2926]">
                      {order.product}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {order.id} • {order.date}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {order.category}
                    </p>

                  </div>

                </div>

                {/* Price and Status */}

                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">

                  <p className="text-sm font-bold text-[#2D2926]">
                    {order.amount}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${order.statusStyle}`}
                  >
                    {order.status}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <div className="rounded-2xl border border-[#E7DCD2] bg-white p-5 shadow-sm sm:p-6">

          <h2 className="text-lg font-bold text-[#2D2926]">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your account easily
          </p>

          <div className="mt-6 space-y-3">

            <Link
              to="/dashboard/orders"
              className="flex items-center gap-3 rounded-xl bg-[#F8F3EF] p-4 transition hover:bg-[#EFE4D9]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <Package size={19} className="text-[#8B5E3C]" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#2D2926]">
                  My Orders
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Track your purchases
                </p>
              </div>

              <ChevronRight size={17} className="text-gray-400" />
            </Link>

            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3 rounded-xl bg-[#F8F3EF] p-4 transition hover:bg-[#EFE4D9]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <UserRound size={19} className="text-[#8B5E3C]" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#2D2926]">
                  My Profile
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Update personal details
                </p>
              </div>

              <ChevronRight size={17} className="text-gray-400" />
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-3 rounded-xl bg-[#F8F3EF] p-4 transition hover:bg-[#EFE4D9]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <ShoppingBag size={19} className="text-[#8B5E3C]" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#2D2926]">
                  Shopping Cart
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  View items in your cart
                </p>
              </div>

              <ChevronRight size={17} className="text-gray-400" />
            </Link>

          </div>

        </div>

      </div>

      {/* =====================================
          ACCOUNT OVERVIEW
      ===================================== */}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Delivery Information */}

        <div className="rounded-2xl border border-[#E7DCD2] bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <MapPin size={20} className="text-blue-600" />
            </div>

            <div>
              <h2 className="font-bold text-[#2D2926]">
                Default Address
              </h2>

              <p className="text-xs text-gray-500">
                Your delivery information
              </p>
            </div>

          </div>

          <div className="rounded-xl bg-[#F8F3EF] p-4">

            <p className="text-sm font-semibold text-[#2D2926]">
              Vishal Mall
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your saved delivery address will appear here.
            </p>

            <Link
              to="/dashboard/profile"
              className="mt-3 inline-block text-sm font-semibold text-[#8B5E3C] hover:underline"
            >
              Manage Address
            </Link>

          </div>

        </div>

        {/* Payment Information */}

        <div className="rounded-2xl border border-[#E7DCD2] bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
              <CreditCard size={20} className="text-purple-600" />
            </div>

            <div>
              <h2 className="font-bold text-[#2D2926]">
                Payment & Delivery
              </h2>

              <p className="text-xs text-gray-500">
                Order information
              </p>
            </div>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CreditCard size={16} />
                Payment Method
              </div>

              <span className="text-sm font-semibold text-[#2D2926]">
                COD
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Truck size={16} />
                Delivery Status
              </div>

              <span className="text-sm font-semibold text-green-600">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Account Status
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Verified
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;