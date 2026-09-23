import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Users,
  Package,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreVertical,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Plus,
  Download,
  CalendarDays,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const dashboardStats = [
  {
    id: 1,
    title: "Total Revenue",
    value: "₹2,48,560",
    change: "+12.5%",
    description: "Compared to last month",
    icon: IndianRupee,
    color: "bg-indigo-100 text-indigo-600",
    positive: true,
  },
  {
    id: 2,
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    description: "Compared to last month",
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-600",
    positive: true,
  },
  {
    id: 3,
    title: "Total Customers",
    value: "3,642",
    change: "+5.4%",
    description: "Compared to last month",
    icon: Users,
    color: "bg-green-100 text-green-600",
    positive: true,
  },
  {
    id: 4,
    title: "Total Products",
    value: "856",
    change: "-2.1%",
    description: "Compared to last month",
    icon: Package,
    color: "bg-orange-100 text-orange-600",
    positive: false,
  },
];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    product: "Premium Cotton T-Shirt",
    amount: "₹1,299",
    status: "Delivered",
    date: "23 Sep 2026",
  },
  {
    id: "#ORD-1002",
    customer: "Amit Verma",
    email: "amit@example.com",
    product: "Running Sneakers",
    amount: "₹2,499",
    status: "Processing",
    date: "23 Sep 2026",
  },
  {
    id: "#ORD-1003",
    customer: "Priya Singh",
    email: "priya@example.com",
    product: "Wireless Headphones",
    amount: "₹1,899",
    status: "Shipped",
    date: "22 Sep 2026",
  },
  {
    id: "#ORD-1004",
    customer: "Neha Gupta",
    email: "neha@example.com",
    product: "Casual Handbag",
    amount: "₹999",
    status: "Pending",
    date: "22 Sep 2026",
  },
  {
    id: "#ORD-1005",
    customer: "Vikas Yadav",
    email: "vikas@example.com",
    product: "Smart Watch",
    amount: "₹3,299",
    status: "Cancelled",
    date: "21 Sep 2026",
  },
];

const salesData = [
  { month: "Apr", value: 45 },
  { month: "May", value: 60 },
  { month: "Jun", value: 42 },
  { month: "Jul", value: 75 },
  { month: "Aug", value: 62 },
  { month: "Sep", value: 90 },
];

const topProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    sold: 248,
    revenue: "₹1,24,000",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    name: "Running Sneakers",
    category: "Footwear",
    sold: 186,
    revenue: "₹98,500",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    sold: 154,
    revenue: "₹76,200",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    sold: 112,
    revenue: "₹62,400",
    color: "bg-green-100 text-green-600",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    case "Shipped":
      return "bg-purple-100 text-purple-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle size={14} />;

    case "Processing":
      return <Clock size={14} />;

    case "Shipped":
      return <Truck size={14} />;

    case "Pending":
      return <Clock size={14} />;

    case "Cancelled":
      return <XCircle size={14} />;

    default:
      return null;
  }
};

const AdminDashboard = () => {
  const [period, setPeriod] = useState("This Month");
  const [orderFilter, setOrderFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    if (orderFilter === "All") {
      return recentOrders;
    }

    return recentOrders.filter((order) => order.status === orderFilter);
  }, [orderFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Area */}
      <div className="">
        {/* Dashboard Content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            {/* Page Heading */}
            <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Overview
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Monitor your store performance and activities.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className="rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500"
                  >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert("Export functionality can be connected to an API.")
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600"
                >
                  <Download size={17} />
                  Export
                </button>

                <Link
                  to="/dashboard/products"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Plus size={17} />
                  Add Product
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {stat.title}
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-gray-900">
                          {stat.value}
                        </h3>
                      </div>

                      <div className={`rounded-xl p-3 ${stat.color}`}>
                        <Icon size={21} />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-bold ${
                          stat.positive
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {stat.positive ? (
                          <TrendingUp size={13} />
                        ) : (
                          <TrendingDown size={13} />
                        )}

                        {stat.change}
                      </span>

                      <span className="text-gray-400">{stat.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sales Chart and Order Summary */}
            <div className="mb-7 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              {/* Sales Overview */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Sales Overview
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Revenue performance for {period.toLowerCase()}.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
                  >
                    <MoreVertical size={19} />
                  </button>
                </div>

                {/* Simple CSS Bar Chart */}
                <div className="flex h-64 items-end justify-between gap-2 border-b border-l border-gray-100 px-3 pb-0 pt-4 sm:gap-5">
                  {salesData.map((item) => (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div className="flex h-full w-full items-end justify-center">
                        <div
                          className="w-full max-w-12 rounded-t-lg bg-indigo-500 transition hover:bg-indigo-600"
                          style={{
                            height: `${item.value}%`,
                          }}
                          title={`${item.month}: ${item.value}%`}
                        />
                      </div>

                      <span className="mb-2 text-xs font-medium text-gray-400">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Average Growth</p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      +18.4%
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <TrendingUp size={15} />
                    Growing
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Order Summary
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Current order distribution.
                    </p>
                  </div>

                  <ShoppingCart size={21} className="text-indigo-600" />
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Delivered</span>

                      <span className="font-bold text-gray-900">68%</span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[68%] rounded-full bg-green-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Processing</span>

                      <span className="font-bold text-gray-900">18%</span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[18%] rounded-full bg-blue-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pending</span>

                      <span className="font-bold text-gray-900">9%</span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[9%] rounded-full bg-yellow-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Cancelled</span>

                      <span className="font-bold text-gray-900">5%</span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[5%] rounded-full bg-red-500" />
                    </div>
                  </div>
                </div>

                <Link
                  to="/dashboard/orders"
                  className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-gray-50 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  View All Orders
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mb-7 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Orders
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Review the latest customer orders.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={orderFilter}
                    onChange={(event) => setOrderFilter(event.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:border-indigo-500"
                  >
                    <option>All</option>
                    <option>Delivered</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </select>

                  <Link
                    to="/dashboard/orders"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View All
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Order ID</th>

                      <th className="px-6 py-4 font-semibold">Customer</th>

                      <th className="px-6 py-4 font-semibold">Product</th>

                      <th className="px-6 py-4 font-semibold">Amount</th>

                      <th className="px-6 py-4 font-semibold">Status</th>

                      <th className="px-6 py-4 font-semibold">Date</th>

                      <th className="px-6 py-4 text-right font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-indigo-600">
                          {order.id}
                        </td>

                        <td className="px-6 py-4">
                          <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                            {order.customer}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {order.email}
                          </p>
                        </td>

                        <td className="max-w-48 px-6 py-4 text-sm text-gray-600">
                          {order.product}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                          {order.amount}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              order.status,
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {order.date}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/dashboard/orders/${order.id.replace(
                              "#",
                              "",
                            )}`}
                            className="inline-flex rounded-lg p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                            title="View Order"
                          >
                            <Eye size={18} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="px-6 py-12 text-center text-sm text-gray-500">
                  No orders found for this filter.
                </div>
              )}
            </div>

            {/* Top Products and Quick Actions */}
            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              {/* Top Products */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Top Products
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Best performing products.
                    </p>
                  </div>

                  <Link
                    to="/dashboard/products"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${product.color}`}
                      >
                        <Package size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {product.category} • {product.sold} sold
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="whitespace-nowrap text-sm font-bold text-gray-900">
                          {product.revenue}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          #{index + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Quick Actions
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your store quickly.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <Link
                    to="/dashboard/products/create"
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
                  >
                    <div className="rounded-lg bg-indigo-100 p-2.5 text-indigo-600">
                      <Plus size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Add New Product
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Create a new product listing.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/orders"
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600">
                      <ShoppingCart size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Manage Orders
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Track and update customer orders.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/customers"
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-green-200 hover:bg-green-50"
                  >
                    <div className="rounded-lg bg-green-100 p-2.5 text-green-600">
                      <Users size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        View Customers
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Manage customer information.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/analytics"
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-purple-200 hover:bg-purple-50"
                  >
                    <div className="rounded-lg bg-purple-100 p-2.5 text-purple-600">
                      <BarChart3 size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        View Analytics
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Analyze your store performance.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pb-4 text-center text-xs text-gray-400">
              © 2026 VM Store Admin Panel. All rights reserved.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
