
import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Lock,
  ShieldCheck,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("account");

  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    smsNotifications: true,
    twoFactorAuth: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleToggle = (field) => {
    setAccountSettings((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));

    setSaved(false);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem(
      "user-settings",
      JSON.stringify(accountSettings),
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    // Frontend-only demonstration
    alert("Password change request submitted.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const tabs = [
    {
      id: "account",
      label: "Account Settings",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      icon: ShieldCheck,
    },
  ];

  const ToggleSwitch = ({ enabled, onChange }) => {
    return (
      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          enabled ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-1" : "-translate-x-4.5"
          }`}
        />
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
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

              <span className="text-gray-700">Settings</span>
            </div>

            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              <Settings className="text-indigo-600" size={30} />
              Settings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your account preferences and security settings.
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

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="mb-4 border-b border-gray-100 px-3 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
                VM
              </div>

              <h2 className="mt-3 font-semibold text-gray-900">
                Account Settings
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Manage your account
              </p>
            </div>

            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            {/* Account Settings */}
            {activeTab === "account" && (
              <section>
                <div className="mb-6 border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    Account Settings
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your basic account preferences.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
                      <User size={20} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        Profile Information
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Update your name, email and personal information.
                      </p>

                      <Link
                        to="/dashboard/profile"
                        className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        Edit Profile →
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="rounded-lg bg-green-100 p-3 text-green-600">
                      <Mail size={20} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        Email Address
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        vishal@example.com
                      </p>

                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-green-600">
                        <CheckCircle size={14} />
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                      <Smartphone size={20} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        Mobile Number
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Add or update your mobile number from your profile.
                      </p>

                      <Link
                        to="/dashboard/profile"
                        className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        Manage Mobile Number →
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <section>
                <div className="mb-6 border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    Notification Settings
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Choose which notifications you want to receive.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Email Notifications
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Receive important updates through email.
                      </p>
                    </div>

                    <ToggleSwitch
                      enabled={accountSettings.emailNotifications}
                      onChange={() => handleToggle("emailNotifications")}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Order Updates
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Get updates about your order status.
                      </p>
                    </div>

                    <ToggleSwitch
                      enabled={accountSettings.orderUpdates}
                      onChange={() => handleToggle("orderUpdates")}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Promotional Emails
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Receive offers, discounts and promotional messages.
                      </p>
                    </div>

                    <ToggleSwitch
                      enabled={accountSettings.promotionalEmails}
                      onChange={() => handleToggle("promotionalEmails")}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        SMS Notifications
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Receive order-related updates through SMS.
                      </p>
                    </div>

                    <ToggleSwitch
                      enabled={accountSettings.smsNotifications}
                      onChange={() => handleToggle("smsNotifications")}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Save size={17} />
                  Save Preferences
                </button>
              </section>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <section>
                <div className="mb-6 border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    Security Settings
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Keep your account secure by managing your password.
                  </p>
                </div>

                <form
                  onSubmit={handleChangePassword}
                  className="max-w-xl space-y-5"
                >
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Current Password
                    </label>

                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword((previous) => !previous)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      New Password
                    </label>

                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowNewPassword((previous) => !previous)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Password must contain at least 8 characters.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Confirm New Password
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((previous) => !previous)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <Lock size={17} />
                    Change Password
                  </button>
                </form>

                <div className="mt-8 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-yellow-600"
                  />

                  <div>
                    <h3 className="font-semibold text-yellow-800">
                      Security Notice
                    </h3>

                    <p className="mt-1 text-sm text-yellow-700">
                      This is a frontend-only password form. Real password
                      updates require a secure backend and authentication
                      system.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Success Message */}
            {saved && (
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                <CheckCircle size={18} />
                Settings saved successfully.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;