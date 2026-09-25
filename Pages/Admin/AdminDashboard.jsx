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
    color: "bg-[#2D2D2D] text-[#F4C542]",
    positive: true,
  },
  {
    id: 2,
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    description: "Compared to last month",
    icon: ShoppingCart,
    color: "bg-[#2D4058] text-[#7DA7E8]",
    positive: true,
  },
  {
    id: 3,
    title: "Total Customers",
    value: "3,642",
    change: "+5.4%",
    description: "Compared to last month",
    icon: Users,
    color: "bg-[#233F32] text-[#65C18C]",
    positive: true,
  },
  {
    id: 4,
    title: "Total Products",
    value: "856",
    change: "-2.1%",
    description: "Compared to last month",
    icon: Package,
    color: "bg-[#4A3325] text-[#E58B45]",
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
    color: "bg-[#2D4058] text-[#7DA7E8]",
  },
  {
    id: 2,
    name: "Running Sneakers",
    category: "Footwear",
    sold: 186,
    revenue: "₹98,500",
    color: "bg-[#3D304F] text-[#B59AE8]",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    sold: 154,
    revenue: "₹76,200",
    color: "bg-[#4A3325] text-[#E58B45]",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    sold: 112,
    revenue: "₹62,400",
    color: "bg-[#233F32] text-[#65C18C]",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-[#233F32] text-[#65C18C]";

    case "Processing":
      return "bg-[#2D4058] text-[#7DA7E8]";

    case "Shipped":
      return "bg-[#3D304F] text-[#B59AE8]";

    case "Pending":
      return "bg-[#4A4023] text-[#F4C542]";

    case "Cancelled":
      return "bg-[#4A2929] text-[#E57373]";

    default:
      return "bg-[#2D2D2D] text-[#B5B5B5]";
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
    <div className="min-h-screen bg-[#1C1C1C]">
      {/* Main Area */}
      <div className="">
        {/* Dashboard Content */}
        <main className="px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
          <div className="mx-auto max-w-[1600px]">
            {/* Page Heading */}
            <div className="mb-4 flex flex-col gap-3 rounded-xl border border-[#3A3A3A] bg-[#202020] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
                  Overview
                </h1>

                <p className="mt-1 text-xs text-[#B5B5B5]/70">
                  Monitor your store performance and activities.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#B5B5B5]/50"
                  />

                  <select
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className="rounded-lg border border-[#3A3A3A] bg-[#252525] py-2 pl-9 pr-7 text-xs font-medium text-[#B5B5B5] outline-none focus:border-[#F3D45D]"
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#3A3A3A] bg-[#252525] px-3 py-2 text-xs font-semibold text-[#B5B5B5] transition hover:border-[#4A4A4A] hover:text-[#F4C542]"
                >
                  <Download size={17} />
                  Export
                </button>

                <Link
                  to="/dashboard/products/"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4C542] px-3 py-2 text-xs font-semibold text-[#1C1C1C] transition hover:bg-[#DFAF28]"
                >
                  <Plus size={17} />
                  Add Product
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.id}
                    className="rounded-lg border border-[#3A3A3A] bg-[#252525] p-2.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-medium text-[#B5B5B5]/70">
                          {stat.title}
                        </p>

                        <h3 className="mt-0.5 text-lg font-bold leading-tight text-[#F5F5F5]">
                          {stat.value}
                        </h3>
                      </div>

                      <div className={`shrink-0 rounded-lg p-2 ${stat.color}`}>
                        <Icon size={16} />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[9px]">
                      <span
                        className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-bold ${
                          stat.positive
                            ? "bg-[#233F32] text-[#65C18C]"
                            : "bg-[#4A2929] text-[#E57373]"
                        }`}
                      >
                        {stat.positive ? (
                          <TrendingUp size={10} />
                        ) : (
                          <TrendingDown size={10} />
                        )}

                        {stat.change}
                      </span>

                      <span className="truncate text-[#B5B5B5]/50">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sales Chart and Order Summary */}
            <div className="mb-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
              {/* Sales Overview */}
              <div className="rounded-xl border border-[#3A3A3A] bg-gradient-to-br from-[#292929] to-[#222222] p-4 shadow-sm transition duration-200 hover:border-[#505050] hover:shadow-md sm:p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold tracking-tight text-[#F5F5F5]">
                      Sales Overview
                    </h2>

                    <p className="mt-1 text-xs text-[#B5B5B5]/70">
                      Revenue performance for {period.toLowerCase()}.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-[#B5B5B5]/50 transition hover:bg-[#2D2D2D]/60 hover:text-[#B5B5B5]"
                  >
                    <MoreVertical size={19} />
                  </button>
                </div>

                {/* Simple CSS Bar Chart */}
                <div className="flex h-48 items-end justify-between gap-2 border-b border-l border-[#3A3A3A] px-2 pb-0 pt-3 sm:h-56 sm:gap-4">
                  {salesData.map((item) => (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div className="flex h-full w-full items-end justify-center">
                        <div
                          className="w-full max-w-12 rounded-t-lg bg-[#F4C542] transition hover:bg-[#F4C542]"
                          style={{
                            height: `${item.value}%`,
                          }}
                          title={`${item.month}: ${item.value}%`}
                        />
                      </div>

                      <span className="mb-2 text-xs font-medium text-[#B5B5B5]/50">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#B5B5B5]/70">Average Growth</p>

                    <p className="mt-1 text-lg font-bold text-[#F5F5F5]">
                      +18.4%
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#65C18C]">
                    <TrendingUp size={15} />
                    Growing
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-xl border border-[#3A3A3A] bg-gradient-to-br from-[#292929] to-[#222222] p-4 shadow-sm transition duration-200 hover:border-[#505050] hover:shadow-md sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold tracking-tight text-[#F5F5F5]">
                      Order Summary
                    </h2>

                    <p className="mt-1 text-xs text-[#B5B5B5]/70">
                      Current order distribution.
                    </p>
                  </div>

                  <ShoppingCart size={21} className="text-[#F4C542]" />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[#B5B5B5]">Delivered</span>

                      <span className="font-bold text-[#F5F5F5]">68%</span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-[#2D2D2D]">
                      <div className="h-full w-[68%] rounded-full bg-[#65C18C]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[#B5B5B5]">Processing</span>

                      <span className="font-bold text-[#F5F5F5]">18%</span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-[#2D2D2D]">
                      <div className="h-full w-[18%] rounded-full bg-[#7DA7E8]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[#B5B5B5]">Pending</span>

                      <span className="font-bold text-[#F5F5F5]">9%</span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-[#2D2D2D]">
                      <div className="h-full w-[9%] rounded-full bg-[#F4C542]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[#B5B5B5]">Cancelled</span>

                      <span className="font-bold text-[#F5F5F5]">5%</span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-[#2D2D2D]">
                      <div className="h-full w-[5%] rounded-full bg-[#E57373]" />
                    </div>
                  </div>
                </div>

                <Link
                  to="/dashboard/orders"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#2D2D2D]/60 py-2.5 text-xs font-semibold text-[#F4C542] transition hover:bg-[#2D2D2D]/50"
                >
                  View All Orders
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mb-4 overflow-hidden rounded-xl border border-[#3A3A3A] bg-gradient-to-br from-[#292929] to-[#222222] shadow-sm transition duration-200 hover:border-[#505050] hover:shadow-md">
              <div className="flex flex-col gap-3 border-b border-[#3A3A3A] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-[#F5F5F5]">
                    Recent Orders
                  </h2>

                  <p className="mt-1 text-xs text-[#B5B5B5]/70">
                    Review the latest customer orders.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={orderFilter}
                    onChange={(event) => setOrderFilter(event.target.value)}
                    className="rounded-lg border border-[#3A3A3A] bg-[#252525] px-2.5 py-1.5 text-xs text-[#B5B5B5] outline-none focus:border-[#F3D45D]"
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
                    className="text-sm font-semibold text-[#F4C542] hover:text-[#DFAF28]"
                  >
                    View All
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="bg-[#2D2D2D]/60 text-xs uppercase tracking-wide text-[#B5B5B5]/70">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Order ID</th>

                      <th className="px-4 py-3 font-semibold">Customer</th>

                      <th className="px-4 py-3 font-semibold">Product</th>

                      <th className="px-4 py-3 font-semibold">Amount</th>

                      <th className="px-4 py-3 font-semibold">Status</th>

                      <th className="px-4 py-3 font-semibold">Date</th>

                      <th className="px-6 py-4 text-right font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#3A3A3A]">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-[#2D2D2D]/60"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-[#F4C542]">
                          {order.id}
                        </td>

                        <td className="px-4 py-3">
                          <p className="whitespace-nowrap text-sm font-semibold text-[#F5F5F5]">
                            {order.customer}
                          </p>

                          <p className="mt-1 text-xs text-[#B5B5B5]/50">
                            {order.email}
                          </p>
                        </td>

                        <td className="max-w-48 px-6 py-4 text-sm text-[#B5B5B5]">
                          {order.product}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-xs font-bold text-[#F5F5F5]">
                          {order.amount}
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              order.status,
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-xs text-[#B5B5B5]/70">
                          {order.date}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <Link
                            to={`/dashboard/orders/${order.id.replace(
                              "#",
                              "",
                            )}`}
                            className="inline-flex rounded-lg p-2 text-[#B5B5B5]/50 transition hover:bg-[#2D2D2D]/50 hover:text-[#F4C542]"
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
                <div className="px-6 py-12 text-center text-sm text-[#B5B5B5]/70">
                  No orders found for this filter.
                </div>
              )}
            </div>

            {/* Top Products and Quick Actions */}
            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              {/* Top Products */}
              <div className="rounded-xl border border-[#3A3A3A] bg-gradient-to-br from-[#292929] to-[#222222] p-4 shadow-sm transition duration-200 hover:border-[#505050] hover:shadow-md sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold tracking-tight text-[#F5F5F5]">
                      Top Products
                    </h2>

                    <p className="mt-1 text-xs text-[#B5B5B5]/70">
                      Best performing products.
                    </p>
                  </div>

                  <Link
                    to="/dashboard/products"
                    className="text-sm font-semibold text-[#F4C542] hover:text-[#DFAF28]"
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-2">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-2.5 rounded-lg border border-[#3A3A3A] bg-[#202020]/40 p-2.5 transition hover:bg-[#2D2D2D]/60"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${product.color}`}
                      >
                        <Package size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-[#F5F5F5]">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#B5B5B5]/70">
                          {product.category} • {product.sold} sold
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="whitespace-nowrap text-sm font-bold text-[#F5F5F5]">
                          {product.revenue}
                        </p>

                        <p className="mt-1 text-xs text-[#B5B5B5]/50">
                          #{index + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl border border-[#3A3A3A] bg-gradient-to-br from-[#292929] to-[#222222] p-4 shadow-sm transition duration-200 hover:border-[#505050] hover:shadow-md sm:p-5">
                <div className="mb-6">
                  <h2 className="text-base font-bold tracking-tight text-[#F5F5F5]">
                    Quick Actions
                  </h2>

                  <p className="mt-1 text-xs text-[#B5B5B5]/70">
                    Manage your store quickly.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                  <Link
                    to="/dashboard/products/create"
                    className="flex items-center gap-2.5 rounded-lg border border-[#3A3A3A] p-3 transition hover:border-[#4A4A4A] hover:bg-[#2D2D2D]/50"
                  >
                    <div className="rounded-lg bg-[#2D2D2D] p-2.5 text-[#F4C542]">
                      <Plus size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#F5F5F5]">
                        Add New Product
                      </h3>

                      <p className="mt-1 text-xs text-[#B5B5B5]/70">
                        Create a new product listing.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/orders"
                    className="flex items-center gap-3 rounded-xl border border-[#3A3A3A] p-4 transition hover:border-[#4A4A4A] hover:bg-[#353535]"
                  >
                    <div className="rounded-lg bg-[#2D4058] p-2.5 text-[#7DA7E8]">
                      <ShoppingCart size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#F5F5F5]">
                        Manage Orders
                      </h3>

                      <p className="mt-1 text-xs text-[#B5B5B5]/70">
                        Track and update customer orders.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/customers"
                    className="flex items-center gap-3 rounded-xl border border-[#3A3A3A] p-4 transition hover:border-[#4A4A4A] hover:bg-[#353535]"
                  >
                    <div className="rounded-lg bg-[#65C18C]/15 p-2.5 text-[#65C18C]">
                      <Users size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#F5F5F5]">
                        View Customers
                      </h3>

                      <p className="mt-1 text-xs text-[#B5B5B5]/70">
                        Manage customer information.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/analytics"
                    className="flex items-center gap-3 rounded-xl border border-[#3A3A3A] p-4 transition hover:border-[#4A4A4A] hover:bg-[#353535]"
                  >
                    <div className="rounded-lg bg-[#3D304F] p-2.5 text-[#B59AE8]">
                      <BarChart3 size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#F5F5F5]">
                        View Analytics
                      </h3>

                      <p className="mt-1 text-xs text-[#B5B5B5]/70">
                        Analyze your store performance.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pb-3 text-center text-[10px] text-[#B5B5B5]/50">
              © 2026 ECOM Admin Panel. All rights reserved.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
