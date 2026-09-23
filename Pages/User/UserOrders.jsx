
import { useMemo, useState } from "react";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  ShoppingBag,
  ChevronRight,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const UserOrders = () => {
  const navigate = useNavigate();

  // Active Filter
  const [activeFilter, setActiveFilter] = useState("All");

  // Search Input
  const [searchQuery, setSearchQuery] = useState("");

  // Demo Orders Data
  const orders = [
    {
      id: "ORD-1024",
      date: "Sep 22, 2026",
      timestamp: "2026-09-22",
      productCount: 2,
      totalAmount: 1299,
      paymentMethod: "Cash on Delivery",
      status: "Delivered",
      customerName: "Vishal Mall",
      items: [
        {
          id: 1,
          name: "Premium Cotton Shirt",
          category: "Garments",
          quantity: 1,
          price: 999,
          image:
            "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=300&auto=format&fit=crop",
        },
        {
          id: 2,
          name: "Cotton Socks",
          category: "Garments",
          quantity: 1,
          price: 300,
          image:
            "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=300&auto=format&fit=crop",
        },
      ],
    },
    {
      id: "ORD-1023",
      date: "Sep 20, 2026",
      timestamp: "2026-09-20",
      productCount: 1,
      totalAmount: 899,
      paymentMethod: "UPI",
      status: "Processing",
      customerName: "Vishal Mall",
      items: [
        {
          id: 3,
          name: "Face Care Essentials",
          category: "Cosmetics",
          quantity: 1,
          price: 899,
          image:
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop",
        },
      ],
    },
    {
      id: "ORD-1022",
      date: "Sep 18, 2026",
      timestamp: "2026-09-18",
      productCount: 1,
      totalAmount: 699,
      paymentMethod: "Cash on Delivery",
      status: "Shipped",
      customerName: "Vishal Mall",
      items: [
        {
          id: 4,
          name: "Casual T-Shirt",
          category: "Garments",
          quantity: 1,
          price: 699,
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&auto=format&fit=crop",
        },
      ],
    },
    {
      id: "ORD-1021",
      date: "Sep 15, 2026",
      timestamp: "2026-09-15",
      productCount: 3,
      totalAmount: 2499,
      paymentMethod: "UPI",
      status: "Cancelled",
      customerName: "Vishal Mall",
      items: [
        {
          id: 5,
          name: "Daily Care Kit",
          category: "Cosmetics",
          quantity: 1,
          price: 2499,
          image:
            "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop",
        },
      ],
    },
    {
      id: "ORD-1020",
      date: "Sep 10, 2026",
      timestamp: "2026-09-10",
      productCount: 1,
      totalAmount: 1499,
      paymentMethod: "UPI",
      status: "Delivered",
      customerName: "Vishal Mall",
      items: [
        {
          id: 6,
          name: "Premium Casual Wear",
          category: "Garments",
          quantity: 1,
          price: 1499,
          image:
            "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=300&auto=format&fit=crop",
        },
      ],
    },
  ];

  // Filter Options
  const filters = [
    "All",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  // Filter and Search Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter =
        activeFilter === "All" ||
        order.status === activeFilter;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(query)
        );

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Status Icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} />;

      case "Processing":
        return <Clock size={16} />;

      case "Shipped":
        return <Truck size={16} />;

      case "Cancelled":
        return <XCircle size={16} />;

      default:
        return <Package size={16} />;
    }
  };

  // Status Style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Empty State
  if (filteredOrders.length === 0) {
    return (
      <div className="min-h-screen bg-[#F1E8DF] p-4 sm:p-6 lg:p-8">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#2D2926] sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track and manage your purchases.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#E7DCD2] bg-white px-4 py-3">
          <Search size={19} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search by order ID or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-[#2D2926] text-white"
                  : "bg-white text-gray-600 hover:bg-[#EDE2D8]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#E7DCD2] bg-white px-6 text-center">

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F3EF]">
            <ShoppingBag size={28} className="text-[#8B5E3C]" />
          </div>

          <h2 className="text-lg font-bold text-[#2D2926]">
            No Orders Found
          </h2>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            We couldn't find any orders matching your search or filter.
          </p>

          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("All");
            }}
            className="mt-5 rounded-xl bg-[#2D2926] px-5 py-3 text-sm font-semibold text-white"
          >
            Clear Filters
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1E8DF] p-4 sm:p-6 lg:p-8">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">
            Account / Orders
          </p>

          <h1 className="text-2xl font-bold text-[#2D2926] sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track and manage your purchases in one place.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2D2926] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4A403A]"
        >
          <ShoppingBag size={17} />
          Continue Shopping
        </Link>

      </div>

      {/* =====================================
          ORDER SUMMARY
      ===================================== */}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

        <div className="rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            Total Orders
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#2D2926]">
            {orders.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            Processing
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-600">
            {orders.filter((order) => order.status === "Processing").length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            Delivered
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {orders.filter((order) => order.status === "Delivered").length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            Cancelled
          </p>

          <h2 className="mt-2 text-2xl font-bold text-red-600">
            {orders.filter((order) => order.status === "Cancelled").length}
          </h2>
        </div>

      </div>

      {/* =====================================
          SEARCH AND FILTER
      ===================================== */}

      <div className="mb-6 rounded-2xl border border-[#E7DCD2] bg-white p-4 shadow-sm sm:p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}

          <div className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-[#FAF8F6] px-4 py-3 lg:max-w-md">
            <Search size={19} className="shrink-0 text-gray-400" />

            <input
              type="text"
              placeholder="Search order ID or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[#2D2926] outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Filter Buttons */}

          <div className="flex gap-2 overflow-x-auto pb-1">

            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? "bg-[#2D2926] text-white"
                    : "bg-[#F8F3EF] text-gray-600 hover:bg-[#EDE2D8]"
                }`}
              >
                {filter}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* =====================================
          RESULTS HEADER
      ===================================== */}

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-lg font-bold text-[#2D2926]">
          {activeFilter === "All" ? "All Orders" : `${activeFilter} Orders`}
        </h2>

        <span className="text-sm text-gray-500">
          {filteredOrders.length} results
        </span>

      </div>

      {/* =====================================
          ORDERS LIST
      ===================================== */}

      <div className="space-y-5">

        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-2xl border border-[#E7DCD2] bg-white shadow-sm transition hover:shadow-md"
          >

            {/* Order Header */}

            <div className="flex flex-col gap-3 border-b border-gray-100 bg-[#FCFAF8] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

                <div>
                  <p className="text-xs text-gray-500">
                    Order ID
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#2D2926]">
                    #{order.id}
                  </p>
                </div>

                <div className="hidden h-8 w-px bg-gray-200 sm:block" />

                <div>
                  <p className="text-xs text-gray-500">
                    Order Date
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm font-medium text-[#2D2926]">
                    <CalendarDays size={14} />
                    {order.date}
                  </p>
                </div>

              </div>

              <span
                className={`flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${getStatusStyle(order.status)}`}
              >
                {getStatusIcon(order.status)}
                {order.status}
              </span>

            </div>

            {/* Order Body */}

            <div className="p-4 sm:p-5">

              <div className="space-y-4">

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-sm font-semibold text-[#2D2926] sm:text-base">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.category}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-[#2D2926]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

              {/* Order Footer */}

              <div className="mt-5 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

                  <div>
                    <p className="text-xs text-gray-500">
                      Total Amount
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-lg font-bold text-[#2D2926]">
                      <IndianRupee size={16} />
                      {order.totalAmount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="hidden h-8 w-px bg-gray-200 sm:block" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Payment
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#2D2926]">
                      {order.paymentMethod}
                    </p>
                  </div>

                </div>

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={() =>
                      navigate(`/dashboard/orders/${order.id}`)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9C4B4] px-4 py-2.5 text-xs font-semibold text-[#8B5E3C] transition hover:bg-[#F8F3EF]"
                  >
                    <Eye size={16} />
                    View Details
                  </button>

                  {order.status === "Delivered" && (
                    <button
                      onClick={() => alert("Return request feature coming soon.")}
                      className="rounded-xl bg-[#2D2926] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4A403A]"
                    >
                      Return
                    </button>
                  )}

                  {order.status === "Processing" && (
                    <button
                      onClick={() => alert("Cancellation request feature coming soon.")}
                      className="rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Cancel Order
                    </button>
                  )}

                  {order.status === "Cancelled" && (
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#2D2926] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4A403A]"
                    >
                      Buy Again
                      <ChevronRight size={14} />
                    </Link>
                  )}

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default UserOrders;