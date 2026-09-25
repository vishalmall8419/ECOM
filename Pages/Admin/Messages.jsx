
import { useMemo, useState } from "react";

import {
  Search,
  MessageSquare,
  Mail,
  MailOpen,
  Reply,
  Trash2,
  Eye,
  X,
  User,
  Phone,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";


// Demo messages
const initialMessages = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    subject: "Order delivery delay",
    message:
      "Hello, my order was supposed to arrive yesterday, but I have not received it yet. Please check the delivery status.",
    date: "Today, 10:30 AM",
    status: "Unread",
    priority: "High",
    category: "Order",
    orderId: "ORD-1001",
    reply: "",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "+91 9876543211",
    subject: "Product availability",
    message:
      "I want to purchase the premium basmati rice in bulk. Is the product currently available?",
    date: "Today, 09:15 AM",
    status: "Read",
    priority: "Normal",
    category: "Product",
    orderId: "",
    reply: "",
  },
  {
    id: 3,
    name: "Amit Verma",
    email: "amit@gmail.com",
    phone: "+91 9876543212",
    subject: "Refund request",
    message:
      "I received a damaged product. I would like to request a refund. Please guide me through the process.",
    date: "Yesterday, 06:45 PM",
    status: "Unread",
    priority: "High",
    category: "Refund",
    orderId: "ORD-1003",
    reply: "",
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha@gmail.com",
    phone: "+91 9876543213",
    subject: "Payment confirmation",
    message:
      "The payment was deducted from my account, but I have not received an order confirmation.",
    date: "Yesterday, 03:20 PM",
    status: "Replied",
    priority: "High",
    category: "Payment",
    orderId: "ORD-1004",
    reply:
      "Hello Neha, we are checking your payment status. Our team will update you shortly.",
  },
  {
    id: 5,
    name: "Sandeep Yadav",
    email: "sandeep@gmail.com",
    phone: "+91 9876543214",
    subject: "Change delivery address",
    message:
      "I recently placed an order and want to change the delivery address. Please let me know if it is possible.",
    date: "Sep 20, 2026",
    status: "Read",
    priority: "Normal",
    category: "Order",
    orderId: "ORD-1005",
    reply: "",
  },
  {
    id: 6,
    name: "Pooja Gupta",
    email: "pooja@gmail.com",
    phone: "+91 9876543215",
    subject: "Website feedback",
    message:
      "The shopping experience was good. I would like to suggest adding more cosmetic products to the store.",
    date: "Sep 19, 2026",
    status: "Replied",
    priority: "Normal",
    category: "Feedback",
    orderId: "",
    reply:
      "Thank you for sharing your valuable feedback with us.",
  },
];


// Status style
const getStatusStyle = (status) => {
  const styles = {
    Unread: "bg-blue-100 text-blue-700",
    Read: "bg-[#244838] text-[#D8D0B8]",
    Replied: "bg-emerald-500/15 text-emerald-700",
  };

  return styles[status] || "bg-[#244838] text-[#D8D0B8]";
};


// Priority style
const getPriorityStyle = (priority) => {
  if (priority === "High") {
    return "bg-red-500/15 text-red-700";
  }

  return "bg-[#244838] text-[#D8D0B8]";
};


// Category style
const getCategoryStyle = (category) => {
  const styles = {
    Order: "bg-[#244838] text-[#DDBB45]",
    Product: "bg-purple-500/15 text-purple-700",
    Refund: "bg-red-500/15 text-red-700",
    Payment: "bg-orange-500/15 text-orange-700",
    Feedback: "bg-emerald-500/15 text-emerald-700",
  };

  return styles[category] || "bg-[#244838] text-[#D8D0B8]";
};


// Format message initials
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};


const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const [replyText, setReplyText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;


  // Summary
  const summary = useMemo(() => {
    return {
      total: messages.length,

      unread: messages.filter(
        (message) => message.status === "Unread",
      ).length,

      read: messages.filter(
        (message) => message.status === "Read",
      ).length,

      replied: messages.filter(
        (message) => message.status === "Replied",
      ).length,
    };
  }, [messages]);


  // Search and filter
  const filteredMessages = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return messages.filter((message) => {
      const matchesSearch =
        message.name.toLowerCase().includes(searchValue) ||
        message.email.toLowerCase().includes(searchValue) ||
        message.subject.toLowerCase().includes(searchValue) ||
        message.category.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        message.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [messages, search, statusFilter]);


  // Pagination
  const totalPages = Math.ceil(
    filteredMessages.length / itemsPerPage,
  );

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );


  // Open message
  const handleOpenMessage = (message) => {
    const updatedMessage = {
      ...message,
      status:
        message.status === "Unread"
          ? "Read"
          : message.status,
    };

    setMessages((previousMessages) =>
      previousMessages.map((item) =>
        item.id === message.id ? updatedMessage : item,
      ),
    );

    setSelectedMessage(updatedMessage);
    setReplyText(updatedMessage.reply || "");
  };


  // Mark as read/unread
  const handleToggleReadStatus = (messageId) => {
    setMessages((previousMessages) =>
      previousMessages.map((message) => {
        if (message.id !== messageId) return message;

        return {
          ...message,
          status:
            message.status === "Unread"
              ? "Read"
              : "Unread",
        };
      }),
    );

    setSelectedMessage((previousMessage) => {
      if (!previousMessage || previousMessage.id !== messageId) {
        return previousMessage;
      }

      return {
        ...previousMessage,
        status:
          previousMessage.status === "Unread"
            ? "Read"
            : "Unread",
      };
    });
  };


  // Send reply
  const handleSendReply = () => {
    const trimmedReply = replyText.trim();

    if (!selectedMessage || !trimmedReply) return;

    const updatedMessage = {
      ...selectedMessage,
      reply: trimmedReply,
      status: "Replied",
    };

    setMessages((previousMessages) =>
      previousMessages.map((message) =>
        message.id === selectedMessage.id
          ? updatedMessage
          : message,
      ),
    );

    setSelectedMessage(updatedMessage);
    setReplyText("");
  };


  // Delete message
  const handleDeleteMessage = () => {
    if (!messageToDelete) return;

    setMessages((previousMessages) =>
      previousMessages.filter(
        (message) => message.id !== messageToDelete.id,
      ),
    );

    if (selectedMessage?.id === messageToDelete.id) {
      setSelectedMessage(null);
    }

    setMessageToDelete(null);
  };


  // Search change
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };


  // Filter change
  const handleFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };


  return (
    <div className="min-h-screen bg-[#102A20] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-[#F3D45D]">
              Admin Panel / Customer Support
            </p>

            <h1 className="text-2xl font-bold text-[#FFF4D6] sm:text-3xl">
              Messages
            </h1>

            <p className="mt-2 text-sm text-[#D8D0B8]/70">
              Manage customer enquiries and support messages.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-3 shadow-sm">
            <MessageSquare
              size={20}
              className="text-[#F3D45D]"
            />

            <span className="text-sm font-semibold text-[#D8D0B8]">
              {summary.unread} Unread Messages
            </span>
          </div>
        </div>


        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-[#244838] p-3 text-[#F3D45D]">
                <MessageSquare size={21} />
              </div>

              <span className="text-xs text-[#D8D0B8]/50">
                Total
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#FFF4D6]">
              {summary.total}
            </h2>

            <p className="mt-1 text-sm text-[#D8D0B8]/70">
              All customer messages
            </p>
          </div>


          {/* Unread */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Mail size={21} />
              </div>

              <span className="text-xs text-[#D8D0B8]/50">
                Pending
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#FFF4D6]">
              {summary.unread}
            </h2>

            <p className="mt-1 text-sm text-[#D8D0B8]/70">
              Unread messages
            </p>
          </div>


          {/* Read */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-[#244838] p-3 text-[#D8D0B8]">
                <MailOpen size={21} />
              </div>

              <span className="text-xs text-[#D8D0B8]/50">
                Reviewed
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#FFF4D6]">
              {summary.read}
            </h2>

            <p className="mt-1 text-sm text-[#D8D0B8]/70">
              Read messages
            </p>
          </div>


          {/* Replied */}
          <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-600">
                <Reply size={21} />
              </div>

              <span className="text-xs text-[#D8D0B8]/50">
                Completed
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#FFF4D6]">
              {summary.replied}
            </h2>

            <p className="mt-1 text-sm text-[#D8D0B8]/70">
              Replied messages
            </p>
          </div>
        </div>


        {/* Messages Card */}
        <div className="overflow-hidden rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] shadow-sm transition-shadow duration-200 hover:shadow-md">

          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-[#6D5B3C]/40 p-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D8D0B8]/50"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder="Search name, email or subject..."
                className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 py-3 pl-10 pr-4 text-sm text-[#D8D0B8] outline-none transition focus:border-[#F3D45D] focus:ring-2 focus:ring-[#244838]"
              />
            </div>


            {/* Filter */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="message-status"
                className="text-sm font-medium text-[#D8D0B8]"
              >
                Status:
              </label>

              <select
                id="message-status"
                value={statusFilter}
                onChange={(event) =>
                  handleFilterChange(event.target.value)
                }
                className="rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8] outline-none focus:border-[#F3D45D] focus:ring-2 focus:ring-[#244838]"
              >
                <option value="All">All Messages</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
                <option value="Replied">Replied</option>
              </select>
            </div>
          </div>


          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-[#244838]/60">
                <tr className="border-b border-[#6D5B3C]/40">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#D8D0B8]/70">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#D8D0B8]/70">
                    Subject
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#D8D0B8]/70">
                    Category
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#D8D0B8]/70">
                    Priority
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#D8D0B8]/70">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#D8D0B8]/70">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#D8D0B8]/70">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#244838]">
                {paginatedMessages.length > 0 ? (
                  paginatedMessages.map((message) => (
                    <tr
                      key={message.id}
                      className={`transition hover:bg-[#244838]/60 ${
                        message.status === "Unread"
                          ? "bg-blue-50/30"
                          : ""
                      }`}
                    >
                      {/* Customer */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#244838] text-sm font-bold text-[#DDBB45]">
                            {getInitials(message.name)}
                          </div>

                          <div>
                            <p className="font-semibold text-[#FFF4D6]">
                              {message.name}
                            </p>

                            <p className="mt-1 text-xs text-[#D8D0B8]/70">
                              {message.email}
                            </p>
                          </div>
                        </div>
                      </td>


                      {/* Subject */}
                      <td className="max-w-[250px] px-5 py-5">
                        <p className="truncate font-semibold text-[#FFF4D6]">
                          {message.subject}
                        </p>

                        <p className="mt-1 line-clamp-1 text-xs text-[#D8D0B8]/70">
                          {message.message}
                        </p>
                      </td>


                      {/* Category */}
                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getCategoryStyle(
                            message.category,
                          )}`}
                        >
                          {message.category}
                        </span>
                      </td>


                      {/* Priority */}
                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getPriorityStyle(
                            message.priority,
                          )}`}
                        >
                          {message.priority === "High" && (
                            <AlertCircle size={13} />
                          )}

                          {message.priority}
                        </span>
                      </td>


                      {/* Status */}
                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                            message.status,
                          )}`}
                        >
                          {message.status === "Unread" && (
                            <Mail size={13} />
                          )}

                          {message.status === "Read" && (
                            <MailOpen size={13} />
                          )}

                          {message.status === "Replied" && (
                            <CheckCircle size={13} />
                          )}

                          {message.status}
                        </span>
                      </td>


                      {/* Date */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-[#D8D0B8]/70">
                          <Clock size={15} />
                          {message.date}
                        </div>
                      </td>


                      {/* Actions */}
                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            title="View message"
                            onClick={() =>
                              handleOpenMessage(message)
                            }
                            className="rounded-lg border border-[#6D5B3C]/40 p-2 text-[#D8D0B8] transition hover:border-[#6D5B3C]/50 hover:bg-[#244838]/50 hover:text-[#F3D45D]"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            type="button"
                            title="Delete message"
                            onClick={() =>
                              setMessageToDelete(message)
                            }
                            className="rounded-lg border border-[#6D5B3C]/40 p-2 text-[#D8D0B8] transition hover:border-red-200 hover:bg-red-500/10 hover:text-red-600"
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
                      <MessageSquare
                        size={40}
                        className="mx-auto mb-3 text-[#6D5B3C]/60"
                      />

                      <h3 className="text-lg font-semibold text-[#D8D0B8]">
                        No messages found
                      </h3>

                      <p className="mt-1 text-sm text-[#D8D0B8]/70">
                        Try changing your search or status filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          {/* Pagination */}
          {filteredMessages.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-[#6D5B3C]/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#D8D0B8]/70">
                Showing{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredMessages.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#D8D0B8]">
                  {filteredMessages.length}
                </span>{" "}
                messages
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(page - 1, 1),
                    )
                  }
                  className="rounded-lg border border-[#6D5B3C]/40 p-2 text-[#D8D0B8] transition hover:bg-[#244838] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="rounded-lg bg-[#F3D45D] px-4 py-2 text-sm font-semibold text-[#102A20]">
                  {currentPage}
                </span>

                <button
                  type="button"
                  disabled={
                    currentPage === totalPages ||
                    totalPages === 0
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages),
                    )
                  }
                  className="rounded-lg border border-[#6D5B3C]/40 p-2 text-[#D8D0B8] transition hover:bg-[#244838] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A150F]/60 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#18372A] shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#6D5B3C]/40 bg-[#18372A] px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#FFF4D6]">
                  Message Details
                </h2>

                <p className="mt-1 text-xs text-[#D8D0B8]/70">
                  Customer enquiry
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg p-2 text-[#D8D0B8]/70 transition hover:bg-[#244838] hover:text-[#FFF4D6]"
              >
                <X size={20} />
              </button>
            </div>


            {/* Modal Body */}
            <div className="space-y-6 p-5">

              {/* Customer Information */}
              <div className="rounded-xl border border-[#6D5B3C]/40 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-bold text-[#FFF4D6]">
                    Customer Information
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      selectedMessage.status,
                    )}`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <User
                      size={17}
                      className="text-[#D8D0B8]/50"
                    />

                    <div>
                      <p className="text-xs text-[#D8D0B8]/50">
                        Name
                      </p>

                      <p className="text-sm font-semibold text-[#D8D0B8]">
                        {selectedMessage.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail
                      size={17}
                      className="text-[#D8D0B8]/50"
                    />

                    <div>
                      <p className="text-xs text-[#D8D0B8]/50">
                        Email
                      </p>

                      <p className="break-all text-sm font-semibold text-[#D8D0B8]">
                        {selectedMessage.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone
                      size={17}
                      className="text-[#D8D0B8]/50"
                    />

                    <div>
                      <p className="text-xs text-[#D8D0B8]/50">
                        Phone
                      </p>

                      <p className="text-sm font-semibold text-[#D8D0B8]">
                        {selectedMessage.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock
                      size={17}
                      className="text-[#D8D0B8]/50"
                    />

                    <div>
                      <p className="text-xs text-[#D8D0B8]/50">
                        Received
                      </p>

                      <p className="text-sm font-semibold text-[#D8D0B8]">
                        {selectedMessage.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Message */}
              <div className="rounded-xl border border-[#6D5B3C]/40 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold text-[#FFF4D6]">
                    {selectedMessage.subject}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getCategoryStyle(
                        selectedMessage.category,
                      )}`}
                    >
                      {selectedMessage.category}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getPriorityStyle(
                        selectedMessage.priority,
                      )}`}
                    >
                      {selectedMessage.priority}
                    </span>
                  </div>
                </div>

                <p className="whitespace-pre-wrap text-sm leading-7 text-[#D8D0B8]">
                  {selectedMessage.message}
                </p>

                {selectedMessage.orderId && (
                  <div className="mt-4 rounded-lg bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8]">
                    Related Order:{" "}
                    <span className="font-semibold text-[#FFF4D6]">
                      {selectedMessage.orderId}
                    </span>
                  </div>
                )}
              </div>


              {/* Previous Reply */}
              {selectedMessage.reply && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle
                      size={17}
                      className="text-emerald-600"
                    />

                    <h3 className="font-bold text-emerald-800">
                      Previous Reply
                    </h3>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-7 text-emerald-700">
                    {selectedMessage.reply}
                  </p>
                </div>
              )}


              {/* Reply Form */}
              <div className="rounded-xl border border-[#6D5B3C]/40 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Reply
                    size={18}
                    className="text-[#F3D45D]"
                  />

                  <h3 className="font-bold text-[#FFF4D6]">
                    Reply to Customer
                  </h3>
                </div>

                <textarea
                  rows={5}
                  value={replyText}
                  onChange={(event) =>
                    setReplyText(event.target.value)
                  }
                  placeholder="Write your reply..."
                  className="w-full resize-none rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 px-4 py-3 text-sm leading-6 text-[#D8D0B8] outline-none transition focus:border-[#F3D45D] focus:ring-2 focus:ring-[#244838]"
                />

                <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() =>
                      handleToggleReadStatus(selectedMessage.id)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#6D5B3C]/40 px-4 py-2.5 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]"
                  >
                    {selectedMessage.status === "Unread" ? (
                      <MailOpen size={16} />
                    ) : (
                      <Mail size={16} />
                    )}

                    {selectedMessage.status === "Unread"
                      ? "Mark as Read"
                      : "Mark as Unread"}
                  </button>

                  <button
                    type="button"
                    disabled={!replyText.trim()}
                    onClick={handleSendReply}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F3D45D] px-5 py-2.5 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send size={16} />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>


            {/* Modal Footer */}
            <div className="flex justify-between gap-3 border-t border-[#6D5B3C]/40 px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  setMessageToDelete(selectedMessage);
                  setSelectedMessage(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete
              </button>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-xl border border-[#6D5B3C]/40 px-5 py-2.5 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Delete Confirmation Modal */}
      {messageToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A150F]/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#18372A] p-6 shadow-2xl">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-600">
              <Trash2 size={24} />
            </div>

            <h2 className="text-center text-xl font-bold text-[#FFF4D6]">
              Delete Message?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-[#D8D0B8]/70">
              Are you sure you want to delete this message from{" "}
              <span className="font-semibold text-[#D8D0B8]">
                {messageToDelete.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setMessageToDelete(null)}
                className="flex-1 rounded-xl border border-[#6D5B3C]/40 px-4 py-3 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteMessage}
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

export default Messages;