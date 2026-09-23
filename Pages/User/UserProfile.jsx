import { useState } from "react";

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Pencil,
  Save,
  X,
  ArrowLeft,
  ShoppingBag,
  Heart,
  CheckCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Vishal",
    lastName: "Mall",
    email: "vishal@example.com",
    phone: "+91 00000 00000",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    city: "Indore",
    state: "Madhya Pradesh",
    pincode: "",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    setProfile(formData);
    setIsEditing(false);
  };

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim();

  const initials =
    `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`
      .toUpperCase();

  return (
    <main className="min-h-screen bg-[#F1E8DF] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            {/* Breadcrumb */}
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
              <Link
                to="/"
                className="transition hover:text-[#8B5E3C]"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                to="/dashboard"
                className="transition hover:text-[#8B5E3C]"
              >
                Dashboard
              </Link>

              <span>/</span>

              <span>Profile</span>
            </div>

            <h1 className="text-2xl font-bold text-[#2D2926] sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your personal information and account details.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#D8C7BA] bg-white px-4 py-3 text-sm font-semibold text-[#2D2926] transition hover:bg-[#F8F3EF]"
          >
            <ArrowLeft size={17} />

            Back to Dashboard
          </Link>
        </div>

        {/* Profile Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          {/* Profile Sidebar */}
          <aside className="h-fit rounded-3xl border border-[#E7DCD2] bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#2D2926] text-3xl font-bold text-white shadow-lg">
                {initials || <UserRound size={40} />}
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#2D2926]">
                {fullName || "Your Name"}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {profile.email}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                <CheckCircle size={14} />

                Active Account
              </div>
            </div>

            <div className="my-6 border-t border-[#E7DCD2]" />

            {/* Account Links */}
            <div className="space-y-2">
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 rounded-xl bg-[#F8F3EF] px-4 py-3 text-sm font-semibold text-[#8B5E3C]"
              >
                <UserRound size={18} />

                My Profile
              </Link>

              <Link
                to="/dashboard/orders"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#F8F3EF] hover:text-[#8B5E3C]"
              >
                <ShoppingBag size={18} />

                My Orders
              </Link>

              <Link
                to="/dashboard/wishlist"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#F8F3EF] hover:text-[#8B5E3C]"
              >
                <Heart size={18} />

                My Wishlist
              </Link>
            </div>

            <div className="mt-6 rounded-2xl bg-[#F8F3EF] p-4">
              <div className="flex items-center gap-2 text-[#8B5E3C]">
                <ShieldCheck size={18} />

                <p className="text-sm font-semibold">
                  Account Security
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Keep your account information updated for a better
                shopping experience.
              </p>
            </div>
          </aside>

          {/* Main Profile Content */}
          <section className="rounded-3xl border border-[#E7DCD2] bg-white p-5 shadow-sm sm:p-7">
            {/* Section Header */}
            <div className="flex flex-col justify-between gap-4 border-b border-[#E7DCD2] pb-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-[#2D2926]">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your details whenever you need.
                </p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2D2926] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4A403A]"
                >
                  <Pencil size={16} />

                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Form */}
            <form
              onSubmit={handleSave}
              className="mt-6"
            >
              {/* Basic Information */}
              <div>
                <h3 className="mb-4 text-base font-bold text-[#2D2926]">
                  Basic Details
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-semibold text-gray-600"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-semibold text-gray-600"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600"
                    >
                      <Mail size={15} />

                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600"
                    >
                      <Phone size={15} />

                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="mb-2 block text-sm font-semibold text-gray-600"
                    >
                      Gender
                    </label>

                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600"
                    >
                      <CalendarDays size={15} />

                      Date of Birth
                    </label>

                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="mt-8 border-t border-[#E7DCD2] pt-6">
                <h3 className="mb-4 text-base font-bold text-[#2D2926]">
                  Address Information
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600"
                    >
                      <MapPin size={15} />

                      Address
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={3}
                      placeholder="Enter your full address"
                      className="w-full resize-none rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition placeholder:text-gray-400 focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-gray-600"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-sm font-semibold text-gray-600"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label
                      htmlFor="pincode"
                      className="mb-2 block text-sm font-semibold text-gray-600"
                    >
                      Pincode
                    </label>

                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter pincode"
                      className="w-full rounded-xl border border-[#E7DCD2] bg-[#FAF8F6] px-4 py-3 text-sm text-[#2D2926] outline-none transition focus:border-[#8B5E3C] disabled:cursor-not-allowed disabled:opacity-80"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-[#E7DCD2] pt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#D8C7BA] px-5 py-3 text-sm font-semibold text-[#2D2926] transition hover:bg-[#F8F3EF]"
                  >
                    <X size={17} />

                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#2D2926] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4A403A]"
                  >
                    <Save size={17} />

                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;