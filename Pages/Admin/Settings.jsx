
import { useEffect, useState } from "react";

import {
  Settings as SettingsIcon,
  User,
  Bell,
  ShieldCheck,
  Palette,
  Globe,
  Save,
  RotateCcw,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Lock,
  Mail,
  Smartphone,
  AlertCircle,
} from "lucide-react";


const SETTINGS_KEY = "admin-general-settings";


const defaultSettings = {
  language: "English",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",
  theme: "light",
  compactMode: false,
  emailNotifications: true,
  pushNotifications: true,
  orderNotifications: true,
  customerNotifications: true,
  promotionalNotifications: false,
  twoFactorAuthentication: false,
  loginAlerts: true,
  sessionTimeout: "30",
  maintenanceMode: false,
  debugMode: false,
};


const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_KEY);

      return storedSettings
        ? {
            ...defaultSettings,
            ...JSON.parse(storedSettings),
          }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [saved, setSaved] = useState(false);


  // Save settings
  const handleSaveSettings = () => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings),
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };


  // Reset settings
  const handleResetSettings = () => {
    const shouldReset = window.confirm(
      "Are you sure you want to reset all settings?",
    );

    if (!shouldReset) return;

    setSettings(defaultSettings);
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(defaultSettings),
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };


  // Update setting
  const updateSetting = (key, value) => {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [key]: value,
    }));

    setSaved(false);
  };


  // Toggle component
  const Toggle = ({ name, label, description }) => {
    return (
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            {label}
          </p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={settings[name]}
          onClick={() =>
            updateSetting(name, !settings[name])
          }
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            settings[name]
              ? "bg-indigo-600"
              : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
              settings[name]
                ? "left-6"
                : "left-1"
            }`}
          />
        </button>
      </div>
    );
  };


  // Input styles
  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100";


  // Sidebar items
  const tabs = [
    {
      id: "general",
      label: "General",
      icon: SettingsIcon,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
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
    {
      id: "system",
      label: "System",
      icon: Globe,
    },
  ];


  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-indigo-600">
              Admin Panel / Preferences
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your admin panel preferences and system settings.
            </p>
          </div>

          {saved && (
            <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <CheckCircle size={17} />
              Settings saved
            </div>
          )}
        </div>


        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 px-3 py-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Settings Menu
              </p>
            </div>

            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}

            <div className="mt-5 rounded-xl bg-indigo-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck
                  size={18}
                  className="text-indigo-600"
                />

                <p className="text-sm font-bold text-indigo-900">
                  Admin Settings
                </p>
              </div>

              <p className="text-xs leading-5 text-indigo-700">
                Changes made here are saved locally in this frontend demo.
              </p>
            </div>
          </aside>


          {/* Content */}
          <main className="min-w-0">

            {/* General Settings */}
            {activeTab === "general" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                    <SettingsIcon size={20} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      General Settings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Configure basic application preferences.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>
                    <label
                      htmlFor="language"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Language
                    </label>

                    <select
                      id="language"
                      value={settings.language}
                      onChange={(event) =>
                        updateSetting(
                          "language",
                          event.target.value,
                        )
                      }
                      className={inputClass}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>


                  <div>
                    <label
                      htmlFor="timezone"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Timezone
                    </label>

                    <select
                      id="timezone"
                      value={settings.timezone}
                      onChange={(event) =>
                        updateSetting(
                          "timezone",
                          event.target.value,
                        )
                      }
                      className={inputClass}
                    >
                      <option value="Asia/Kolkata">
                        India - Kolkata
                      </option>

                      <option value="UTC">
                        UTC
                      </option>

                      <option value="America/New_York">
                        America - New York
                      </option>

                      <option value="Europe/London">
                        Europe - London
                      </option>
                    </select>
                  </div>


                  <div>
                    <label
                      htmlFor="dateFormat"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Date Format
                    </label>

                    <select
                      id="dateFormat"
                      value={settings.dateFormat}
                      onChange={(event) =>
                        updateSetting(
                          "dateFormat",
                          event.target.value,
                        )
                      }
                      className={inputClass}
                    >
                      <option value="DD/MM/YYYY">
                        DD/MM/YYYY
                      </option>

                      <option value="MM/DD/YYYY">
                        MM/DD/YYYY
                      </option>

                      <option value="YYYY-MM-DD">
                        YYYY-MM-DD
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-2">
                  <Toggle
                    name="compactMode"
                    label="Compact Mode"
                    description="Use a more compact layout for tables and admin panels."
                  />
                </div>
              </section>
            )}


            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                    <Palette size={20} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Appearance
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Customize the appearance of your admin panel.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Theme
                  </p>

                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {[
                      {
                        value: "light",
                        label: "Light",
                        icon: Sun,
                      },
                      {
                        value: "dark",
                        label: "Dark",
                        icon: Moon,
                      },
                      {
                        value: "system",
                        label: "System",
                        icon: Monitor,
                      },
                    ].map((theme) => {
                      const Icon = theme.icon;

                      const isSelected =
                        settings.theme === theme.value;

                      return (
                        <button
                          key={theme.value}
                          type="button"
                          onClick={() =>
                            updateSetting(
                              "theme",
                              theme.value,
                            )
                          }
                          className={`flex items-center justify-center gap-3 rounded-xl border-2 px-4 py-5 text-sm font-semibold transition ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                              : "border-slate-200 text-slate-600 hover:border-indigo-200"
                          }`}
                        >
                          <Icon size={19} />
                          {theme.label}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    Theme selection is stored locally. Actual dark mode
                    styling must be connected to your Tailwind theme.
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-2">
                  <Toggle
                    name="compactMode"
                    label="Compact Layout"
                    description="Reduce spacing in tables and dashboard components."
                  />
                </div>
              </section>
            )}


            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                    <Bell size={20} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Notification Settings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Control which notifications you receive.
                    </p>
                  </div>
                </div>

                <Toggle
                  name="emailNotifications"
                  label="Email Notifications"
                  description="Receive important admin notifications through email."
                />

                <Toggle
                  name="pushNotifications"
                  label="Push Notifications"
                  description="Allow browser push notifications for important updates."
                />

                <Toggle
                  name="orderNotifications"
                  label="Order Notifications"
                  description="Get notified when a new order is placed or updated."
                />

                <Toggle
                  name="customerNotifications"
                  label="Customer Notifications"
                  description="Receive alerts for customer registrations and enquiries."
                />

                <Toggle
                  name="promotionalNotifications"
                  label="Promotional Notifications"
                  description="Receive promotional and marketing-related notifications."
                />
              </section>
            )}


            {/* Security Settings */}
            {activeTab === "security" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Security Settings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage account protection and login preferences.
                    </p>
                  </div>
                </div>

                <Toggle
                  name="twoFactorAuthentication"
                  label="Two-Factor Authentication"
                  description="Add an additional verification step during login."
                />

                <Toggle
                  name="loginAlerts"
                  label="Login Alerts"
                  description="Receive alerts when a new login is detected."
                />

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <label
                    htmlFor="sessionTimeout"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Session Timeout
                  </label>

                  <select
                    id="sessionTimeout"
                    value={settings.sessionTimeout}
                    onChange={(event) =>
                      updateSetting(
                        "sessionTimeout",
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="120">2 hours</option>
                  </select>

                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-amber-700">
                    <AlertCircle
                      size={17}
                      className="mt-0.5 shrink-0"
                    />

                    <p className="text-xs leading-5">
                      Session timeout requires backend authentication
                      and session management to work securely.
                    </p>
                  </div>
                </div>
              </section>
            )}


            {/* System Settings */}
            {activeTab === "system" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                    <Globe size={20} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      System Settings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage application-level system preferences.
                    </p>
                  </div>
                </div>

                <Toggle
                  name="maintenanceMode"
                  label="Maintenance Mode"
                  description="Show a maintenance message to customers when enabled."
                />

                <Toggle
                  name="debugMode"
                  label="Debug Mode"
                  description="Enable additional debugging information during development."
                />

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />

                    <div>
                      <h3 className="text-sm font-bold text-amber-800">
                        Important
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        Maintenance mode and debug mode are currently
                        frontend settings. Connect them to your backend
                        before using them in production.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}


            {/* Action Buttons */}
            <div className="mt-6 flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleResetSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                <RotateCcw size={17} />
                Reset Settings
              </button>

              <button
                type="button"
                onClick={handleSaveSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;