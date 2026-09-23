import { useMemo, useState } from "react";

import {
  Search,
  ShoppingCart,
  Users,
  IndianRupee,
  ShoppingBag,
  Eye,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  CircleDollarSign,
} from "lucide-react";


// Demo cart data
const initialCarts = [
  {
    id: "CART-1001",
    customer: {
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
    },
    items: [
      {
        id: 101,
        name: "Oversized Cotton T-Shirt",
        image:
          "https://loremflickr.com/120/120/tshirt?lock=1",
        quantity: 2,
        price: 799,
      },
      {
        id: 102,
        name: "Slim Fit Jeans",
        image:
          "https://loremflickr.com/120/120/jeans?lock=2",
        quantity: 1,
        price: 1499,
      },
    ],
    totalItems: 3,
    subtotal: 3097,
    status: "Active",
    lastUpdated: "Today, 10:30 AM",
    createdAt: "Sep 23, 2026",
  },
  {
    id: "CART-1002",
    customer: {
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "+91 9876543211",
    },
    items: [
      {
        id: 201,
        name: "Premium Basmati Rice",
        image:
          "https://loremflickr.com/120/120/rice?lock=3",
        quantity: 2,
        price: 449,
      },
      {
        id: 202,
        name: "Organic Cooking Oil",
        image:
          "https://loremflickr.com/120/120/oil?lock=4",
        quantity: 1,
        price: 299,
      },
    ],
    totalItems: 3,
    subtotal: 1197,
    status: "Abandoned",
    lastUpdated: "Yesterday, 08:45 PM",
    createdAt: "Sep 22, 2026",
  },
  {
    id: "CART-1003",
    customer: {
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "+91 9876543212",
    },
    items: [
      {
        id: 301,
        name: "Running Shoes",
        image:
          "https://loremflickr.com/120/120/shoes?lock=5",
        quantity: 1,
        price: 2499,
      },
    ],
    totalItems: 1,
    subtotal: 2499,
    status: "Active",
    lastUpdated: "Today, 09:15 AM",
    createdAt: "Sep 23, 2026",
  },
  {
    id: "CART-1004",
    customer: {
      name: "Neha Singh",
      email: "neha@gmail.com",
      phone: "+91 9876543213",
    },
    items: [
      {
        id: 401,
        name: "Wireless Headphones",
        image:
          "https://loremflickr.com/120/120/headphones?lock=6",
        quantity: 1,
        price: 1899,
      },
      {
        id: 402,
        name: "Smart Watch",
        image:
          "https://loremflickr.com/120/120/smartwatch?lock=7",
        quantity: 1,
        price: 2999,
      },
    ],
    totalItems: 2,
    subtotal: 4898,
    status: "Converted",
    lastUpdated: "Sep 21, 2026",
    createdAt: "Sep 21, 2026",
  },
  {
    id: "CART-1005",
    customer: {
      name: "Sandeep Yadav",
      email: "sandeep@gmail.com",
      phone: "+91 9876543214",
    },
    items: [
      {
        id: 501,
        name: "Formal Shirt",
        image:
          "https://loremflickr.com/120/120/shirt?lock=8",
        quantity: 2,
        price: 999,
      },
    ],
    totalItems: 2,
    subtotal: 1998,
    status: "Abandoned",
    lastUpdated: "Sep 20, 2026",
    createdAt: "Sep 20, 2026",
  },
  {
    id: "CART-1006",
    customer: {
      name: "Pooja Gupta",
      email: "pooja@gmail.com",
      phone: "+91 9876543215",
    },
    items: [
      {
        id: 601,
        name: "Face Wash",
        image:
          "https://loremflickr.com/120/120/facewash?lock=9",
        quantity: 1,
        price: 349,
      },
      {
        id: 602,
        name: "Moisturizer",
        image:
          "https://loremflickr.com/120/120/moisturizer?lock=10",
        quantity: 1,
        price: 599,
      },
    ],
    totalItems: 2,
    subtotal: 948,
    status: "Active",
    lastUpdated: "Today, 11:05 AM",
    createdAt: "Sep 23, 2026",
  },
];


// Currency formatter
const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
};


// Status styles
const getStatusStyle = (status) => {
  const styles = {
    Active: "bg-blue-100 text-blue-700",
    Abandoned: "bg-orange-100 text-orange-700",
    Converted: "bg-green-100 text-green-700",
  };

  return styles[status] || "bg-gray-100 text-gray-700";
};


// Status icon
const getStatusIcon = (status) => {
  if (status === "Active") {
    return <ShoppingCart size={14} />;
  }

  if (status === "Abandoned") {
    return <AlertCircle size={14} />;
  }

  if (status === "Converted") {
    return <CheckCircle size={14} />;
  }

  return <Package size={14} />;
};


const AdminCartOverview = () => {
  const [carts, setCarts] = useState(initialCarts);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedCart, setSelectedCart] = useState(null);
  const [cartToDelete, setCartToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;


  // Summary calculations
  const summary = useMemo(() => {
    const totalCartValue = carts.reduce(
      (total, cart) => total + cart.subtotal,
      0,
    );

    const totalItems = carts.reduce(
      (total, cart) => total + cart.totalItems,
      0,
    );

    const activeCarts = carts.filter(
      (cart) => cart.status === "Active",
    ).length;

    const abandonedCarts = carts.filter(
      (cart) => cart.status === "Abandoned",
    ).length;

    const convertedCarts = carts.filter(
      (cart) => cart.status === "Converted",
    ).length;

    return {
      totalCartValue,
      totalItems,
      activeCarts,
      abandonedCarts,
      convertedCarts,
    };
  }, [carts]);


  // Search and filter
  const filteredCarts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return carts.filter((cart) => {
      const matchesSearch =
        cart.id.toLowerCase().includes(searchValue) ||
        cart.customer.name.toLowerCase().includes(searchValue) ||
        cart.customer.email.toLowerCase().includes(searchValue) ||
        cart.customer.phone.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        cart.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [carts, search, statusFilter]);


  // Pagination
  const totalPages = Math.ceil(
    filteredCarts.length / itemsPerPage,
  );

  const paginatedCarts = filteredCarts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );


  // Delete cart
  const handleDeleteCart = () => {
    if (!cartToDelete) return;

    setCarts((previousCarts) =>
      previousCarts.filter(
        (cart) => cart.id !== cartToDelete.id,
      ),
    );

    if (selectedCart?.id === cartToDelete.id) {
      setSelectedCart(null);
    }

    setCartToDelete(null);
  };


  // Change cart status
  const handleStatusChange = (cartId, newStatus) => {
    setCarts((previousCarts) =>
      previousCarts.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              status: newStatus,
            }
          : cart,
      ),
    );

    setSelectedCart((previousCart) =>
      previousCart?.id === cartId
        ? {
            ...previousCart,
            status: newStatus,
          }
        : previousCart,
    );
  };


  // Reset page when search changes
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };


  // Reset page when filter changes
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };


  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-indigo-600">
              Admin Panel / Cart Management
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Cart Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Monitor customer carts, cart value and abandoned carts.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <ShoppingCart
              size={20}
              className="text-indigo-600"
            />

            <span className="text-sm font-semibold text-slate-700">
              {carts.length} Total Carts
            </span>
          </div>
        </div>


        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

          {/* Total Carts */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <ShoppingCart size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Total
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {carts.length}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Total customer carts
            </p>
          </div>


          {/* Cart Value */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <IndianRupee size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Value
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {formatCurrency(summary.totalCartValue)}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Combined cart value
            </p>
          </div>


          {/* Total Items */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <ShoppingBag size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Items
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {summary.totalItems}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Products in all carts
            </p>
          </div>


          {/* Active Carts */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Users size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Active
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {summary.activeCarts}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Currently active carts
            </p>
          </div>


          {/* Abandoned Carts */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <AlertCircle size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Abandoned
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {summary.abandonedCarts}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Carts left by customers
            </p>
          </div>
        </div>


        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder="Search by customer, email or cart ID..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>


            {/* Status Filter */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label
                htmlFor="cart-status"
                className="text-sm font-medium text-slate-600"
              >
                Status:
              </label>

              <select
                id="cart-status"
                value={statusFilter}
                onChange={(event) =>
                  handleStatusFilterChange(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="All">All Carts</option>
                <option value="Active">Active</option>
                <option value="Abandoned">Abandoned</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
          </div>


          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Cart Details
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Items
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Cart Value
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Last Updated
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedCarts.length > 0 ? (
                  paginatedCarts.map((cart) => (
                    <tr
                      key={cart.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Cart Details */}
                      <td className="px-5 py-5">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {cart.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Created: {cart.createdAt}
                          </p>
                        </div>
                      </td>


                      {/* Customer */}
                      <td className="px-5 py-5">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {cart.customer.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {cart.customer.email}
                          </p>
                        </div>
                      </td>


                      {/* Items */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2">
                          <Package
                            size={16}
                            className="text-slate-400"
                          />

                          <span className="text-sm font-semibold text-slate-700">
                            {cart.totalItems} items
                          </span>
                        </div>
                      </td>


                      {/* Value */}
                      <td className="px-5 py-5">
                        <p className="font-bold text-slate-900">
                          {formatCurrency(cart.subtotal)}
                        </p>
                      </td>


                      {/* Status */}
                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                            cart.status,
                          )}`}
                        >
                          {getStatusIcon(cart.status)}
                          {cart.status}
                        </span>
                      </td>


                      {/* Last Updated */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock size={15} />
                          {cart.lastUpdated}
                        </div>
                      </td>


                      {/* Actions */}
                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedCart(cart)}
                            title="View cart"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setCartToDelete(cart)}
                            title="Delete cart"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-16 text-center"
                    >
                      <ShoppingCart
                        size={40}
                        className="mx-auto mb-3 text-slate-300"
                      />

                      <h3 className="text-lg font-semibold text-slate-700">
                        No carts found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or status filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          {/* Pagination */}
          {filteredCarts.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-slate-700">
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredCarts.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {filteredCarts.length}
                </span>{" "}
                carts
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                  {currentPage}
                </span>

                <button
                  type="button"
                  disabled={
                    currentPage === totalPages || totalPages === 0
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages),
                    )
                  }
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Cart Details Modal */}
      {selectedCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Cart Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedCart.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCart(null)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>


            {/* Modal Content */}
            <div className="space-y-6 p-5">

              {/* Customer Information */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <User
                    size={18}
                    className="text-indigo-600"
                  />

                  <h3 className="font-bold text-slate-900">
                    Customer Information
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <User
                      size={16}
                      className="text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Customer Name
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        {selectedCart.customer.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail
                      size={16}
                      className="text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Email
                      </p>

                      <p className="break-all text-sm font-semibold text-slate-700">
                        {selectedCart.customer.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone
                      size={16}
                      className="text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Phone
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        {selectedCart.customer.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock
                      size={16}
                      className="text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Last Updated
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        {selectedCart.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Cart Status */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-bold text-slate-900">
                    Cart Status
                  </h3>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      selectedCart.status,
                    )}`}
                  >
                    {getStatusIcon(selectedCart.status)}
                    {selectedCart.status}
                  </span>
                </div>

                <select
                  value={selectedCart.status}
                  onChange={(event) =>
                    handleStatusChange(
                      selectedCart.id,
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Active">Active</option>
                  <option value="Abandoned">Abandoned</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>


              {/* Cart Items */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">
                    Cart Items
                  </h3>

                  <span className="text-sm text-slate-500">
                    {selectedCart.totalItems} items
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedCart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-2 text-sm font-semibold text-slate-800">
                          {item.name}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm font-bold text-indigo-600">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">
                          Total
                        </p>

                        <p className="text-sm font-bold text-slate-800">
                          {formatCurrency(
                            item.price * item.quantity,
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Cart Summary */}
              <div className="rounded-xl bg-indigo-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <CircleDollarSign
                    size={18}
                    className="text-indigo-600"
                  />

                  <h3 className="font-bold text-slate-900">
                    Cart Summary
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Total Cart Value
                  </span>

                  <span className="text-xl font-bold text-indigo-700">
                    {formatCurrency(selectedCart.subtotal)}
                  </span>
                </div>
              </div>
            </div>


            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setSelectedCart(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setCartToDelete(selectedCart);
                  setSelectedCart(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete Cart
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Delete Confirmation Modal */}
      {cartToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={24} />
            </div>

            <h2 className="text-center text-xl font-bold text-slate-900">
              Delete Cart?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Are you sure you want to delete cart{" "}
              <span className="font-semibold text-slate-700">
                {cartToDelete.id}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setCartToDelete(null)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteCart}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCartOverview;