"use client";

import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  Lock,
  MapPin,
  Package,
  Pencil,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  User,
  X,
  Trash2,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Address {
  id: number;
  user_id: number;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

interface AddressForm {
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

const EMPTY_ADDRESS: AddressForm = {
  full_name: "",
  phone: "",
  address_line: "",
  city: "",
  state: "",
  postal_code: "",
  country: "India",
  is_default: false,
};

export default function ProfilePage() {
  const { user, token, isLoading: authLoading, refreshUser } =
    useAuth();

  /* =========================
     PROFILE STATE
  ========================= */

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  /* =========================
     ADDRESS STATE
  ========================= */

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const [addressModal, setAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] =
    useState<number | null>(null);

  const [addressForm, setAddressForm] =
    useState<AddressForm>(EMPTY_ADDRESS);

  const [savingAddress, setSavingAddress] = useState(false);
  const [deletingAddressId, setDeletingAddressId] =
    useState<number | null>(null);

  /* =========================
     NOTIFICATIONS
  ========================= */

  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  /* =========================
     USER NAME
  ========================= */

  useEffect(() => {
    if (user) {
      setProfileName(user.name || "");
    }
  }, [user]);

  /* =========================
     LOAD ADDRESSES
  ========================= */

  useEffect(() => {
    if (!token || authLoading) {
      return;
    }

    loadAddresses();
  }, [token, authLoading]);

  const loadAddresses = async () => {
    if (!token) {
      console.error("Cannot load addresses: token missing");
      return;
    }

    setLoadingAddresses(true);

    try {
      console.log("Loading addresses...");

      const response = await fetch(
        `${API_URL}/users/me/addresses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      console.log(
        "GET /users/me/addresses:",
        response.status
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Address loading error:",
          errorText
        );

        throw new Error(
          `Failed to load addresses: ${response.status}`
        );
      }

      const data: Address[] = await response.json();

      console.log("Addresses loaded:", data);

      setAddresses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Failed to load addresses:",
        error
      );

      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

  /* =========================
     PROFILE SAVE
  ========================= */

  const saveProfile = async () => {
    if (!token) {
      console.error("Cannot save profile: token missing");
      alert("You are not logged in.");
      return;
    }

    const trimmedName = profileName.trim();

    if (!trimmedName) {
      alert("Please enter your name.");
      return;
    }

    setSavingProfile(true);

    try {
      console.log("Saving profile...");

      const response = await fetch(
        `${API_URL}/users/me`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
          }),
        }
      );

      console.log(
        "PATCH /users/me:",
        response.status
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Profile API error:",
          errorText
        );

        throw new Error(
          `Failed to update profile: ${response.status}`
        );
      }

      await refreshUser();

      setEditingProfile(false);

      alert("Profile updated successfully.");
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      alert(
        "Failed to update profile. Please try again."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  /* =========================
     OPEN ADD ADDRESS
  ========================= */

  const openAddAddress = () => {
    console.log("Opening Add Address");

    setEditingAddressId(null);

    setAddressForm({
      ...EMPTY_ADDRESS,
      full_name: user?.name || "",
    });

    setAddressModal(true);
  };

  /* =========================
     OPEN EDIT ADDRESS
  ========================= */

  const openEditAddress = (address: Address) => {
    console.log(
      "Opening Edit Address:",
      address.id
    );

    setEditingAddressId(address.id);

    setAddressForm({
      full_name: address.full_name || "",
      phone: address.phone || "",
      address_line: address.address_line || "",
      city: address.city || "",
      state: address.state || "",
      postal_code: address.postal_code || "",
      country: address.country || "India",
      is_default: Boolean(address.is_default),
    });

    setAddressModal(true);
  };

  /* =========================
     CLOSE ADDRESS MODAL
  ========================= */

  const closeAddressModal = () => {
    if (savingAddress) {
      return;
    }

    setAddressModal(false);
    setEditingAddressId(null);
    setAddressForm({
      ...EMPTY_ADDRESS,
    });
  };

  /* =========================
     VALIDATE ADDRESS
  ========================= */

  const validateAddress = () => {
    const requiredFields = [
      {
        value: addressForm.full_name,
        label: "Full name",
      },
      {
        value: addressForm.phone,
        label: "Phone",
      },
      {
        value: addressForm.address_line,
        label: "Address",
      },
      {
        value: addressForm.city,
        label: "City",
      },
      {
        value: addressForm.state,
        label: "State",
      },
      {
        value: addressForm.postal_code,
        label: "Postal code",
      },
      {
        value: addressForm.country,
        label: "Country",
      },
    ];

    for (const field of requiredFields) {
      if (!field.value.trim()) {
        alert(`${field.label} is required.`);
        return false;
      }
    }

    if (!/^\d{10}$/.test(addressForm.phone.trim())) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!/^\d{6}$/.test(addressForm.postal_code.trim())) {
      alert("Please enter a valid 6-digit postal code.");
      return false;
    }

    return true;
  };

  /* =========================
     SAVE / UPDATE ADDRESS
  ========================= */

  const saveAddress = async () => {
    console.log("=================================");
    console.log("SAVE ADDRESS BUTTON CLICKED");
    console.log("Token exists:", Boolean(token));
    console.log(
      "Editing address ID:",
      editingAddressId
    );
    console.log(
      "Address form:",
      addressForm
    );
    console.log("API URL:", API_URL);
    console.log("=================================");

    if (!token) {
      console.error(
        "Cannot save address: token missing"
      );

      alert(
        "Your login session has expired. Please login again."
      );

      return;
    }

    if (!validateAddress()) {
      return;
    }

    setSavingAddress(true);

    try {
      const isEditing =
        editingAddressId !== null;

      const url = isEditing
        ? `${API_URL}/users/me/addresses/${editingAddressId}`
        : `${API_URL}/users/me/addresses`;

      const method = isEditing
        ? "PATCH"
        : "POST";

      console.log("Address request:");
      console.log("Method:", method);
      console.log("URL:", url);
      console.log(
        "Body:",
        JSON.stringify(addressForm)
      );

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name:
            addressForm.full_name.trim(),

          phone:
            addressForm.phone.trim(),

          address_line:
            addressForm.address_line.trim(),

          city:
            addressForm.city.trim(),

          state:
            addressForm.state.trim(),

          postal_code:
            addressForm.postal_code.trim(),

          country:
            addressForm.country.trim(),

          is_default:
            Boolean(addressForm.is_default),
        }),
      });

      console.log(
        "Address API response:",
        response.status,
        response.statusText
      );

      const responseText =
        await response.text();

      console.log(
        "Address API response body:",
        responseText
      );

      if (!response.ok) {
        throw new Error(
          responseText ||
            `Request failed with status ${response.status}`
        );
      }

      console.log(
        isEditing
          ? "Address updated successfully"
          : "Address created successfully"
      );

      await loadAddresses();

      setAddressModal(false);
      setEditingAddressId(null);
      setAddressForm({
        ...EMPTY_ADDRESS,
      });

      alert(
        isEditing
          ? "Address updated successfully."
          : "Address saved successfully."
      );
    } catch (error) {
      console.error(
        "SAVE ADDRESS ERROR:",
        error
      );

      alert(
        `Failed to ${
          editingAddressId !== null
            ? "update"
            : "save"
        } address.\n\n${
          error instanceof Error
            ? error.message
            : "Unknown error"
        }`
      );
    } finally {
      setSavingAddress(false);
    }
  };

  /* =========================
     DELETE ADDRESS
  ========================= */

  const deleteAddress = async (
    addressId: number
  ) => {
    if (!token) {
      alert(
        "Your login session has expired."
      );
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this address?"
      );

    if (!confirmed) {
      return;
    }

    setDeletingAddressId(addressId);

    try {
      console.log(
        "Deleting address:",
        addressId
      );

      const response = await fetch(
        `${API_URL}/users/me/addresses/${addressId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log(
        "DELETE address response:",
        response.status
      );

      const responseText =
        await response.text();

      console.log(
        "DELETE response body:",
        responseText
      );

      if (!response.ok) {
        throw new Error(
          responseText ||
            `Failed with status ${response.status}`
        );
      }

      await loadAddresses();

      alert(
        "Address deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete address:",
        error
      );

      alert(
        `Failed to delete address.\n\n${
          error instanceof Error
            ? error.message
            : "Unknown error"
        }`
      );
    } finally {
      setDeletingAddressId(null);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (authLoading) {
    return (
      <main className="min-h-screen bg-black pt-32 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-10 text-center">
            <p className="text-sm text-white/40">
              Loading your profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     MAIN PAGE
  ========================= */

  return (
    <main className="min-h-screen bg-black pb-28 pt-24 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.025] p-7 md:p-12">

          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.04, 0.1, 0.04],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
            className="absolute left-[-150px] top-[-180px] h-[450px] w-[450px] rounded-full bg-white blur-[150px]"
          />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_300px]">

            <div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-white/25">
                <Sparkles size={11} />
                Customer account
              </div>

              <div className="mt-7 flex items-center gap-5">

                <motion.div
                  whileHover={{
                    rotateY: 18,
                    scale: 1.05,
                  }}
                  className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-3xl font-black text-black shadow-[0_25px_70px_rgba(255,255,255,.12)]"
                  style={{
                    transformStyle:
                      "preserve-3d",
                  }}
                >
                  {(user?.name || "S")
                    .charAt(0)
                    .toUpperCase()}
                </motion.div>

                <div>

                  <h1 className="text-4xl font-black md:text-5xl">
                    {user?.name || "Customer"}
                  </h1>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                    Premium customer
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[9px] text-white/30">
                    <ShieldCheck size={12} />
                    Verified account
                  </div>

                </div>

              </div>

              <p className="mt-7 max-w-xl text-sm leading-7 text-white/30">
                Manage your personal information,
                orders, addresses, payments and
                marketplace preferences from one
                place.
              </p>

              <div className="mt-8 flex flex-wrap gap-7">

                <Stat
                  value="12"
                  label="Orders"
                  icon={<Package size={11} />}
                />

                <Stat
                  value="8"
                  label="Wishlist"
                  icon={<Heart size={11} />}
                />

                <Stat
                  value="4"
                  label="Reviews"
                  icon={<Star size={11} />}
                />

              </div>

            </div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 18, -18, 0],
                rotateZ: [0, 3, -3, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="mx-auto flex h-56 w-56 items-center justify-center rounded-[4rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_rgba(255,255,255,.08)]"
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >

              <div
                className="flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-white text-6xl font-black text-black"
                style={{
                  transform:
                    "translateZ(45px)",
                }}
              >
                {(user?.name || "S")
                  .charAt(0)
                  .toUpperCase()}
              </div>

            </motion.div>

          </div>
        </section>

        {/* ACCOUNT GRID */}

        <section className="mt-10 grid gap-4 lg:grid-cols-2">

          {/* PERSONAL INFORMATION */}

          <ProfileCard
            icon={<User size={17} />}
            title="Personal information"
            description="Name, email and account details"
          >

            <InfoRow
              label="Full name"
              value={
                user?.name ||
                "Not available"
              }
            />

            <InfoRow
              label="Email"
              value={
                user?.email ||
                "Not available"
              }
            />

            <InfoRow
              label="Account"
              value={
                user?.role ||
                "customer"
              }
            />

            <button
              type="button"
              onClick={() => {
                setProfileName(
                  user?.name || ""
                );
                setEditingProfile(true);
              }}
              className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/35 transition hover:bg-white hover:text-black"
            >
              <Pencil size={11} />
              Edit information
            </button>

          </ProfileCard>

          {/* ADDRESSES */}

          <ProfileCard
            icon={<MapPin size={17} />}
            title="Saved addresses"
            description="Manage your delivery locations"
          >

            {loadingAddresses ? (
              <p className="text-[10px] text-white/30">
                Loading addresses...
              </p>
            ) : addresses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">

                <MapPin
                  size={22}
                  className="mx-auto text-white/20"
                />

                <p className="mt-3 text-[10px] text-white/30">
                  No saved addresses
                </p>

                <button
                  type="button"
                  onClick={openAddAddress}
                  className="mt-4 rounded-xl bg-white px-4 py-3 text-[9px] font-bold text-black transition hover:bg-white/80"
                >
                  Add your first address
                </button>

              </div>
            ) : (
              <>
                {addresses.map(
                  (address) => (
                    <Address
                      key={address.id}
                      address={address}
                      onEdit={() =>
                        openEditAddress(
                          address
                        )
                      }
                      onDelete={() =>
                        deleteAddress(
                          address.id
                        )
                      }
                      deleting={
                        deletingAddressId ===
                        address.id
                      }
                    />
                  )
                )}
              </>
            )}

            <button
              type="button"
              onClick={openAddAddress}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-[9px] text-white/25 transition hover:border-white/25 hover:text-white"
            >
              <Plus size={12} />
              Add new address
            </button>

          </ProfileCard>

        </section>

        {/* QUICK ACTIONS */}

        <section className="mt-10">

          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            Account shortcuts
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Manage account
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <ActionCard
              href="/orders"
              icon={<Package size={18} />}
              title="Orders"
              text="Track purchases"
            />

            <ActionCard
              href="/wishlist"
              icon={<Heart size={18} />}
              title="Wishlist"
              text="Saved products"
            />

            <ActionCard
              href="/cart"
              icon={<ShoppingBag size={18} />}
              title="Cart"
              text="Items waiting"
            />

            <ActionCard
              href="/reviews"
              icon={<Star size={18} />}
              title="Reviews"
              text="Your feedback"
            />

          </div>

        </section>

        {/* PAYMENT + SECURITY */}

        <section className="mt-10 grid gap-4 lg:grid-cols-2">

          <ProfileCard
            icon={<CreditCard size={17} />}
            title="Payment methods"
            description="Manage saved payment options"
          >

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-white text-[8px] font-black text-black">
                    VISA
                  </div>

                  <div>

                    <p className="text-xs font-semibold">
                      •••• 4821
                    </p>

                    <p className="mt-1 text-[8px] text-white/20">
                      Primary card
                    </p>

                  </div>

                </div>

                <ShieldCheck
                  size={15}
                  className="text-white/30"
                />

              </div>

            </div>

            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-dashed border-white/10 py-3 text-[9px] text-white/25 hover:text-white"
            >
              + Add payment method
            </button>

          </ProfileCard>

          <ProfileCard
            icon={<Lock size={17} />}
            title="Security"
            description="Protect your Vendora account"
          >

            <SettingRow
              title="Two-factor authentication"
              text="Add another layer of security"
              action={
                <Toggle enabled={true} />
              }
            />

            <SettingRow
              title="Login alerts"
              text="Get notified about new logins"
              action={
                <Toggle enabled={true} />
              }
            />

            <button
              type="button"
              className="mt-4 flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/30 hover:bg-white/10 hover:text-white"
            >
              Change password
              <ChevronRight size={12} />
            </button>

          </ProfileCard>

        </section>

        {/* NOTIFICATIONS */}

        <section className="mt-10">

          <ProfileCard
            icon={<Bell size={17} />}
            title="Notifications"
            description="Control how Vendora communicates with you"
          >

            <SettingRow
              title="Order notifications"
              text="Shipping, delivery and order updates"
              action={
                <Toggle
                  enabled={
                    notifications
                  }
                  onClick={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                />
              }
            />

            <SettingRow
              title="Promotional notifications"
              text="Offers, discounts and new launches"
              action={
                <Toggle
                  enabled={
                    marketing
                  }
                  onClick={() =>
                    setMarketing(
                      !marketing
                    )
                  }
                />
              }
            />

            <SettingRow
              title="Email notifications"
              text="Receive important updates by email"
              action={
                <Toggle enabled={true} />
              }
            />

          </ProfileCard>

        </section>

        {/* ACCOUNT FOOTER */}

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-bold">
                Account protection
              </p>

              <p className="mt-2 max-w-xl text-[9px] leading-5 text-white/20">
                Your account is protected with
                Vendora security systems and
                encrypted authentication.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] px-4 py-3 text-[9px] text-white/40">
              <ShieldCheck size={13} />
              Security status: Good
            </div>

          </div>

        </section>

      </div>

      {/* =========================
          PROFILE EDIT MODAL
      ========================= */}

      {editingProfile && (
        <Modal
          onClose={() =>
            setEditingProfile(false)
          }
        >

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-black">
                Edit personal information
              </h2>

              <p className="mt-1 text-[10px] text-white/30">
                Update your account name.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setEditingProfile(false)
              }
              className="rounded-lg p-2 text-white/30 hover:bg-white/10 hover:text-white"
              aria-label="Close profile editor"
            >
              <X size={18} />
            </button>

          </div>

          <FormInput
            id="profile-name"
            label="Full name"
            value={profileName}
            onChange={setProfileName}
            placeholder="Enter your name"
            required
          />

          <div className="mt-6 flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                setEditingProfile(false)
              }
              disabled={savingProfile}
              className="rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/40 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={saveProfile}
              disabled={savingProfile}
              className="rounded-xl bg-white px-5 py-3 text-[9px] font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingProfile
                ? "Saving..."
                : "Save changes"}
            </button>

          </div>

        </Modal>
      )}

      {/* =========================
          ADDRESS MODAL
      ========================= */}

      {addressModal && (
        <Modal
          onClose={closeAddressModal}
        >

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-black">
                {editingAddressId !== null
                  ? "Edit address"
                  : "Add new address"}
              </h2>

              <p className="mt-1 text-[10px] text-white/30">
                Enter your delivery information.
              </p>

            </div>

            <button
              type="button"
              onClick={closeAddressModal}
              disabled={savingAddress}
              className="rounded-lg p-2 text-white/30 hover:bg-white/10 hover:text-white disabled:opacity-50"
              aria-label="Close address editor"
            >
              <X size={18} />
            </button>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <FormInput
              id="address-full-name"
              label="Full name"
              value={
                addressForm.full_name
              }
              onChange={(value) =>
                setAddressForm(
                  (previous) => ({
                    ...previous,
                    full_name: value,
                  })
                )
              }
              placeholder="Sandesh Test"
              required
            />

            <FormInput
              id="address-phone"
              label="Phone"
              value={addressForm.phone}
              onChange={(value) =>
                setAddressForm(
                  (previous) => ({
                    ...previous,
                    phone: value,
                  })
                )
              }
              placeholder="9876543210"
              type="tel"
              required
            />

            <div className="sm:col-span-2">

              <FormInput
                id="address-line"
                label="Address"
                value={
                  addressForm.address_line
                }
                onChange={(value) =>
                  setAddressForm(
                    (previous) => ({
                      ...previous,
                      address_line: value,
                    })
                  )
                }
                placeholder="Street / Area / Locality"
                required
              />

            </div>

            <FormInput
              id="address-city"
              label="City"
              value={addressForm.city}
              onChange={(value) =>
                setAddressForm(
                  (previous) => ({
                    ...previous,
                    city: value,
                  })
                )
              }
              placeholder="Mangalore"
              required
            />

            <FormInput
              id="address-state"
              label="State"
              value={addressForm.state}
              onChange={(value) =>
                setAddressForm(
                  (previous) => ({
                    ...previous,
                    state: value,
                  })
                )
              }
              placeholder="Karnataka"
              required
            />

            <FormInput
              id="address-postal-code"
              label="Postal code"
              value={
                addressForm.postal_code
              }
              onChange={(value) =>
                setAddressForm(
                  (previous) => ({
                    ...previous,
                    postal_code: value,
                  })
                )
              }
              placeholder="575001"
              inputMode="numeric"
              required
            />

            <FormInput
              id="address-country"
              label="Country"
              value={
                addressForm.country
              }
              onChange={(value) =>
                setAddressForm(
                  (previous) => ({
                    ...previous,
                    country: value,
                  })
                )
              }
              placeholder="India"
              required
            />

          </div>

          <div className="mt-5">

            <label
              htmlFor="address-default"
              className="flex cursor-pointer items-center gap-3 text-[10px] text-white/50"
            >

              <input
                id="address-default"
                name="is_default"
                type="checkbox"
                checked={
                  addressForm.is_default
                }
                onChange={(event) =>
                  setAddressForm(
                    (previous) => ({
                      ...previous,
                      is_default:
                        event.target
                          .checked,
                    })
                  )
                }
                className="h-4 w-4"
              />

              Set as default address

            </label>

          </div>

          <div className="mt-7 flex justify-end gap-3">

            <button
              type="button"
              onClick={closeAddressModal}
              disabled={savingAddress}
              className="rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/40 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={saveAddress}
              disabled={savingAddress}
              className="rounded-xl bg-white px-5 py-3 text-[9px] font-bold text-black transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingAddress
                ? "Saving..."
                : editingAddressId !==
                  null
                ? "Update address"
                : "Save address"}
            </button>

          </div>

        </Modal>
      )}

    </main>
  );
}

/* ================================================= */
/* PROFILE CARD */
/* ================================================= */

function ProfileCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6"
    >

      <div className="flex items-start gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black">
          {icon}
        </div>

        <div>

          <h3 className="text-sm font-bold">
            {title}
          </h3>

          <p className="mt-1 text-[9px] text-white/20">
            {description}
          </p>

        </div>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </motion.div>
  );
}

/* ================================================= */
/* INFO ROW */
/* ================================================= */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-3">

      <span className="text-[9px] text-white/20">
        {label}
      </span>

      <span className="max-w-[65%] truncate text-right text-[10px] text-white/60">
        {value}
      </span>

    </div>
  );
}

/* ================================================= */
/* ADDRESS CARD */
/* ================================================= */

function Address({
  address,
  onEdit,
  onDelete,
  deleting,
}: {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">

      <div className="flex items-start justify-between gap-3">

        <div className="flex items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
            <MapPin size={14} />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <p className="text-[10px] font-semibold">
                {address.full_name}
              </p>

              {address.is_default && (
                <span className="rounded-md bg-white px-2 py-1 text-[7px] font-bold text-black">
                  Default
                </span>
              )}

            </div>

            <p className="mt-1 text-[8px] leading-5 text-white/30">

              {address.address_line}

              <br />

              {address.city},{" "}
              {address.state}{" "}
              {address.postal_code}

              <br />

              {address.country}

            </p>

            <p className="mt-2 text-[8px] text-white/20">
              {address.phone}
            </p>

          </div>

        </div>

      </div>

      <div className="mt-4 flex gap-2 border-t border-white/5 pt-3">

        <button
          type="button"
          onClick={onEdit}
          disabled={deleting}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[8px] text-white/40 transition hover:bg-white hover:text-black disabled:opacity-50"
        >
          <Pencil size={10} />
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[8px] text-white/40 transition hover:bg-white hover:text-black disabled:opacity-50"
        >
          <Trash2 size={10} />

          {deleting
            ? "Deleting..."
            : "Delete"}

        </button>

      </div>

    </div>
  );
}

/* ================================================= */
/* ACTION CARD */
/* ================================================= */

function ActionCard({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <a href={href}>

      <motion.div
        whileHover={{
          y: -5,
          scale: 1.01,
        }}
        className="group cursor-pointer rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-5 transition"
      >

        <div className="flex items-center justify-between">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
            {icon}
          </div>

          <ChevronRight
            size={14}
            className="text-white/15 transition group-hover:translate-x-1 group-hover:text-white"
          />

        </div>

        <h3 className="mt-5 text-sm font-bold">
          {title}
        </h3>

        <p className="mt-1 text-[9px] text-white/20">
          {text}
        </p>

      </motion.div>

    </a>
  );
}

/* ================================================= */
/* SETTING ROW */
/* ================================================= */

function SettingRow({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-4">

      <div>

        <p className="text-[10px] font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[8px] text-white/20">
          {text}
        </p>

      </div>

      {action}

    </div>
  );
}

/* ================================================= */
/* TOGGLE */
/* ================================================= */

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      className={`relative h-6 w-11 rounded-full border transition ${
        enabled
          ? "border-white bg-white"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >

      <motion.span
        animate={{
          x: enabled ? 20 : 2,
        }}
        className={`absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full ${
          enabled
            ? "bg-black"
            : "bg-white/20"
        }`}
      />

    </button>
  );
}

/* ================================================= */
/* STAT */
/* ================================================= */

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div>

      <div className="flex items-center gap-2">

        {icon}

        <span className="text-sm font-bold">
          {value}
        </span>

      </div>

      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/20">
        {label}
      </p>

    </div>
  );
}

/* ================================================= */
/* FORM INPUT */
/* ================================================= */

function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "search"
    | "email"
    | "url"
    | "none";
  required?: boolean;
}) {
  return (
    <div>

      <label
        htmlFor={id}
        className="block text-[8px] uppercase tracking-widest text-white/30"
      >
        {label}
        {required && (
          <span className="ml-1 text-white/50">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        inputMode={inputMode}
        required={required}
        autoComplete="off"
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-white outline-none transition placeholder:text-white/15 focus:border-white/30"
      />

    </div>
  );
}

/* ================================================= */
/* MODAL */
/* ================================================= */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-md">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        className="relative z-[101] max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#090909] p-6 shadow-2xl"
      >

        {children}

      </motion.div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        className="absolute inset-0 z-[100] cursor-default"
      />

    </div>
  );
}