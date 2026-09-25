
import { useState } from "react";

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CalendarDays,
  Edit3,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Activity,
  ShoppingBag,
  Users,
  MessageSquare,
  KeyRound,
} from "lucide-react";


const initialProfile = {
  firstName: "Vishal",
  lastName: "Mall",
  email: "admin@example.com",
  phone: "+91 9876543210",
  role: "Super Admin",
  gender: "Male",
  dateOfBirth: "",
  address: "Indore, Madhya Pradesh",
  city: "Indore",
  state: "Madhya Pradesh",
  pincode: "452001",
  joinedDate: "January 15, 2026",
};


const AdminProfile = () => {
  const [profile, setProfile] = useState(initialProfile);

  const [editProfile, setEditProfile] = useState(initialProfile);

  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState("profile");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordError, setPasswordError] = useState("");


  // Admin initials
  const adminInitials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();


  // Edit profile
  const handleEditProfile = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };


  // Cancel profile edit
  const handleCancelEdit = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };


  // Input change
  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setEditProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };


  // Save profile
  const handleSaveProfile = (event) => {
    event.preventDefault();

    setProfile(editProfile);
    setIsEditing(false);
  };


  // Password input change
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setPasswordMessage("");
    setPasswordError("");
  };


  // Change password
  const handleChangePassword = (event) => {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "New password must contain at least 8 characters.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New password and confirm password do not match.",
      );
      return;
    }

    // Demo only:
    // Real password change requires backend authentication.
    setPasswordMessage(
      "Password form validated. Connect your backend API to update the password.",
    );

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };


  // Reusable input class
  const inputClass =
    "mt-2 w-full rounded-xl border border-[#6D5B3C]/40 bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8] outline-none transition focus:border-[#F3D45D] focus:bg-[#18372A] focus:ring-2 focus:ring-[#244838] disabled:cursor-not-allowed disabled:opacity-70";


  // Password field component
  const PasswordField = ({
    label,
    name,
    value,
    visible,
    setVisible,
  }) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="text-sm font-semibold text-[#D8D0B8]"
        >
          {label}
        </label>

        <div className="relative">
          <input
            id={name}
            name={name}
            type={visible ? "text" : "password"}
            value={value}
            onChange={handlePasswordChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className={`${inputClass} pr-12`}
          />

          <button
            type="button"
            onClick={() => setVisible((previous) => !previous)}
            className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 rounded-lg p-1.5 text-[#D8D0B8]/50 transition hover:bg-[#244838] hover:text-[#D8D0B8]"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-[#102A20] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-[#F3D45D]">
              Admin Panel / Account
            </p>

            <h1 className="text-2xl font-bold text-[#FFF4D6] sm:text-3xl">
              Admin Profile
            </h1>

            <p className="mt-2 text-sm text-[#D8D0B8]/70">
              Manage your personal information and account security.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle size={17} />
            Account Active
          </div>
        </div>


        {/* Profile Hero */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="h-32 bg-gradient-to-r from-[#F3D45D] via-violet-600 to-purple-700 sm:h-40" />

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-[#244838] text-3xl font-bold text-[#DDBB45] shadow-lg">
                  {adminInitials}
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold text-[#FFF4D6]">
                    {profile.firstName} {profile.lastName}
                  </h2>

                  <p className="mt-1 text-sm text-[#D8D0B8]/70">
                    {profile.email}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#244838] px-3 py-1 text-xs font-semibold text-[#DDBB45]">
                      {profile.role}
                    </span>

                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Active
                    </span>
                  </div>
                </div>
              </div>


              {!isEditing && activeTab === "profile" && (
                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F3D45D] px-5 py-3 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45]"
                >
                  <Edit3 size={17} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>


        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <button
              type="button"
              onClick={() => {
                setActiveTab("profile");
                setIsEditing(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeTab === "profile"
                  ? "bg-[#F3D45D] text-[#102A20]"
                  : "text-[#D8D0B8] hover:bg-[#244838]"
              }`}
            >
              <User size={18} />
              Profile Information
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("security");
                setIsEditing(false);
              }}
              className={`mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeTab === "security"
                  ? "bg-[#F3D45D] text-[#102A20]"
                  : "text-[#D8D0B8] hover:bg-[#244838]"
              }`}
            >
              <Lock size={18} />
              Security
            </button>

            <div className="my-4 border-t border-[#244838]" />

            <div className="rounded-xl bg-[#244838]/60 p-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck
                  size={18}
                  className="text-[#F3D45D]"
                />

                <p className="text-sm font-bold text-[#FFF4D6]">
                  Admin Access
                </p>
              </div>

              <p className="text-xs leading-5 text-[#D8D0B8]/70">
                Your account has administrative access to manage
                store operations.
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle size={14} />
                Verified Account
              </div>
            </div>
          </aside>


          {/* Content */}
          <main>

            {/* Profile Information */}
            {activeTab === "profile" && (
              <div className="space-y-6">

                <form
                  onSubmit={handleSaveProfile}
                  className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7"
                >
                  <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="text-xl font-bold text-[#FFF4D6]">
                        Personal Information
                      </h2>

                      <p className="mt-1 text-sm text-[#D8D0B8]/70">
                        Update your basic account information.
                      </p>
                    </div>

                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#6D5B3C]/40 px-4 py-2.5 text-sm font-semibold text-[#D8D0B8] transition hover:bg-[#244838]"
                        >
                          <X size={16} />
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#F3D45D] px-4 py-2.5 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45]"
                        >
                          <Save size={16} />
                          Save
                        </button>
                      </div>
                    )}
                  </div>


                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="text-sm font-semibold text-[#D8D0B8]"
                      >
                        First Name
                      </label>

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={
                          isEditing
                            ? editProfile.firstName
                            : profile.firstName
                        }
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className={inputClass}
                        required
                      />
                    </div>


                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="text-sm font-semibold text-[#D8D0B8]"
                      >
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={
                          isEditing
                            ? editProfile.lastName
                            : profile.lastName
                        }
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className={inputClass}
                        required
                      />
                    </div>


                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-[#D8D0B8]"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail
                          size={17}
                          className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-[#D8D0B8]/50"
                        />

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={
                            isEditing
                              ? editProfile.email
                              : profile.email
                          }
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`${inputClass} pl-10`}
                          required
                        />
                      </div>
                    </div>


                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-sm font-semibold text-[#D8D0B8]"
                      >
                        Phone Number
                      </label>

                      <div className="relative">
                        <Phone
                          size={17}
                          className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 text-[#D8D0B8]/50"
                        />

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={
                            isEditing
                              ? editProfile.phone
                              : profile.phone
                          }
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>


                    {/* Gender */}
                    <div>
                      <label
                        htmlFor="gender"
                        className="text-sm font-semibold text-[#D8D0B8]"
                      >
                        Gender
                      </label>

                      <select
                        id="gender"
                        name="gender"
                        value={
                          isEditing
                            ? editProfile.gender
                            : profile.gender
                        }
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className={inputClass}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>


                    {/* Date of Birth */}
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="text-sm font-semibold text-[#D8D0B8]"
                      >
                        Date of Birth
                      </label>

                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={
                          isEditing
                            ? editProfile.dateOfBirth
                            : profile.dateOfBirth
                        }
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </form>


                {/* Address Information */}
                <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-[#244838] p-3 text-[#F3D45D]">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-[#FFF4D6]">
                        Address Information
                      </h2>

                      <p className="mt-1 text-sm text-[#D8D0B8]/70">
                        Your registered address details.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-[#D8D0B8]">
                        Address
                      </label>

                      <div className="mt-2 rounded-xl bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8]">
                        {profile.address || "Not available"}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-[#D8D0B8]">
                        City
                      </label>

                      <div className="mt-2 rounded-xl bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8]">
                        {profile.city || "Not available"}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-[#D8D0B8]">
                        State
                      </label>

                      <div className="mt-2 rounded-xl bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8]">
                        {profile.state || "Not available"}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-[#D8D0B8]">
                        Pincode
                      </label>

                      <div className="mt-2 rounded-xl bg-[#244838]/60 px-4 py-3 text-sm text-[#D8D0B8]">
                        {profile.pincode || "Not available"}
                      </div>
                    </div>
                  </div>
                </div>


                {/* Account Overview */}
                <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-600">
                      <Activity size={20} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-[#FFF4D6]">
                        Account Overview
                      </h2>

                      <p className="mt-1 text-sm text-[#D8D0B8]/70">
                        Basic account activity summary.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-xl bg-[#244838]/60 p-4">
                      <ShoppingBag
                        size={20}
                        className="mb-3 text-[#F3D45D]"
                      />

                      <p className="text-2xl font-bold text-[#FFF4D6]">
                        248
                      </p>

                      <p className="mt-1 text-xs text-[#D8D0B8]/70">
                        Orders Managed
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#244838]/60 p-4">
                      <Users
                        size={20}
                        className="mb-3 text-purple-600"
                      />

                      <p className="text-2xl font-bold text-[#FFF4D6]">
                        1,248
                      </p>

                      <p className="mt-1 text-xs text-[#D8D0B8]/70">
                        Customers
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#244838]/60 p-4">
                      <MessageSquare
                        size={20}
                        className="mb-3 text-emerald-600"
                      />

                      <p className="text-2xl font-bold text-[#FFF4D6]">
                        86
                      </p>

                      <p className="mt-1 text-xs text-[#D8D0B8]/70">
                        Messages Handled
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm text-[#D8D0B8]/70">
                    <CalendarDays size={16} />

                    Joined on {profile.joinedDate}
                  </div>
                </div>
              </div>
            )}


            {/* Security */}
            {activeTab === "security" && (
              <div className="space-y-6">

                <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-[#244838] p-3 text-[#F3D45D]">
                      <KeyRound size={20} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-[#FFF4D6]">
                        Change Password
                      </h2>

                      <p className="mt-1 text-sm text-[#D8D0B8]/70">
                        Keep your admin account secure with a strong password.
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleChangePassword}
                    className="space-y-5"
                  >
                    <PasswordField
                      label="Current Password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      visible={showCurrentPassword}
                      setVisible={setShowCurrentPassword}
                    />

                    <PasswordField
                      label="New Password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      visible={showNewPassword}
                      setVisible={setShowNewPassword}
                    />

                    <PasswordField
                      label="Confirm Password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      visible={showConfirmPassword}
                      setVisible={setShowConfirmPassword}
                    />

                    {passwordError && (
                      <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700">
                        {passwordError}
                      </div>
                    )}

                    {passwordMessage && (
                      <div className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700">
                        {passwordMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F3D45D] px-5 py-3 text-sm font-semibold text-[#102A20] transition hover:bg-[#DDBB45]"
                    >
                      <Lock size={17} />
                      Update Password
                    </button>
                  </form>
                </div>


                {/* Security Status */}
                <div className="rounded-2xl border border-[#6D5B3C]/40 bg-[#18372A] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-600">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-[#FFF4D6]">
                        Security Status
                      </h2>

                      <p className="mt-1 text-sm text-[#D8D0B8]/70">
                        Current security information.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 border-b border-[#244838] pb-4">
                      <div>
                        <p className="text-sm font-semibold text-[#D8D0B8]">
                          Account Verification
                        </p>

                        <p className="mt-1 text-xs text-[#D8D0B8]/70">
                          Your admin account verification status.
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        Verified
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-[#244838] pb-4">
                      <div>
                        <p className="text-sm font-semibold text-[#D8D0B8]">
                          Account Status
                        </p>

                        <p className="mt-1 text-xs text-[#D8D0B8]/70">
                          Your account is currently active.
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#D8D0B8]">
                          Two-Factor Authentication
                        </p>

                        <p className="mt-1 text-xs text-[#D8D0B8]/70">
                          Connect your authentication system to enable 2FA.
                        </p>
                      </div>

                      <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700">
                        Not Configured
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;