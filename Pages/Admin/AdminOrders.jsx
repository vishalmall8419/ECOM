import { useMemo, useState } from "react";

import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  User,
  MapPin,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  IndianRupee,
} from "lucide-react";

import { Link } from "react-router-dom";

/* ============================================
   SAMPLE ORDER DATA
============================================ */

const initialOrders = [
  {
    id: "ORD-1001",
    customer: {
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "+91 9876543210",
    },
    items: [
      {
        id: 101,
        name: "Oversized Cotton T-Shirt",
        quantity: 2,
        price: 799,
        image: "https://loremflickr.com/120/120/tshirt",
      },
      {
        id: 102,
        name: "Classic Denim Jeans",
        quantity: 1,
        price: 1499,
        image: "https://loremflickr.com/120/120/jeans",
      },
    ],
    total: 3097,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    address: {
      street: "Vijay Nagar",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452010",
    },
    orderDate: "2026-09-18",
  },
  {
    id: "ORD-1002",
    customer: {
      name: "Priya Verma",
      email: "priya.verma@gmail.com",
      phone: "+91 8765432109",
    },
    items: [
      {
        id: 201,
        name: "Premium Basmati Rice",
        quantity: 2,
        price: 449,
        image: "https://loremflickr.com/120/120/rice",
      },
    ],
    total: 947,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    orderStatus: "Processing",
    address: {
      street: "MP Nagar",
      city: "Bhopal",
      state: "Madhya Pradesh",
      pincode: "462011",
    },
    orderDate: "2026-09-19",
  },
  {
    id: "ORD-1003",
    customer: {
      name: "Amit Patel",
      email: "amit.patel@gmail.com",
      phone: "+91 9988776655",
    },
    items: [
      {
        id: 301,
        name: "Running Sports Shoes",
        quantity: 1,
        price: 2299,
        image: "https://loremflickr.com/120/120/shoes",
      },
    ],
    total: 2299,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    address: {
      street: "Navrangpura",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380009",
    },
    orderDate: "2026-09-17",
  },
  {
    id: "ORD-1004",
    customer: {
      name: "Neha Singh",
      email: "neha.singh@gmail.com",
      phone: "+91 9123456780",
    },
    items: [
      {
        id: 401,
        name: "Women Casual Kurti",
        quantity: 2,
        price: 899,
        image: "https://loremflickr.com/120/120/kurti",
      },
    ],
    total: 1888,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    address: {
      street: "Gomti Nagar",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
    },
    orderDate: "2026-09-15",
  },
  {
    id: "ORD-1005",
    customer: {
      name: "Vishal Kumar",
      email: "vishal.kumar@gmail.com",
      phone: "+91 9090909090",
    },
    items: [
      {
        id: 501,
        name: "Wireless Headphones",
        quantity: 1,
        price: 1799,
        image: "https://loremflickr.com/120/120/headphones",
      },
    ],
    total: 1799,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    orderStatus: "Pending",
    address: {
      street: "Rohini",
      city: "Delhi",
      state: "Delhi",
      pincode: "110085",
    },
    orderDate: "2026-09-20",
  },
  {
    id: "ORD-1006",
    customer: {
      name: "Anjali Gupta",
      email: "anjali.gupta@gmail.com",
      phone: "+91 8899776655",
    },
    items: [
      {
        id: 601,
        name: "Premium Handbag",
        quantity: 1,
        price: 1299,
        image: "https://loremflickr.com/120/120/handbag",
      },
    ],
    total: 1348,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Cancelled",
    address: {
      street: "Malviya Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302017",
    },
    orderDate: "2026-09-14",
  },
  {
    id: "ORD-1007",
    customer: {
      name: "Rohit Yadav",
      email: "rohit.yadav@gmail.com",
      phone: "+91 7788990011",
    },
    items: [
      {
        id: 701,
        name: "Formal Cotton Shirt",
        quantity: 2,
        price: 999,
        image: "https://loremflickr.com/120/120/shirt",
      },
    ],
    total: 2047,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    address: {
      street: "Kalyanpur",
      city: "Kanpur",
      state: "Uttar Pradesh",
      pincode: "208017",
    },
    orderDate: "2026-09-21",
  },
];

/* ============================================
   HELPER FUNCTIONS
============================================ */

const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getOrderStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-500/15 text-green-700";

    case "Shipped":
      return "bg-blue-100 text-blue-700";

    case "Processing":
      return "bg-yellow-500/15 text-yellow-700";

    case "Pending":
      return "bg-orange-500/15 text-orange-700";

    case "Cancelled":
      return "bg-red-500/15 text-red-700";

    default:
      return "bg-[#244838] text-[#D8D0B8]";
  }
};

const getPaymentStatusStyle = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-500/15 text-green-700";

    case "Pending":
      return "bg-yellow-500/15 text-yellow-700";

    case "Failed":
      return "bg-red-500/15 text-red-700";

    default:
      return "bg-[#244838] text-[#D8D0B8]";
  }
};

const getOrderStatusIcon = (status) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle size={14} />;

    case "Shipped":
      return <Truck size={14} />;

    case "Processing":
      return <Package size={14} />;

    case "Pending":
      return <Clock size={14} />;

    case "Cancelled":
      return <XCircle size={14} />;

    default:
      return null;
  }
};

/* ============================================
   ADMIN ORDERS COMPONENT
============================================ */

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All Status");

  const [paymentFilter, setPaymentFilter] = useState("All Payments");

  const [showFilters, setShowFilters] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orderToDelete, setOrderToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 5;

  /* ============================================
     SUMMARY DATA
============================================ */

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending",
  ).length;

  const processingOrders = orders.filter(
    (order) => order.orderStatus === "Processing",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered",
  ).length;

  const totalRevenue = orders
    .filter(
      (order) =>
        order.paymentStatus === "Paid" && order.orderStatus !== "Cancelled",
    )
    .reduce((total, order) => total + Number(order.total || 0), 0);

  /* ============================================
     FILTER ORDERS
============================================ */

  const filteredOrders = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchValue) ||
        order.customer.name.toLowerCase().includes(searchValue) ||
        order.customer.email.toLowerCase().includes(searchValue) ||
        order.customer.phone.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" || order.orderStatus === statusFilter;

      const matchesPayment =
        paymentFilter === "All Payments" ||
        order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  /* ============================================
     PAGINATION
============================================ */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ordersPerPage),
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedOrders = filteredOrders.slice(
    (safePage - 1) * ordersPerPage,
    safePage * ordersPerPage,
  );

  /* ============================================
     HANDLERS
============================================ */

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePaymentFilter = (value) => {
    setPaymentFilter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Status");
    setPaymentFilter("All Payments");
    setCurrentPage(1);
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderStatus: newStatus,
            }
          : order,
      ),
    );

    setSelectedOrder((previousOrder) =>
      previousOrder?.id === orderId
        ? {
            ...previousOrder,
            orderStatus: newStatus,
          }
        : previousOrder,
    );
  };

  const handlePaymentStatusChange = (orderId, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              paymentStatus: newStatus,
            }
          : order,
      ),
    );

    setSelectedOrder((previousOrder) =>
      previousOrder?.id === orderId
        ? {
            ...previousOrder,
            paymentStatus: newStatus,
          }
        : previousOrder,
    );
  };

  const handleDeleteOrder = () => {
    if (!orderToDelete) return;

    setOrders((previousOrders) =>
      previousOrders.filter((order) => order.id !== orderToDelete.id),
    );

    if (selectedOrder?.id === orderToDelete.id) {
      setSelectedOrder(null);
    }

    setOrderToDelete(null);
  };

  /* ============================================
     RENDER
============================================ */

  return (
    <div className="min-h-screen bg-[#102A20] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#D8D0B8]/70">
              <Link
                to="/dashboard"
                className="transition hover:text-[#F3D45D]"
              >
                Admin Dashboard
              </Link>

              <span>/</span>

              <span className="text-[#D8D0B8]">Orders</span>
            </div>

            <h1 className="flex items-center gap-3 text-2xl font-bold text-[#FFF4D6] sm:text-3xl">
              <ShoppingBag size={30} className="text-[#F3D45D]" />
              Orders
            </h1>

            <p className="mt-2 text-sm text-[#D8D0B8]/70">
              Manage customer orders, payments and delivery status.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-2.5 text-sm font-semibold text-[#D8D0B8] transition hover:border-[#6D5B3C]/50 hover:text-[#F3D45D]"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* ========================================
            SUMMARY CARDS
        ======================================== */}

        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {/* Total Orders */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">Total Orders</p>

                <h2 className="mt-2 text-2xl font-bold text-[#FFF4D6]">
                  {totalOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-[#244838] p-3 text-[#F3D45D]">
                <ShoppingBag size={22} />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">Pending</p>

                <h2 className="mt-2 text-2xl font-bold text-[#FFF4D6]">
                  {pendingOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-500/15 p-3 text-orange-600">
                <Clock size={22} />
              </div>
            </div>
          </div>

          {/* Processing */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">Processing</p>

                <h2 className="mt-2 text-2xl font-bold text-[#FFF4D6]">
                  {processingOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-yellow-500/15 p-3 text-yellow-600">
                <Package size={22} />
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">Delivered</p>

                <h2 className="mt-2 text-2xl font-bold text-[#FFF4D6]">
                  {deliveredOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-green-500/15 p-3 text-green-600">
                <CheckCircle size={22} />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#D8D0B8]/70">Revenue</p>

                <h2 className="mt-2 text-xl font-bold text-[#FFF4D6]">
                  {formatCurrency(totalRevenue)}
                </h2>
              </div>

              <div className="rounded-xl bg-purple-500/15 p-3 text-purple-600">
                <IndianRupee size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            ORDERS TABLE CARD
        ======================================== */}

        <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] shadow-sm transition-shadow duration-200 hover:shadow-md">
          {/* Toolbar */}
          <div className="border-b border-[#244838] p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#D8D0B8]/50"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search order ID, customer..."
                  className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#F3D45D] focus:bg-[#18372A] focus:ring-2 focus:ring-[#244838]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters((previous) => !previous)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    showFilters
                      ? "border-[#6D5B3C]/50 bg-[#244838]/50 text-[#F3D45D]"
                      : "border-[#6D5B3C]/40 text-[#D8D0B8] hover:border-[#6D5B3C]/50 hover:text-[#F3D45D]"
                  }`}
                >
                  <Filter size={17} />
                  Filters
                </button>

                <span className="text-sm text-[#D8D0B8]/70">
                  {filteredOrders.length} Orders
                </span>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-5 grid gap-4 rounded-xl border border-[#244838] bg-[#244838]/60 p-4 sm:grid-cols-2">
                {/* Order Status */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                    Order Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) => handleStatusFilter(event.target.value)}
                    className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-3 text-sm text-[#D8D0B8] outline-none focus:border-[#F3D45D]"
                  >
                    <option value="All Status">All Status</option>

                    <option value="Pending">Pending</option>

                    <option value="Processing">Processing</option>

                    <option value="Shipped">Shipped</option>

                    <option value="Delivered">Delivered</option>

                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                    Payment Status
                  </label>

                  <select
                    value={paymentFilter}
                    onChange={(event) =>
                      handlePaymentFilter(event.target.value)
                    }
                    className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-3 text-sm text-[#D8D0B8] outline-none focus:border-[#F3D45D]"
                  >
                    <option value="All Payments">All Payments</option>

                    <option value="Paid">Paid</option>

                    <option value="Pending">Pending</option>

                    <option value="Failed">Failed</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-left text-sm font-semibold text-[#F3D45D] hover:text-[#DDBB45]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* ========================================
              TABLE
          ======================================== */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left">
              <thead className="bg-[#244838]/60 text-xs uppercase tracking-wide text-[#D8D0B8]/70">
                <tr>
                  <th className="px-5 py-4 font-semibold">Order</th>

                  <th className="px-5 py-4 font-semibold">Customer</th>

                  <th className="px-5 py-4 font-semibold">Date</th>

                  <th className="px-5 py-4 font-semibold">Total</th>

                  <th className="px-5 py-4 font-semibold">Payment</th>

                  <th className="px-5 py-4 font-semibold">Order Status</th>

                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#244838]">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-[#244838]/60">
                    {/* Order ID */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-[#F3D45D]">
                        {order.id}
                      </p>

                      <p className="mt-1 text-xs text-[#D8D0B8]/50">
                        {order.items.length} Item(s)
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-[#FFF4D6]">
                        {order.customer.name}
                      </p>

                      <p className="mt-1 text-xs text-[#D8D0B8]/50">
                        {order.customer.email}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-[#D8D0B8]">
                      {formatDate(order.orderDate)}
                    </td>

                    {/* Total */}
                    <td className="px-5 py-4 text-sm font-bold text-[#FFF4D6]">
                      {formatCurrency(order.total)}
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-[#D8D0B8]">
                        {order.paymentMethod}
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${getPaymentStatusStyle(
                          order.paymentStatus,
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Order Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getOrderStatusStyle(
                          order.orderStatus,
                        )}`}
                      >
                        {getOrderStatusIcon(order.orderStatus)}

                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* View */}
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-[#244838]/50 hover:text-[#F3D45D]"
                          title="View Order"
                        >
                          <Eye size={17} />
                        </button>

                        {/* More */}
                        <button
                          type="button"
                          onClick={() =>
                            window.alert(`More options for ${order.id}`)
                          }
                          className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-[#244838] hover:text-[#D8D0B8]"
                          title="More Options"
                        >
                          <MoreVertical size={17} />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setOrderToDelete(order)}
                          className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-red-500/10 hover:text-red-600"
                          title="Delete Order"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedOrders.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#244838] text-[#D8D0B8]/50">
                <ShoppingBag size={30} />
              </div>

              <h3 className="text-lg font-semibold text-[#FFF4D6]">
                No Orders Found
              </h3>

              <p className="mt-2 text-sm text-[#D8D0B8]/70">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm font-semibold text-[#F3D45D] hover:text-[#DDBB45]"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-[#244838] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#D8D0B8]/70">
                Showing{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {(safePage - 1) * ordersPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {Math.min(safePage * ordersPerPage, filteredOrders.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {filteredOrders.length}
                </span>{" "}
                orders
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage((previous) => previous - 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#6D5B3C]/40 px-3 py-2 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]/60 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    type="button"
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                      safePage === index + 1
                        ? "bg-[#F3D45D] text-[#102A20]"
                        : "border border-[#6D5B3C]/40 text-[#D8D0B8] hover:bg-[#244838]/60"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setCurrentPage((previous) => previous + 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#6D5B3C]/40 px-3 py-2 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]/60 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================
          ORDER DETAILS MODAL
      ============================================ */}

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#18372A] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#D8D0B8]/50">
                  Order Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#FFF4D6]">
                  {selectedOrder.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-[#244838] hover:text-[#D8D0B8]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Customer Information */}
            <div className="rounded-xl border border-[#244838] bg-[#244838]/60 p-4">
              <div className="mb-3 flex items-center gap-2">
                <User size={18} className="text-[#F3D45D]" />

                <h3 className="font-semibold text-[#FFF4D6]">
                  Customer Information
                </h3>
              </div>

              <p className="text-sm font-semibold text-[#FFF4D6]">
                {selectedOrder.customer.name}
              </p>

              <p className="mt-1 text-sm text-[#D8D0B8]/70">
                {selectedOrder.customer.email}
              </p>

              <p className="mt-1 text-sm text-[#D8D0B8]/70">
                {selectedOrder.customer.phone}
              </p>
            </div>

            {/* Delivery Address */}
            <div className="mt-4 rounded-xl border border-[#244838] bg-[#244838]/60 p-4">
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-[#F3D45D]" />

                <h3 className="font-semibold text-[#FFF4D6]">
                  Delivery Address
                </h3>
              </div>

              <p className="text-sm text-[#D8D0B8]">
                {selectedOrder.address.street}
              </p>

              <p className="mt-1 text-sm text-[#D8D0B8]">
                {selectedOrder.address.city}, {selectedOrder.address.state}
              </p>

              <p className="mt-1 text-sm text-[#D8D0B8]">
                PIN: {selectedOrder.address.pincode}
              </p>
            </div>

            {/* Order Items */}
            <div className="mt-4 rounded-xl border border-[#244838] p-4">
              <div className="mb-4 flex items-center gap-2">
                <Package size={18} className="text-[#F3D45D]" />

                <h3 className="font-semibold text-[#FFF4D6]">Order Items</h3>
              </div>

              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#FFF4D6]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#D8D0B8]/50">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-[#FFF4D6]">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Controls */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Order Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                  Order Status
                </label>

                <select
                  value={selectedOrder.orderStatus}
                  onChange={(event) =>
                    handleOrderStatusChange(
                      selectedOrder.id,
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-[#6D5B3C]/40 px-3 py-3 text-sm outline-none focus:border-[#F3D45D]"
                >
                  <option value="Pending">Pending</option>

                  <option value="Processing">Processing</option>

                  <option value="Shipped">Shipped</option>

                  <option value="Delivered">Delivered</option>

                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                  Payment Status
                </label>

                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(event) =>
                    handlePaymentStatusChange(
                      selectedOrder.id,
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-[#6D5B3C]/40 px-3 py-3 text-sm outline-none focus:border-[#F3D45D]"
                >
                  <option value="Pending">Pending</option>

                  <option value="Paid">Paid</option>

                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-5 rounded-xl bg-[#244838]/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#F3D45D]">Payment Method</span>

                <span className="text-sm font-semibold text-[#DDBB45]">
                  {selectedOrder.paymentMethod}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#244838] pt-3">
                <span className="font-semibold text-[#DDBB45]">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-[#DDBB45]">
                  {formatCurrency(selectedOrder.total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-[#F3D45D] px-4 py-3 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45]"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* ============================================
          DELETE MODAL
      ============================================ */}

      {orderToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#18372A] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15 text-red-600">
                <Trash2 size={21} />
              </div>

              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="rounded-lg p-2 text-[#D8D0B8]/50 transition hover:bg-[#244838]"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#FFF4D6]">
              Delete Order?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#D8D0B8]/70">
              Are you sure you want to delete order{" "}
              <span className="font-semibold text-[#D8D0B8]">
                {orderToDelete.id}
              </span>
              ? This action cannot be undone in this frontend demo.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="rounded-xl border border-[#6D5B3C]/40 px-4 py-2.5 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]/60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteOrder}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
