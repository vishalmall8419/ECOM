import { useMemo, useState } from "react";

import {
  Users,
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  UserCheck,
  UserX,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

import { Link } from "react-router-dom";

/* ============================================
   SAMPLE CUSTOMER DATA
============================================ */

const initialCustomers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 9876543210",
    city: "Indore",
    state: "Madhya Pradesh",
    address: "Vijay Nagar, Indore",
    orders: 12,
    totalSpent: 18500,
    status: "Active",
    joinedDate: "2026-08-12",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@gmail.com",
    phone: "+91 8765432109",
    city: "Bhopal",
    state: "Madhya Pradesh",
    address: "MP Nagar, Bhopal",
    orders: 8,
    totalSpent: 12400,
    status: "Active",
    joinedDate: "2026-07-28",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@gmail.com",
    phone: "+91 9988776655",
    city: "Ahmedabad",
    state: "Gujarat",
    address: "Navrangpura, Ahmedabad",
    orders: 4,
    totalSpent: 6800,
    status: "Inactive",
    joinedDate: "2026-06-15",
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha.singh@gmail.com",
    phone: "+91 9123456780",
    city: "Lucknow",
    state: "Uttar Pradesh",
    address: "Gomti Nagar, Lucknow",
    orders: 15,
    totalSpent: 24600,
    status: "Active",
    joinedDate: "2026-05-21",
  },
  {
    id: 5,
    name: "Vishal Kumar",
    email: "vishal.kumar@gmail.com",
    phone: "+91 9090909090",
    city: "Delhi",
    state: "Delhi",
    address: "Rohini, Delhi",
    orders: 0,
    totalSpent: 0,
    status: "Inactive",
    joinedDate: "2026-08-30",
  },
  {
    id: 6,
    name: "Anjali Gupta",
    email: "anjali.gupta@gmail.com",
    phone: "+91 8899776655",
    city: "Jaipur",
    state: "Rajasthan",
    address: "Malviya Nagar, Jaipur",
    orders: 10,
    totalSpent: 15900,
    status: "Active",
    joinedDate: "2026-04-18",
  },
  {
    id: 7,
    name: "Rohit Yadav",
    email: "rohit.yadav@gmail.com",
    phone: "+91 7788990011",
    city: "Kanpur",
    state: "Uttar Pradesh",
    address: "Kalyanpur, Kanpur",
    orders: 6,
    totalSpent: 9200,
    status: "Active",
    joinedDate: "2026-03-10",
  },
  {
    id: 8,
    name: "Pooja Mehta",
    email: "pooja.mehta@gmail.com",
    phone: "+91 8877665544",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Andheri West, Mumbai",
    orders: 2,
    totalSpent: 3400,
    status: "Inactive",
    joinedDate: "2026-08-05",
  },
];

/* ============================================
   HELPER FUNCTIONS
============================================ */

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

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

/* ============================================
   ADMIN CUSTOMERS COMPONENT
============================================ */

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(initialCustomers);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showFilters, setShowFilters] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 5;

  /* ============================================
     SUMMARY DATA
  ============================================ */

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive",
  ).length;

  const totalRevenue = customers.reduce(
    (total, customer) => total + Number(customer.totalSpent || 0),
    0,
  );

  /* ============================================
     FILTER CUSTOMERS
  ============================================ */

  const filteredCustomers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue) ||
        customer.phone.toLowerCase().includes(searchValue) ||
        customer.city.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  /* ============================================
     PAGINATION
  ============================================ */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / customersPerPage),
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedCustomers = filteredCustomers.slice(
    (safePage - 1) * customersPerPage,
    safePage * customersPerPage,
  );

  /* ============================================
     HANDLERS
  ============================================ */

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Status");
    setCurrentPage(1);
  };

  const handleDeleteCustomer = () => {
    if (!customerToDelete) return;

    setCustomers((previousCustomers) =>
      previousCustomers.filter(
        (customer) => customer.id !== customerToDelete.id,
      ),
    );

    if (selectedCustomer?.id === customerToDelete.id) {
      setSelectedCustomer(null);
    }

    setCustomerToDelete(null);
  };

  const handleToggleStatus = (customerId) => {
    setCustomers((previousCustomers) =>
      previousCustomers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              status: customer.status === "Active" ? "Inactive" : "Active",
            }
          : customer,
      ),
    );
  };

  /* ============================================
     RENDER
  ============================================ */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Link
                to="/dashboard"
                className="transition hover:text-indigo-600"
              >
                Admin Dashboard
              </Link>

              <span>/</span>

              <span className="text-gray-700">Customers</span>
            </div>

            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              <Users size={30} className="text-indigo-600" />
              Customers
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your customers and their shopping activity.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* ========================================
            SUMMARY CARDS
        ======================================== */}

        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Customers */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {totalCustomers}
                </h2>
              </div>

              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Users size={22} />
              </div>
            </div>
          </div>

          {/* Active Customers */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Customers</p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {activeCustomers}
                </h2>
              </div>

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <UserCheck size={22} />
              </div>
            </div>
          </div>

          {/* Inactive Customers */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive Customers</p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {inactiveCustomers}
                </h2>
              </div>

              <div className="rounded-xl bg-red-100 p-3 text-red-600">
                <UserX size={22} />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Customer Revenue</p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {formatCurrency(totalRevenue)}
                </h2>
              </div>

              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <ShoppingBag size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            CUSTOMER TABLE CARD
        ======================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="border-b border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search name, email, phone..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters((previous) => !previous)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    showFilters
                      ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600"
                  }`}
                >
                  <Filter size={17} />
                  Filters
                </button>

                <span className="text-sm text-gray-500">
                  {filteredCustomers.length} Customers
                </span>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="max-w-sm">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Customer Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) => handleStatusChange(event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500"
                  >
                    <option value="All Status">All Status</option>

                    <option value="Active">Active</option>

                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
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
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Customer</th>

                  <th className="px-5 py-4 font-semibold">Contact</th>

                  <th className="px-5 py-4 font-semibold">Location</th>

                  <th className="px-5 py-4 font-semibold">Orders</th>

                  <th className="px-5 py-4 font-semibold">Total Spent</th>

                  <th className="px-5 py-4 font-semibold">Status</th>

                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="transition hover:bg-gray-50">
                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                          {getInitials(customer.name)}
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {customer.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            ID: #{customer.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">{customer.email}</p>

                      <p className="mt-1 text-xs text-gray-400">
                        {customer.phone}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-700">
                        {customer.city}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {customer.state}
                      </p>
                    </td>

                    {/* Orders */}
                    <td className="px-5 py-4 text-sm font-semibold text-gray-700">
                      {customer.orders}
                    </td>

                    {/* Total Spent */}
                    <td className="px-5 py-4 text-sm font-bold text-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(customer.id)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {customer.status}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(customer)}
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                          title="View Customer"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            window.alert(`More options for ${customer.name}`)
                          }
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          title="More Options"
                        >
                          <MoreVertical size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setCustomerToDelete(customer)}
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete Customer"
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
          {paginatedCustomers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Users size={30} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                No Customers Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filter.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredCustomers.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {(safePage - 1) * customersPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-700">
                  {Math.min(
                    safePage * customersPerPage,
                    filteredCustomers.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {filteredCustomers.length}
                </span>{" "}
                customers
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage((previous) => previous - 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                        ? "bg-indigo-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setCurrentPage((previous) => previous + 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
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
          CUSTOMER DETAILS MODAL
      ============================================ */}

      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Customer Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Customer Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                {getInitials(selectedCustomer.name)}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedCustomer.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Customer #{selectedCustomer.id}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    selectedCustomer.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedCustomer.status}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={19} className="mt-0.5 text-gray-400" />

                <div>
                  <p className="text-xs text-gray-400">Email</p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={19} className="mt-0.5 text-gray-400" />

                <div>
                  <p className="text-xs text-gray-400">Phone</p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {selectedCustomer.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 text-gray-400" />

                <div>
                  <p className="text-xs text-gray-400">Address</p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {selectedCustomer.address}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {selectedCustomer.city}, {selectedCustomer.state}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShoppingBag size={19} className="mt-0.5 text-gray-400" />

                <div>
                  <p className="text-xs text-gray-400">Total Orders</p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {selectedCustomer.orders} Orders
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserPlus size={19} className="mt-0.5 text-gray-400" />

                <div>
                  <p className="text-xs text-gray-400">Joined Date</p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {formatDate(selectedCustomer.joinedDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Revenue Summary */}
            <div className="mt-6 rounded-xl bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Total Customer Spending</p>

              <h3 className="mt-1 text-2xl font-bold text-indigo-700">
                {formatCurrency(selectedCustomer.totalSpent)}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCustomer(null)}
              className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* ============================================
          DELETE CONFIRMATION MODAL
      ============================================ */}

      {customerToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Trash2 size={21} />
              </div>

              <button
                type="button"
                onClick={() => setCustomerToDelete(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Delete Customer?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                {customerToDelete.name}
              </span>
              ? This action cannot be undone in this frontend demo.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCustomerToDelete(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteCustomer}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
