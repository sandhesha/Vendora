"use client";

import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
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
  CheckCircle2,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/* ================================================= */
/* TYPES */
/* ================================================= */

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

interface PaymentForm {
  card_name: string;
  card_number: string;
  expiry: string;
  cvv: string;
}

/* ================================================= */
/* PAGE */
/* ================================================= */

export default function ProfilePage() {
  const {
    user,
    token,
    isLoading: authLoading,
    refreshUser,
    logout,
  } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
  logout();
  router.push("/auth/login");
};

  /* ================================================= */
  /* NOTIFICATIONS */
  /* ================================================= */

  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  /* ================================================= */
  /* SECURITY */
  /* ================================================= */

  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  /* ================================================= */
  /* ADDRESSES */
  /* ================================================= */

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const [addressModal, setAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] =
    useState<number | null>(null);

  const [savingAddress, setSavingAddress] = useState(false);

  const emptyAddress: AddressForm = {
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
  };

  const [addressForm, setAddressForm] =
    useState<AddressForm>(emptyAddress);

  /* ================================================= */
  /* PROFILE */
  /* ================================================= */

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  /* ================================================= */
  /* PASSWORD */
  /* ================================================= */

  const [passwordModal, setPasswordModal] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  /* ================================================= */
  /* PAYMENT */
  /* ================================================= */

  const [paymentModal, setPaymentModal] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);

  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    card_name: "",
    card_number: "",
    expiry: "",
    cvv: "",
  });

  const [savedPayment, setSavedPayment] = useState<{
    card_name: string;
    last4: string;
  } | null>(null);

  /* ================================================= */
  /* USER */
  /* ================================================= */

  useEffect(() => {
    if (user) {
      setProfileName(user.name || "");
    }
  }, [user]);

  /* ================================================= */
  /* LOAD ADDRESSES */
  /* ================================================= */

  useEffect(() => {
    if (!token || authLoading) return;

    loadAddresses();
  }, [token, authLoading]);

  const loadAddresses = async () => {
    if (!token) return;

    setLoadingAddresses(true);

    try {
      const response = await fetch(
        `${API_URL}/users/me/addresses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load addresses");
      }

      const data: Address[] = await response.json();

      setAddresses(data);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  /* ================================================= */
  /* SAVE PROFILE */
  /* ================================================= */

  const saveProfile = async () => {
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    setSavingProfile(true);

    try {
      const response = await fetch(
        `${API_URL}/users/me`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profileName,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        throw new Error("Failed to update profile");
      }

      await refreshUser();

      setEditingProfile(false);

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  /* ================================================= */
  /* ADD ADDRESS */
  /* ================================================= */

  const openAddAddress = () => {
    setEditingAddressId(null);

    setAddressForm({
      ...emptyAddress,
      full_name: user?.name || "",
    });

    setAddressModal(true);
  };

  /* ================================================= */
  /* EDIT ADDRESS */
  /* ================================================= */

  const openEditAddress = (address: Address) => {
    setEditingAddressId(address.id);

    setAddressForm({
      full_name: address.full_name,
      phone: address.phone,
      address_line: address.address_line,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    });

    setAddressModal(true);
  };

  /* ================================================= */
  /* SAVE ADDRESS */
  /* ================================================= */

  const saveAddress = async () => {
    console.log("SAVE ADDRESS CLICKED");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    if (!addressForm.full_name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!addressForm.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!addressForm.address_line.trim()) {
      alert("Please enter your address.");
      return;
    }

    if (!addressForm.city.trim()) {
      alert("Please enter your city.");
      return;
    }

    if (!addressForm.state.trim()) {
      alert("Please enter your state.");
      return;
    }

    if (!addressForm.postal_code.trim()) {
      alert("Please enter your postal code.");
      return;
    }

    setSavingAddress(true);

    try {
      const url = editingAddressId
        ? `${API_URL}/users/me/addresses/${editingAddressId}`
        : `${API_URL}/users/me/addresses`;

      const method = editingAddressId
        ? "PATCH"
        : "POST";

      console.log("Address API:", url);
      console.log("Method:", method);
      console.log("Body:", addressForm);

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressForm),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Address API error:",
          errorText
        );

        throw new Error(errorText);
      }

      await loadAddresses();

      setAddressModal(false);
      setEditingAddressId(null);
      setAddressForm(emptyAddress);

      alert(
        editingAddressId
          ? "Address updated successfully."
          : "Address saved successfully."
      );
    } catch (error) {
      console.error(
        "Failed to save address:",
        error
      );

      alert(
        "Failed to save address. Please check the information."
      );
    } finally {
      setSavingAddress(false);
    }
  };

  /* ================================================= */
  /* DELETE ADDRESS */
  /* ================================================= */

  const deleteAddress = async (addressId: number) => {
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/users/me/addresses/${addressId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        throw new Error("Failed to delete address");
      }

      await loadAddresses();

      alert("Address deleted successfully.");
    } catch (error) {
      console.error(
        "Failed to delete address:",
        error
      );

      alert("Failed to delete address.");
    }
  };

  /* ================================================= */
  /* CHANGE PASSWORD */
  /* ================================================= */

  const openPasswordModal = () => {
    setPasswordForm({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });

    setPasswordModal(true);
  };

  const changePassword = async () => {
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    if (
      !passwordForm.current_password ||
      !passwordForm.new_password ||
      !passwordForm.confirm_password
    ) {
      alert("Please fill all password fields.");
      return;
    }

    if (
      passwordForm.new_password !==
      passwordForm.confirm_password
    ) {
      alert("New passwords do not match.");
      return;
    }

    if (passwordForm.new_password.length < 8) {
      alert(
        "New password must be at least 8 characters."
      );
      return;
    }

    setSavingPassword(true);

    try {
      /*
       * This endpoint is expected:
       *
       * PATCH /users/me/password
       *
       * If your backend uses a different endpoint,
       * change only the URL below.
       */

      const response = await fetch(
  `${API_URL}/auth/change-password`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      current_password: passwordForm.current_password,
      new_password: passwordForm.new_password,
      confirm_password: passwordForm.confirm_password,
    }),
  }
);

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Password API error:",
          errorText
        );

        throw new Error(
          "Failed to change password"
        );
      }

      setPasswordModal(false);

      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      alert(
        "Password changed successfully."
      );
    } catch (error) {
      console.error(
        "Failed to change password:",
        error
      );

      alert(
        "Password change failed. Check your current password."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  /* ================================================= */
  /* PAYMENT */
  /* ================================================= */

  const openPaymentModal = () => {
    setPaymentForm({
      card_name: "",
      card_number: "",
      expiry: "",
      cvv: "",
    });

    setPaymentModal(true);
  };

  const savePayment = async () => {
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const cleanCardNumber =
      paymentForm.card_number.replace(/\s/g, "");

    if (!paymentForm.card_name.trim()) {
      alert("Please enter the name on card.");
      return;
    }

    if (cleanCardNumber.length !== 16) {
      alert(
        "Please enter a valid 16 digit card number."
      );
      return;
    }

    if (!paymentForm.expiry.trim()) {
      alert("Please enter card expiry.");
      return;
    }

    if (paymentForm.cvv.length !== 3) {
      alert("Please enter a valid CVV.");
      return;
    }

    setSavingPayment(true);

    try {
      /*
       * For now payment information is stored only
       * in the frontend state.
       *
       * NEVER send raw card/CVV data to your own
       * backend unless you have a PCI-compliant
       * payment system.
       */

      setSavedPayment({
        card_name: paymentForm.card_name,
        last4: cleanCardNumber.slice(-4),
      });

      setPaymentModal(false);

      alert(
        "Payment method added successfully."
      );
    } finally {
      setSavingPayment(false);
    }
  };

  /* ================================================= */
  /* SECURITY STATUS */
  /* ================================================= */

  const securityScore =
    (twoFactor ? 1 : 0) +
    (loginAlerts ? 1 : 0) +
    (user?.is_active ? 1 : 0);

  const securityGood = securityScore >= 2;

  /* ================================================= */
  /* LOADING */
  /* ================================================= */

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

  /* ================================================= */
  /* UI */
  /* ================================================= */

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
                    transformStyle: "preserve-3d",
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
                transformStyle: "preserve-3d",
              }}
            >

              <div
                className="flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-white text-6xl font-black text-black"
                style={{
                  transform: "translateZ(45px)",
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

          {/* PERSONAL */}

          <ProfileCard
            icon={<User size={17} />}
            title="Personal information"
            description="Name, email and account details"
          >

            <InfoRow
              label="Full name"
              value={user?.name || "Not available"}
            />

            <InfoRow
              label="Email"
              value={user?.email || "Not available"}
            />

            <InfoRow
              label="Account"
              value={user?.role || "customer"}
            />

            <button
              onClick={() => {
                setProfileName(user?.name || "");
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
                  onClick={openAddAddress}
                  className="mt-4 rounded-xl bg-white px-4 py-3 text-[9px] font-bold text-black transition hover:bg-white/80"
                >
                  Add your first address
                </button>

              </div>
            ) : (
              <>
                {addresses.map((address) => (
                  <Address
                    key={address.id}
                    address={address}
                    onEdit={() =>
                      openEditAddress(address)
                    }
                    onDelete={() =>
                      deleteAddress(address.id)
                    }
                  />
                ))}
              </>
            )}

            <button
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

          {/* PAYMENT */}

          <ProfileCard
            icon={<CreditCard size={17} />}
            title="Payment methods"
            description="Manage saved payment options"
          >

            {savedPayment ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-white text-[8px] font-black text-black">
                      VISA
                    </div>

                    <div>

                      <p className="text-xs font-semibold">
                        •••• {savedPayment.last4}
                      </p>

                      <p className="mt-1 text-[8px] text-white/20">
                        {savedPayment.card_name}
                      </p>

                    </div>

                  </div>

                  <CheckCircle2
                    size={15}
                  />

                </div>

              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-5">

                <CreditCard
                  size={22}
                  className="text-white/20"
                />

                <p className="mt-3 text-[10px] text-white/30">
                  No payment method added
                </p>

              </div>
            )}

            <button
              onClick={openPaymentModal}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-[9px] text-white/25 hover:text-white"
            >
              <Plus size={12} />
              Add payment method
            </button>

          </ProfileCard>

          {/* SECURITY */}

          <ProfileCard
            icon={<Lock size={17} />}
            title="Security"
            description="Protect your Vendora account"
          >



          {/* LOGOUT */}
<div className="mt-4">
  <button
    type="button"
    onClick={handleLogout}
    className="group flex w-full items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/[0.04] px-5 py-4 text-left transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/[0.08]"
  >
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
        <svg
          className="h-5 w-5 text-red-400 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 12H9m0 0l3-3m-3 3l3 3"
          />
        </svg>
      </div>

      <div>
        <p className="text-sm font-semibold text-red-300">
          Log out
        </p>

        <p className="mt-1 text-[10px] text-white/30">
          Sign out of your Vendora account
        </p>
      </div>
    </div>

    <ChevronRight
      size={17}
      className="text-white/20 transition-transform duration-300 group-hover:translate-x-1"
    />
  </button>
</div>

            <SettingRow
              title="Two-factor authentication"
              text="Add another layer of security"
              action={
                <Toggle
                  enabled={twoFactor}
                  onClick={() =>
                    setTwoFactor(!twoFactor)
                  }
                />
              }
            />

            <SettingRow
              title="Login alerts"
              text="Get notified about new logins"
              action={
                <Toggle
                  enabled={loginAlerts}
                  onClick={() =>
                    setLoginAlerts(!loginAlerts)
                  }
                />
              }
            />

            <button
              onClick={openPasswordModal}
              className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/30 hover:bg-white/10 hover:text-white"
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
                  enabled={notifications}
                  onClick={() =>
                    setNotifications(!notifications)
                  }
                />
              }
            />

            <SettingRow
              title="Promotional notifications"
              text="Offers, discounts and new launches"
              action={
                <Toggle
                  enabled={marketing}
                  onClick={() =>
                    setMarketing(!marketing)
                  }
                />
              }
            />

            <SettingRow
              title="Email notifications"
              text="Receive important updates by email"
              action={
                <Toggle
                  enabled={emailNotifications}
                  onClick={() =>
                    setEmailNotifications(
                      !emailNotifications
                    )
                  }
                />
              }
            />

          </ProfileCard>

        </section>

        {/* ACCOUNT PROTECTION */}

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-bold">
                Account protection
              </p>

              <p className="mt-2 max-w-xl text-[9px] leading-5 text-white/20">
                Your account is protected with
                Vendora security systems and encrypted
                authentication.
              </p>

            </div>

            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-[9px] ${securityGood
                  ? "bg-white/[0.08] text-white/60"
                  : "bg-red-500/10 text-red-300"
                }`}
            >

              {securityGood ? (
                <ShieldCheck size={13} />
              ) : (
                <AlertCircle size={13} />
              )}

              Security status:{" "}
              {securityGood ? "Good" : "Needs attention"}

            </div>

          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">

            <ProtectionItem
              active={!!user?.is_active}
              text="Active account"
            />

            <ProtectionItem
              active={twoFactor}
              text="2FA enabled"
            />

            <ProtectionItem
              active={loginAlerts}
              text="Login alerts"
            />

          </div>

        </section>

      </div>

      {/* ================================================= */}
      {/* PROFILE MODAL */}
      {/* ================================================= */}

      {editingProfile && (
        <Modal
          onClose={() =>
            setEditingProfile(false)
          }
        >

          <h2 className="text-xl font-black">
            Edit personal information
          </h2>

          <p className="mt-1 text-[10px] text-white/30">
            Update your account name.
          </p>

          <FormInput
            label="Full name"
            value={profileName}
            onChange={setProfileName}
          />

          <div className="mt-6 flex justify-end gap-3">

            <button
              onClick={() =>
                setEditingProfile(false)
              }
              className="rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/40 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={saveProfile}
              disabled={savingProfile}
              className="rounded-xl bg-white px-5 py-3 text-[9px] font-bold text-black disabled:opacity-50"
            >
              {savingProfile
                ? "Saving..."
                : "Save changes"}
            </button>

          </div>

        </Modal>
      )}

      {/* ================================================= */}
      {/* ADDRESS MODAL */}
      {/* ================================================= */}

      {addressModal && (
        <Modal
          onClose={() =>
            setAddressModal(false)
          }
        >

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-black">
                {editingAddressId
                  ? "Edit address"
                  : "Add new address"}
              </h2>

              <p className="mt-1 text-[10px] text-white/30">
                Enter your delivery information.
              </p>

            </div>

            <button
              onClick={() =>
                setAddressModal(false)
              }
              aria-label="Close address modal"
              className="rounded-lg p-2 text-white/30 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <FormInput
              label="Full name"
              name="address-full-name"
              value={addressForm.full_name}
              onChange={(value) =>
                setAddressForm({
                  ...addressForm,
                  full_name: value,
                })
              }
            />

            <FormInput
              label="Phone"
              name="address-phone"
              value={addressForm.phone}
              onChange={(value) =>
                setAddressForm({
                  ...addressForm,
                  phone: value,
                })
              }
            />

            <div className="sm:col-span-2">

              <FormInput
                label="Address"
                name="address-line"
                value={addressForm.address_line}
                onChange={(value) =>
                  setAddressForm({
                    ...addressForm,
                    address_line: value,
                  })
                }
              />

            </div>

            <FormInput
              label="City"
              name="address-city"
              value={addressForm.city}
              onChange={(value) =>
                setAddressForm({
                  ...addressForm,
                  city: value,
                })
              }
            />

            <FormInput
              label="State"
              name="address-state"
              value={addressForm.state}
              onChange={(value) =>
                setAddressForm({
                  ...addressForm,
                  state: value,
                })
              }
            />

            <FormInput
              label="Postal code"
              name="address-postal-code"
              value={addressForm.postal_code}
              onChange={(value) =>
                setAddressForm({
                  ...addressForm,
                  postal_code: value,
                })
              }
            />

            <FormInput
              label="Country"
              name="address-country"
              value={addressForm.country}
              onChange={(value) =>
                setAddressForm({
                  ...addressForm,
                  country: value,
                })
              }
            />

          </div>

          <label className="mt-5 flex cursor-pointer items-center gap-3 text-[10px] text-white/50">

            <input
              id="address-default"
              name="address-default"
              type="checkbox"
              checked={addressForm.is_default}
              onChange={(event) =>
                setAddressForm({
                  ...addressForm,
                  is_default:
                    event.target.checked,
                })
              }
              className="h-4 w-4"
            />

            Set as default address

          </label>

          <div className="mt-7 flex justify-end gap-3">

            <button
              onClick={() =>
                setAddressModal(false)
              }
              className="rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/40 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={saveAddress}
              disabled={savingAddress}
              className="rounded-xl bg-white px-5 py-3 text-[9px] font-bold text-black disabled:opacity-50"
            >
              {savingAddress
                ? "Saving..."
                : editingAddressId
                  ? "Update address"
                  : "Save address"}
            </button>

          </div>

        </Modal>
      )}

      {/* ================================================= */}
      {/* PASSWORD MODAL */}
      {/* ================================================= */}

      {passwordModal && (
        <Modal
          onClose={() =>
            setPasswordModal(false)
          }
        >

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-black">
                Change password
              </h2>

              <p className="mt-1 text-[10px] text-white/30">
                Update your Vendora account password.
              </p>

            </div>

            <button
              onClick={() =>
                setPasswordModal(false)
              }
              aria-label="Close password modal"
              className="rounded-lg p-2 text-white/30 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

          </div>

          <div className="mt-6 space-y-4">

            <PasswordInput
              label="Current password"
              name="current-password"
              value={
                passwordForm.current_password
              }
              onChange={(value) =>
                setPasswordForm({
                  ...passwordForm,
                  current_password: value,
                })
              }
            />

            <PasswordInput
              label="New password"
              name="new-password"
              value={
                passwordForm.new_password
              }
              onChange={(value) =>
                setPasswordForm({
                  ...passwordForm,
                  new_password: value,
                })
              }
            />

            <PasswordInput
              label="Confirm new password"
              name="confirm-password"
              value={
                passwordForm.confirm_password
              }
              onChange={(value) =>
                setPasswordForm({
                  ...passwordForm,
                  confirm_password: value,
                })
              }
            />

          </div>

          <div className="mt-7 flex justify-end gap-3">

            <button
              onClick={() =>
                setPasswordModal(false)
              }
              className="rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/40 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={changePassword}
              disabled={savingPassword}
              className="rounded-xl bg-white px-5 py-3 text-[9px] font-bold text-black disabled:opacity-50"
            >
              {savingPassword
                ? "Changing..."
                : "Change password"}
            </button>

          </div>

        </Modal>
      )}

      {/* ================================================= */}
      {/* PAYMENT MODAL */}
      {/* ================================================= */}

      {paymentModal && (
        <Modal
          onClose={() =>
            setPaymentModal(false)
          }
        >

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-black">
                Add payment method
              </h2>

              <p className="mt-1 text-[10px] text-white/30">
                Add a card for future purchases.
              </p>

            </div>

            <button
              onClick={() =>
                setPaymentModal(false)
              }
              aria-label="Close payment modal"
              className="rounded-lg p-2 text-white/30 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

          </div>

          <div className="mt-6 space-y-4">

            <FormInput
              label="Name on card"
              name="card-name"
              value={paymentForm.card_name}
              onChange={(value) =>
                setPaymentForm({
                  ...paymentForm,
                  card_name: value,
                })
              }
            />

            <FormInput
              label="Card number"
              name="card-number"
              value={paymentForm.card_number}
              onChange={(value) =>
                setPaymentForm({
                  ...paymentForm,
                  card_number: value,
                })
              }
              placeholder="1234 5678 9012 3456"
            />

            <div className="grid gap-4 sm:grid-cols-2">

              <FormInput
                label="Expiry"
                name="card-expiry"
                value={paymentForm.expiry}
                onChange={(value) =>
                  setPaymentForm({
                    ...paymentForm,
                    expiry: value,
                  })
                }
                placeholder="MM/YY"
              />

              <FormInput
                label="CVV"
                name="card-cvv"
                type="password"
                value={paymentForm.cvv}
                onChange={(value) =>
                  setPaymentForm({
                    ...paymentForm,
                    cvv: value,
                  })
                }
                placeholder="123"
              />

            </div>

            <p className="text-[8px] leading-5 text-white/20">
              For production payments, use a PCI-compliant
              payment provider such as Stripe or Razorpay.
              Do not store raw card numbers or CVV values
              in your database.
            </p>

          </div>

          <div className="mt-7 flex justify-end gap-3">

            <button
              onClick={() =>
                setPaymentModal(false)
              }
              className="rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/40 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={savePayment}
              disabled={savingPayment}
              className="rounded-xl bg-white px-5 py-3 text-[9px] font-bold text-black disabled:opacity-50"
            >
              {savingPayment
                ? "Saving..."
                : "Save payment"}
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
/* ADDRESS */
/* ================================================= */

function Address({
  address,
  onEdit,
  onDelete,
}: {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
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
              {address.city}, {address.state}{" "}
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
          onClick={onEdit}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[8px] text-white/40 transition hover:bg-white hover:text-black"
        >
          <Pencil size={10} />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[8px] text-white/40 transition hover:bg-white hover:text-black"
        >
          <Trash2 size={10} />
          Delete
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
      aria-pressed={enabled}
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full border transition ${enabled
          ? "border-white bg-white"
          : "border-white/10 bg-white/[0.04]"
        }`}
    >

      <motion.span
        animate={{
          x: enabled ? 20 : 2,
        }}
        className={`absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full ${enabled
            ? "bg-black"
            : "bg-white/20"
          }`}
      />

    </button>
  );
}

/* ================================================= */
/* PROTECTION ITEM */
/* ================================================= */

function ProtectionItem({
  active,
  text,
}: {
  active: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">

      {active ? (
        <CheckCircle2
          size={14}
        />
      ) : (
        <AlertCircle
          size={14}
        />
      )}

      <span className="text-[9px] text-white/40">
        {text}
      </span>

    </div>
  );
}

/* ================================================= */
/* FORM INPUT */
/* ================================================= */

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const inputId =
    name ||
    label
      .toLowerCase()
      .replace(/\s+/g, "-");

  return (
    <div>

      <label
        htmlFor={inputId}
        className="block text-[8px] uppercase tracking-widest text-white/30"
      >
        {label}
      </label>

      <input
        id={inputId}
        name={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-white outline-none transition focus:border-white/30"
      />

    </div>
  );
}

/* ================================================= */
/* PASSWORD INPUT */
/* ================================================= */

function PasswordInput({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] font-bold uppercase tracking-[0.15em] text-white/40"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-11 text-sm text-white outline-none transition focus:border-white/30"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={
            showPassword
              ? `Hide ${label}`
              : `Show ${label}`
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/30 transition hover:bg-white/10 hover:text-white"
        >
          {showPassword ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </button>
      </div>
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
        className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#090909] p-6 shadow-2xl"
      >

        {children}

      </motion.div>

      <button
        onClick={onClose}
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
      />

    </div>
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