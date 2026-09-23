
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Info,
  ArrowLeft,
  MailOpen,
  Inbox,
} from "lucide-react";
import { Link } from "react-router-dom";

const NOTIFICATION_KEY = "user-notifications";

const defaultNotifications = [
  {
    id: 1,
    type: "order",
    title: "Order Confirmed",
    message:
      "Your order has been confirmed successfully. We will update you when it is shipped.",
    time: "Today, 10:30 AM",
    read: false,
  },
  {
    id: 2,
    type: "offer",
    title: "Special Offer for You",
    message:
      "Get exciting discounts on selected products. Explore the latest offers now.",
    time: "Today, 09:15 AM",
    read: false,
  },
  {
    id: 3,
    type: "security",
    title: "Account Security",
    message:
      "Your account information is secure. Please keep your password private.",
    time: "Yesterday, 06:45 PM",
    read: true,
  },
  {
    id: 4,
    type: "delivery",
    title: "Delivery Update",
    message:
      "Your recent order is being prepared for delivery.",
    time: "Yesterday, 02:20 PM",
    read: true,
  },
  {
    id: 5,
    type: "system",
    title: "Welcome to Our Store",
    message:
      "Thank you for joining us. Explore products and enjoy your shopping experience.",
    time: "20 Sep, 11:00 AM",
    read: true,
  },
];

const getNotificationIcon = (type) => {
  const iconProps = {
    size: 20,
  };

  switch (type) {
    case "order":
      return <ShoppingBag {...iconProps} />;

    case "offer":
      return <Tag {...iconProps} />;

    case "security":
      return <ShieldCheck {...iconProps} />;

    case "delivery":
      return <Inbox {...iconProps} />;

    default:
      return <Info {...iconProps} />;
  }
};

const getNotificationStyle = (type) => {
  switch (type) {
    case "order":
      return "bg-blue-100 text-blue-600";

    case "offer":
      return "bg-purple-100 text-purple-600";

    case "security":
      return "bg-green-100 text-green-600";

    case "delivery":
      return "bg-orange-100 text-orange-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Notification = () => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const savedNotifications = localStorage.getItem(NOTIFICATION_KEY);

      return savedNotifications
        ? JSON.parse(savedNotifications)
        : defaultNotifications;
    } catch {
      return defaultNotifications;
    }
  });

  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(
      NOTIFICATION_KEY,
      JSON.stringify(notifications),
    );
  }, [notifications]);

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) => !notification.read,
    ).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "unread") {
      return notifications.filter(
        (notification) => !notification.read,
      );
    }

    if (activeFilter === "read") {
      return notifications.filter(
        (notification) => notification.read,
      );
    }

    return notifications;
  }, [notifications, activeFilter]);

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const markAsUnread = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: false }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id),
    );
  };

  const clearAllNotifications = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all notifications?",
    );

    if (confirmed) {
      setNotifications([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Link
                to="/dashboard"
                className="transition hover:text-indigo-600"
              >
                Dashboard
              </Link>

              <span>/</span>

              <span className="text-gray-700">
                Notifications
              </span>
            </div>

            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              <Bell className="text-indigo-600" size={30} />
              Notifications
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Stay updated with your latest account and order activities.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>
        </div>

        {/* Summary Card */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Notifications
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {notifications.length}
                </h2>
              </div>

              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Bell size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Unread Notifications
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {unreadCount}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <MailOpen size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Container */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-lg font-bold text-gray-900">
                Your Notifications
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-indigo-200 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <CheckCheck size={15} />
                  Mark All Read
                </button>

                <button
                  type="button"
                  onClick={clearAllNotifications}
                  disabled={notifications.length === 0}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={15} />
                  Clear All
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All", value: "all" },
                { label: "Unread", value: "unread" },
                { label: "Read", value: "read" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeFilter === filter.value
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {filter.label}

                  {filter.value === "unread" && (
                    <span className="ml-1">
                      ({unreadCount})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-5 text-gray-400">
                <Bell size={35} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                No Notifications Found
              </h3>

              <p className="mt-2 max-w-sm text-sm text-gray-500">
                You are all caught up. New notifications will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`group rounded-xl border p-4 transition ${
                    notification.read
                      ? "border-gray-100 bg-white"
                      : "border-indigo-100 bg-indigo-50/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getNotificationStyle(
                        notification.type,
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-900">
                            {notification.title}
                          </h3>

                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-indigo-600" />
                          )}
                        </div>

                        <span className="shrink-0 text-xs text-gray-400">
                          {notification.time}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {notification.message}
                      </p>

                      {/* Actions */}
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        {notification.read ? (
                          <button
                            type="button"
                            onClick={() =>
                              markAsUnread(notification.id)
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            <MailOpen size={14} />
                            Mark as Unread
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            <Check size={14} />
                            Mark as Read
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            deleteNotification(notification.id)
                          }
                          className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;