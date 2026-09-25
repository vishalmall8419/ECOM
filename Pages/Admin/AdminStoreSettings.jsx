
import { useEffect, useState } from "react";

import {
  Store,
  Settings,
  ShoppingCart,
  CreditCard,
  Truck,
  Bell,
  Save,
  RotateCcw,
  MapPin,
  Mail,
  Phone,
  Globe,
  IndianRupee,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";


const SETTINGS_KEY = "admin-store-settings";


const defaultSettings = {
  storeName: "VM Store",
  storeEmail: "support@vmstore.com",
  storePhone: "+91 9876543210",
  storeAddress: "Indore, Madhya Pradesh, India",
  storeDescription:
    "Your trusted online store for quality products.",
  storeUrl: "https://vmstore.vercel.app",
  currency: "INR",
  timezone: "Asia/Kolkata",

  isStoreOpen: true,
  maintenanceMode: false,

  minimumOrderAmount: 299,
  taxPercentage: 5,
  allowGuestCheckout: true,
  allowOrderCancellation: true,

  codEnabled: true,
  onlinePaymentEnabled: true,
  razorpayEnabled: false,

  shippingCharge: 49,
  freeShippingThreshold: 999,
  estimatedDelivery: "3-5 Business Days",

  emailOrderConfirmation: true,
  emailOrderStatus: true,
  lowStockNotification: true,
  newCustomerNotification: false,
};


const settingTabs = [
  {
    id: "general",
    label: "General",
    description: "Store information",
    icon: Store,
  },
  {
    id: "orders",
    label: "Orders",
    description: "Order preferences",
    icon: ShoppingCart,
  },
  {
    id: "payments",
    label: "Payments",
    description: "Payment methods",
    icon: CreditCard,
  },
  {
    id: "shipping",
    label: "Shipping",
    description: "Delivery settings",
    icon: Truck,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and emails",
    icon: Bell,
  },
];


const AdminStoreSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);

      return savedSettings
        ? {
            ...defaultSettings,
            ...JSON.parse(savedSettings),
          }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");


  useEffect(() => {
    if (!savedMessage) return;

    const timeout = setTimeout(() => {
      setSavedMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [savedMessage]);


  const updateSetting = (key, value) => {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [key]: value,
    }));
  };


  const handleSaveSettings = () => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings),
    );

    setSavedMessage("Settings saved successfully.");
  };


  const handleResetSettings = () => {
    const shouldReset = window.confirm(
      "Are you sure you want to reset all store settings?",
    );

    if (!shouldReset) return;

    setSettings(defaultSettings);

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(defaultSettings),
    );

    setSavedMessage("Settings reset successfully.");
  };


  const renderInput = ({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
    min,
    step,
    icon: Icon,
  }) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
          {label}
        </label>

        <div className="relative">
          {Icon && (
            <Icon
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D8D0B8]/50"
            />
          )}

          <input
            type={type}
            value={value}
            min={min}
            step={step}
            placeholder={placeholder}
            onChange={(event) =>
              onChange(
                type === "number"
                  ? Number(event.target.value)
                  : event.target.value,
              )
            }
            className={`w-full rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8] outline-none transition focus:border-[#F3D45D] focus:ring-2 focus:ring-[#244838] ${
              Icon ? "pl-10" : ""
            }`}
          />
        </div>
      </div>
    );
  };


  const ToggleSetting = ({
    label,
    description,
    checked,
    onChange,
  }) => {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border border-[#6D5B3C]/40 p-4">
        <div>
          <p className="text-sm font-semibold text-[#FFF4D6]">
            {label}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#D8D0B8]/70">
            {description}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            checked ? "bg-[#F3D45D]" : "bg-[#6D5B3C]/60"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-[#18372A] shadow transition ${
              checked ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>
    );
  };


  const SectionHeader = ({ icon: Icon, title, description }) => {
    return (
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-xl bg-[#244838] p-3 text-[#F3D45D]">
          <Icon size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#FFF4D6]">
            {title}
          </h2>

          <p className="mt-1 text-sm text-[#D8D0B8]/70">
            {description}
          </p>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-[#102A20] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-[#F3D45D]">
              Admin Panel / Configuration
            </p>

            <h1 className="text-2xl font-bold text-[#FFF4D6] sm:text-3xl">
              Store Settings
            </h1>

            <p className="mt-2 text-sm text-[#D8D0B8]/70">
              Manage your store preferences and operational settings.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleResetSettings}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#6D5B3C]/40 bg-[#18372A] px-4 py-3 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]"
            >
              <RotateCcw size={17} />
              Reset
            </button>

            <button
              type="button"
              onClick={handleSaveSettings}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F3D45D] px-4 py-3 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45]"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </div>


        {/* Saved Message */}
        {savedMessage && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle size={18} />
            {savedMessage}
          </div>
        )}


        {/* Store Status */}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-xl p-3 ${
                settings.isStoreOpen
                  ? "bg-emerald-500/15 text-emerald-600"
                  : "bg-red-500/15 text-red-600"
              }`}
            >
              <Store size={21} />
            </div>

            <div>
              <h2 className="font-bold text-[#FFF4D6]">
                Store Status
              </h2>

              <p className="mt-1 text-sm text-[#D8D0B8]/70">
                {settings.isStoreOpen
                  ? "Your store is currently accepting customers."
                  : "Your store is currently closed."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              updateSetting(
                "isStoreOpen",
                !settings.isStoreOpen,
              )
            }
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              settings.isStoreOpen
                ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/30"
                : "bg-red-500/15 text-red-700 hover:bg-red-200"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                settings.isStoreOpen
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />

            {settings.isStoreOpen
              ? "Store Open"
              : "Store Closed"}
          </button>
        </div>


        {/* Settings Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="mb-3 flex items-center gap-2 px-3 py-3">
              <Settings
                size={19}
                className="text-[#F3D45D]"
              />

              <span className="font-bold text-[#FFF4D6]">
                Settings Menu
              </span>
            </div>

            <div className="space-y-1">
              {settingTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isActive
                        ? "bg-[#F3D45D] text-[#102A20]"
                        : "text-[#D8D0B8] hover:bg-[#244838]/50 hover:text-[#F3D45D]"
                    }`}
                  >
                    <Icon size={19} />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {tab.label}
                      </p>

                      <p
                        className={`mt-0.5 text-xs ${
                          isActive
                            ? "text-[#244838]"
                            : "text-[#D8D0B8]/50"
                        }`}
                      >
                        {tab.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>


          {/* Content */}
          <main className="min-w-0 rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">

            {/* General Settings */}
            {activeTab === "general" && (
              <div>
                <SectionHeader
                  icon={Store}
                  title="General Settings"
                  description="Update your store information and basic preferences."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {renderInput({
                    label: "Store Name",
                    value: settings.storeName,
                    onChange: (value) =>
                      updateSetting("storeName", value),
                    placeholder: "Enter store name",
                    icon: Store,
                  })}

                  {renderInput({
                    label: "Store Email",
                    value: settings.storeEmail,
                    onChange: (value) =>
                      updateSetting("storeEmail", value),
                    type: "email",
                    placeholder: "Enter store email",
                    icon: Mail,
                  })}

                  {renderInput({
                    label: "Store Phone",
                    value: settings.storePhone,
                    onChange: (value) =>
                      updateSetting("storePhone", value),
                    placeholder: "Enter phone number",
                    icon: Phone,
                  })}

                  {renderInput({
                    label: "Store Website",
                    value: settings.storeUrl,
                    onChange: (value) =>
                      updateSetting("storeUrl", value),
                    placeholder: "https://example.com",
                    icon: Globe,
                  })}

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                      Store Address
                    </label>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-3 top-3.5 text-[#D8D0B8]/50"
                      />

                      <textarea
                        rows={3}
                        value={settings.storeAddress}
                        onChange={(event) =>
                          updateSetting(
                            "storeAddress",
                            event.target.value,
                          )
                        }
                        placeholder="Enter store address"
                        className="w-full resize-none rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 py-3 pl-10 pr-4 text-sm text-[#D8D0B8] outline-none transition focus:border-[#F3D45D] focus:ring-2 focus:ring-[#244838]"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                      Store Description
                    </label>

                    <textarea
                      rows={4}
                      value={settings.storeDescription}
                      onChange={(event) =>
                        updateSetting(
                          "storeDescription",
                          event.target.value,
                        )
                      }
                      placeholder="Write a short description about your store"
                      className="w-full resize-none rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8] outline-none transition focus:border-[#F3D45D] focus:ring-2 focus:ring-[#244838]"
                    />
                  </div>

                  {renderInput({
                    label: "Currency",
                    value: settings.currency,
                    onChange: (value) =>
                      updateSetting("currency", value),
                    placeholder: "INR",
                    icon: IndianRupee,
                  })}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                      Timezone
                    </label>

                    <select
                      value={settings.timezone}
                      onChange={(event) =>
                        updateSetting(
                          "timezone",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8] outline-none focus:border-[#F3D45D] focus:ring-2 focus:ring-[#244838]"
                    >
                      <option value="Asia/Kolkata">
                        Asia/Kolkata (IST)
                      </option>

                      <option value="UTC">
                        UTC
                      </option>

                      <option value="Asia/Dubai">
                        Asia/Dubai
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <ToggleSetting
                    label="Store Availability"
                    description="Allow customers to browse and place orders."
                    checked={settings.isStoreOpen}
                    onChange={(value) =>
                      updateSetting("isStoreOpen", value)
                    }
                  />

                  <ToggleSetting
                    label="Maintenance Mode"
                    description="Temporarily show a maintenance message to customers."
                    checked={settings.maintenanceMode}
                    onChange={(value) =>
                      updateSetting("maintenanceMode", value)
                    }
                  />
                </div>
              </div>
            )}


            {/* Order Settings */}
            {activeTab === "orders" && (
              <div>
                <SectionHeader
                  icon={ShoppingCart}
                  title="Order Settings"
                  description="Configure your store's order-related preferences."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {renderInput({
                    label: "Minimum Order Amount",
                    value: settings.minimumOrderAmount,
                    onChange: (value) =>
                      updateSetting(
                        "minimumOrderAmount",
                        value,
                      ),
                    type: "number",
                    min: 0,
                    icon: IndianRupee,
                  })}

                  {renderInput({
                    label: "Tax Percentage",
                    value: settings.taxPercentage,
                    onChange: (value) =>
                      updateSetting(
                        "taxPercentage",
                        value,
                      ),
                    type: "number",
                    min: 0,
                    step: 0.5,
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  <ToggleSetting
                    label="Allow Guest Checkout"
                    description="Allow customers to place orders without creating an account."
                    checked={settings.allowGuestCheckout}
                    onChange={(value) =>
                      updateSetting(
                        "allowGuestCheckout",
                        value,
                      )
                    }
                  />

                  <ToggleSetting
                    label="Allow Order Cancellation"
                    description="Allow customers to cancel eligible orders."
                    checked={settings.allowOrderCancellation}
                    onChange={(value) =>
                      updateSetting(
                        "allowOrderCancellation",
                        value,
                      )
                    }
                  />
                </div>

                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <AlertCircle
                      size={19}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <p className="text-sm leading-6 text-blue-700">
                      Order settings will affect the checkout
                      flow after backend validation is implemented.
                    </p>
                  </div>
                </div>
              </div>
            )}


            {/* Payment Settings */}
            {activeTab === "payments" && (
              <div>
                <SectionHeader
                  icon={CreditCard}
                  title="Payment Settings"
                  description="Configure available payment methods for customers."
                />

                <div className="space-y-3">
                  <ToggleSetting
                    label="Cash on Delivery"
                    description="Allow customers to pay when their order is delivered."
                    checked={settings.codEnabled}
                    onChange={(value) =>
                      updateSetting("codEnabled", value)
                    }
                  />

                  <ToggleSetting
                    label="Online Payments"
                    description="Allow customers to pay through online payment methods."
                    checked={settings.onlinePaymentEnabled}
                    onChange={(value) =>
                      updateSetting(
                        "onlinePaymentEnabled",
                        value,
                      )
                    }
                  />

                  <ToggleSetting
                    label="Razorpay"
                    description="Enable Razorpay integration after configuring the backend."
                    checked={settings.razorpayEnabled}
                    onChange={(value) =>
                      updateSetting(
                        "razorpayEnabled",
                        value,
                      )
                    }
                  />
                </div>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-500/10 p-4">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />

                    <p className="text-sm leading-6 text-amber-700">
                      Payment gateway activation requires secure
                      server-side configuration. Do not expose
                      secret keys in frontend code.
                    </p>
                  </div>
                </div>
              </div>
            )}


            {/* Shipping Settings */}
            {activeTab === "shipping" && (
              <div>
                <SectionHeader
                  icon={Truck}
                  title="Shipping Settings"
                  description="Configure delivery charges and estimated delivery time."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {renderInput({
                    label: "Shipping Charge",
                    value: settings.shippingCharge,
                    onChange: (value) =>
                      updateSetting(
                        "shippingCharge",
                        value,
                      ),
                    type: "number",
                    min: 0,
                    icon: IndianRupee,
                  })}

                  {renderInput({
                    label: "Free Shipping Threshold",
                    value: settings.freeShippingThreshold,
                    onChange: (value) =>
                      updateSetting(
                        "freeShippingThreshold",
                        value,
                      ),
                    type: "number",
                    min: 0,
                    icon: IndianRupee,
                  })}

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-[#D8D0B8]">
                      Estimated Delivery
                    </label>

                    <select
                      value={settings.estimatedDelivery}
                      onChange={(event) =>
                        updateSetting(
                          "estimatedDelivery",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8] outline-none focus:border-[#F3D45D] focus:ring-2 focus:ring-[#244838]"
                    >
                      <option value="1-2 Business Days">
                        1-2 Business Days
                      </option>

                      <option value="3-5 Business Days">
                        3-5 Business Days
                      </option>

                      <option value="5-7 Business Days">
                        5-7 Business Days
                      </option>

                      <option value="7-10 Business Days">
                        7-10 Business Days
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-[#244838]/60 p-4">
                  <div className="flex items-start gap-3">
                    <Truck
                      size={19}
                      className="mt-0.5 text-[#F3D45D]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#FFF4D6]">
                        Shipping Preview
                      </p>

                      <p className="mt-1 text-sm leading-6 text-[#D8D0B8]/70">
                        Customers will receive free shipping
                        on orders above{" "}
                        <span className="font-semibold text-[#D8D0B8]">
                          ₹
                          {settings.freeShippingThreshold.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                        . Otherwise, shipping charges will be{" "}
                        <span className="font-semibold text-[#D8D0B8]">
                          ₹
                          {settings.shippingCharge.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div>
                <SectionHeader
                  icon={Bell}
                  title="Notification Settings"
                  description="Manage customer and admin notification preferences."
                />

                <div className="space-y-3">
                  <ToggleSetting
                    label="Order Confirmation Email"
                    description="Send an email when a new order is successfully placed."
                    checked={settings.emailOrderConfirmation}
                    onChange={(value) =>
                      updateSetting(
                        "emailOrderConfirmation",
                        value,
                      )
                    }
                  />

                  <ToggleSetting
                    label="Order Status Updates"
                    description="Send customers updates when their order status changes."
                    checked={settings.emailOrderStatus}
                    onChange={(value) =>
                      updateSetting(
                        "emailOrderStatus",
                        value,
                      )
                    }
                  />

                  <ToggleSetting
                    label="Low Stock Notification"
                    description="Notify admin when product stock becomes low."
                    checked={settings.lowStockNotification}
                    onChange={(value) =>
                      updateSetting(
                        "lowStockNotification",
                        value,
                      )
                    }
                  />

                  <ToggleSetting
                    label="New Customer Notification"
                    description="Notify admin when a new customer registers."
                    checked={settings.newCustomerNotification}
                    onChange={(value) =>
                      updateSetting(
                        "newCustomerNotification",
                        value,
                      )
                    }
                  />
                </div>

                <div className="mt-6 rounded-xl border border-[#6D5B3C]/50 bg-[#244838]/50 p-4">
                  <div className="flex gap-3">
                    <Bell
                      size={19}
                      className="mt-0.5 shrink-0 text-[#F3D45D]"
                    />

                    <p className="text-sm leading-6 text-[#DDBB45]">
                      Email and notification delivery requires
                      backend integration with an email or
                      notification service.
                    </p>
                  </div>
                </div>
              </div>
            )}


            {/* Bottom Save Buttons */}
            <div className="mt-8 flex flex-col justify-end gap-3 border-t border-[#6D5B3C]/40 pt-6 sm:flex-row">
              <button
                type="button"
                onClick={handleResetSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#6D5B3C]/40 px-5 py-3 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]"
              >
                <RotateCcw size={17} />
                Reset Settings
              </button>

              <button
                type="button"
                onClick={handleSaveSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F3D45D] px-5 py-3 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45]"
              >
                <Save size={17} />
                Save Settings
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminStoreSettings;