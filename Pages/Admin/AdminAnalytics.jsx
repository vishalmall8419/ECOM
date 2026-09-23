
import { useMemo, useState } from "react";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ShoppingCart,
  Users,
  Package,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  Target,
} from "lucide-react";


// Demo monthly analytics data
const monthlyData = [
  {
    month: "Jan",
    revenue: 42000,
    orders: 84,
    customers: 42,
  },
  {
    month: "Feb",
    revenue: 58000,
    orders: 112,
    customers: 56,
  },
  {
    month: "Mar",
    revenue: 47000,
    orders: 96,
    customers: 48,
  },
  {
    month: "Apr",
    revenue: 72000,
    orders: 148,
    customers: 71,
  },
  {
    month: "May",
    revenue: 65000,
    orders: 132,
    customers: 64,
  },
  {
    month: "Jun",
    revenue: 89000,
    orders: 176,
    customers: 89,
  },
  {
    month: "Jul",
    revenue: 78000,
    orders: 158,
    customers: 76,
  },
  {
    month: "Aug",
    revenue: 96000,
    orders: 194,
    customers: 98,
  },
  {
    month: "Sep",
    revenue: 112000,
    orders: 226,
    customers: 118,
  },
];


// Demo category analytics
const categoryData = [
  {
    name: "Garments",
    revenue: 142500,
    percentage: 42,
    color: "bg-indigo-500",
  },
  {
    name: "Grocery",
    revenue: 98500,
    percentage: 29,
    color: "bg-emerald-500",
  },
  {
    name: "Footwear",
    revenue: 61000,
    percentage: 18,
    color: "bg-orange-500",
  },
  {
    name: "Electronics",
    revenue: 37500,
    percentage: 11,
    color: "bg-purple-500",
  },
];


// Demo top products
const topProducts = [
  {
    id: 1,
    name: "Oversized Cotton T-Shirt",
    category: "Garments",
    sales: 245,
    revenue: 195755,
    image: "https://loremflickr.com/120/120/tshirt?lock=21",
  },
  {
    id: 2,
    name: "Premium Basmati Rice",
    category: "Grocery",
    sales: 198,
    revenue: 88902,
    image: "https://loremflickr.com/120/120/rice?lock=22",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Footwear",
    sales: 156,
    revenue: 389844,
    image: "https://loremflickr.com/120/120/shoes?lock=23",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    sales: 124,
    revenue: 235476,
    image: "https://loremflickr.com/120/120/headphones?lock=24",
  },
  {
    id: 5,
    name: "Slim Fit Jeans",
    category: "Garments",
    sales: 112,
    revenue: 167888,
    image: "https://loremflickr.com/120/120/jeans?lock=25",
  },
];


// Currency formatter
const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
};


// Reusable analytics card
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
  trend,
  isPositive = true,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={21} />
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {trend}
        </div>
      </div>

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </h3>

      <p className="mt-2 text-xs text-slate-400">
        {subtitle}
      </p>
    </div>
  );
};


// Revenue chart
const RevenueChart = ({ data }) => {
  const maxRevenue = Math.max(
    ...data.map((item) => item.revenue),
  );

  return (
    <div className="mt-6">
      <div className="flex h-72 items-end gap-2 overflow-x-auto border-b border-l border-slate-200 px-3 pb-0 sm:gap-4">
        {data.map((item) => {
          const height = (item.revenue / maxRevenue) * 100;

          return (
            <div
              key={item.month}
              className="group flex min-w-[30px] flex-1 flex-col items-center justify-end gap-2"
            >
              <div className="relative flex h-full w-full items-end justify-center">
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white group-hover:block">
                  {formatCurrency(item.revenue)}
                </div>

                <div
                  style={{ height: `${height}%` }}
                  className="w-full min-w-[18px] rounded-t-lg bg-indigo-500 transition-all duration-300 hover:bg-indigo-700"
                />
              </div>

              <span className="text-xs font-medium text-slate-500">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>Monthly Revenue</span>
        <span>Amount in INR</span>
      </div>
    </div>
  );
};


const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState("This Year");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const selectedMetricData = useMemo(() => {
    if (selectedMetric === "orders") {
      return monthlyData.map((item) => ({
        month: item.month,
        value: item.orders,
      }));
    }

    if (selectedMetric === "customers") {
      return monthlyData.map((item) => ({
        month: item.month,
        value: item.customers,
      }));
    }

    return monthlyData.map((item) => ({
      month: item.month,
      value: item.revenue,
    }));
  }, [selectedMetric]);


  const maxMetricValue = Math.max(
    ...selectedMetricData.map((item) => item.value),
  );


  const totalRevenue = monthlyData.reduce(
    (total, item) => total + item.revenue,
    0,
  );

  const totalOrders = monthlyData.reduce(
    (total, item) => total + item.orders,
    0,
  );

  const totalCustomers = monthlyData.reduce(
    (total, item) => total + item.customers,
    0,
  );


  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-indigo-600">
              Admin Panel / Business Insights
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Analytics
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track your business performance and sales growth.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
              <CalendarDays
                size={17}
                className="text-slate-500"
              />

              <select
                value={dateRange}
                onChange={(event) =>
                  setDateRange(event.target.value)
                }
                className="bg-transparent text-sm font-medium text-slate-700 outline-none"
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
          </div>
        </div>


        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            subtitle="Compared to previous period"
            icon={IndianRupee}
            iconClass="bg-indigo-100 text-indigo-600"
            trend="+18.4%"
          />

          <StatCard
            title="Total Orders"
            value={totalOrders.toLocaleString("en-IN")}
            subtitle="Orders processed in selected period"
            icon={ShoppingCart}
            iconClass="bg-emerald-100 text-emerald-600"
            trend="+12.8%"
          />

          <StatCard
            title="Total Customers"
            value={totalCustomers.toLocaleString("en-IN")}
            subtitle="Registered and active customers"
            icon={Users}
            iconClass="bg-purple-100 text-purple-600"
            trend="+15.2%"
          />

          <StatCard
            title="Conversion Rate"
            value="8.42%"
            subtitle="Visitors converted into customers"
            icon={Target}
            iconClass="bg-orange-100 text-orange-600"
            trend="+4.6%"
          />
        </div>


        {/* Main Analytics Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Revenue Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Revenue Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monthly performance for {dateRange.toLowerCase()}.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
                <TrendingUp size={15} />
                18.4% Growth
              </div>
            </div>

            <RevenueChart data={monthlyData} />
          </div>


          {/* Sales Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Sales Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Overall order status
                </p>
              </div>

              <MoreHorizontal
                size={20}
                className="text-slate-400"
              />
            </div>

            <div className="mt-6 space-y-5">

              {/* Completed */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle
                      size={16}
                      className="text-emerald-500"
                    />

                    <span className="text-sm font-medium text-slate-600">
                      Completed
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-800">
                    68%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[68%] rounded-full bg-emerald-500" />
                </div>
              </div>


              {/* Pending */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock
                      size={16}
                      className="text-orange-500"
                    />

                    <span className="text-sm font-medium text-slate-600">
                      Pending
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-800">
                    18%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[18%] rounded-full bg-orange-500" />
                </div>
              </div>


              {/* Cancelled */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle
                      size={16}
                      className="text-red-500"
                    />

                    <span className="text-sm font-medium text-slate-600">
                      Cancelled
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-800">
                    14%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[14%] rounded-full bg-red-500" />
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                Average Order Value
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {formatCurrency(totalRevenue / totalOrders)}
              </h3>

              <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <TrendingUp size={14} />
                +9.2% from last period
              </div>
            </div>
          </div>
        </div>


        {/* Metric Analysis */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Performance Analysis
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Compare revenue, orders and customers.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedMetric("revenue")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  selectedMetric === "revenue"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Revenue
              </button>

              <button
                type="button"
                onClick={() => setSelectedMetric("orders")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  selectedMetric === "orders"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Orders
              </button>

              <button
                type="button"
                onClick={() => setSelectedMetric("customers")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  selectedMetric === "customers"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Customers
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {selectedMetricData.map((item) => {
              const height =
                (item.value / maxMetricValue) * 100;

              return (
                <div
                  key={item.month}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex h-36 w-full items-end justify-center rounded-lg bg-slate-50 p-2">
                    <div
                      style={{
                        height: `${height}%`,
                      }}
                      className="w-full rounded-md bg-indigo-500 transition-all hover:bg-indigo-700"
                      title={`${item.month}: ${item.value}`}
                    />
                  </div>

                  <span className="text-xs font-medium text-slate-500">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>


        {/* Bottom Analytics Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* Category Performance */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Category Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Revenue distribution by category
                </p>
              </div>

              <BarChart3
                size={20}
                className="text-indigo-500"
              />
            </div>

            <div className="mt-6 space-y-5">
              {categoryData.map((category) => (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${category.color}`}
                      />

                      <span className="text-sm font-semibold text-slate-700">
                        {category.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-800">
                        {formatCurrency(category.revenue)}
                      </span>

                      <span className="ml-2 text-xs text-slate-400">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      style={{
                        width: `${category.percentage}%`,
                      }}
                      className={`h-full rounded-full ${category.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Top Products */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Top Selling Products
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Products generating the most sales
                </p>
              </div>

              <Package
                size={20}
                className="text-indigo-500"
              />
            </div>

            <div className="mt-5 space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
                >
                  <span className="w-5 text-sm font-bold text-slate-400">
                    {index + 1}
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-sm font-semibold text-slate-800">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {product.category} • {product.sales} sales
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">
                      {formatCurrency(product.revenue)}
                    </p>

                    <p className="mt-1 text-xs text-emerald-600">
                      Revenue
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Bottom Insight Banner */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp size={20} />

              <span className="text-sm font-semibold text-indigo-100">
                Business Growth Insight
              </span>
            </div>

            <h2 className="text-xl font-bold">
              Your sales performance is growing.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Review your top-performing categories and products
              to understand where your revenue is coming from.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold backdrop-blur-sm">
            <TrendingUp size={17} />
            +18.4% Growth
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;