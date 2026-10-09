"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  const [showProfile, setShowProfile] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Session loading
  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
      </div>
    );
  }

  // Logout
  async function handleLogout() {
    if (loggingOut || saving) return;

    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout করতে সমস্যা হয়েছে।");
        return;
      }

      setShowProfile(false);
      setShowEdit(false);

      toast.success("সফলভাবে Logout হয়েছে!");

      window.location.href = "/";
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      toast.error("Logout করতে সমস্যা হয়েছে।");
    } finally {
      setLoggingOut(false);
    }
  }

  // Open Edit Profile
  function openEditProfile() {
    setName(session?.user.name || "");
    setShowProfile(false);
    setShowEdit(true);
  }

  // Update Profile Name
  async function handleUpdateName() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (saving || loggingOut) return;

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "Profile update করা যায়নি।");
        return;
      }

      toast.success("Profile name সফলভাবে update হয়েছে!");

      setShowEdit(false);
      setShowProfile(false);
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
      toast.error("Profile update করতে সমস্যা হয়েছে।");
    } finally {
      setSaving(false);
    }
  }

  // Sign In / Sign Up
  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="btn btn-sm border border-[#008f4c] bg-white text-[#008f4c] transition hover:bg-[#008f4c] hover:text-white"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="btn btn-sm border border-[#008f4c] bg-[#008f4c] text-white transition hover:bg-[#007a40]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const userName = session.user.name || "User";
  const userEmail = session.user.email || "";
  const userImage = session.user.image;

  return (
    <>
      {/* PROFILE BUTTON + DROPDOWN */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowProfile((prev) => !prev)}
          aria-expanded={showProfile}
          aria-label="Open profile menu"
          className="flex items-center gap-2 rounded-xl border border-[#e1e8e3] bg-white px-2 py-1.5 transition hover:border-[#008f4c]/30 hover:bg-[#f5faf7]"
        >
          {userImage ? (
            <img
              src={userImage}
              alt={userName}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#008f4c] text-sm font-bold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="hidden text-left sm:block">
            <p className="max-w-[130px] truncate text-sm font-bold text-[#202522]">
              {userName}
            </p>

            <p className="max-w-[130px] truncate text-[11px] text-[#737a76]">
              {userEmail}
            </p>
          </div>

          <span
            className={`text-xs text-[#737a76] transition-transform ${
              showProfile ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {/* PROFILE DROPDOWN */}
        {showProfile && (
          <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[280px] overflow-hidden rounded-2xl border border-[#e3e9e5] bg-white shadow-xl">
            {/* User Information */}
            <div className="border-b border-[#edf1ee] bg-gradient-to-br from-[#f3fbf6] to-white p-4">
              <div className="flex items-center gap-3">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#008f4c] text-lg font-bold text-white shadow-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#202522]">
                    {userName}
                  </p>

                  <p className="truncate text-xs text-[#737a76]">
                    {userEmail}
                  </p>

                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#008f4c]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#008f4c]" />
                    Active account
                  </span>
                </div>
              </div>
            </div>

            {/* Dropdown Actions */}
            <div className="space-y-1 p-2">
              <button
                type="button"
                onClick={openEditProfile}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-[#202522] transition hover:bg-[#f3f8f5]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf7ef] text-base">
                  ✏️
                </span>

                <span className="flex-1">
                  <span className="block font-semibold">
                    প্রোফাইল Edit করুন
                  </span>

                  <span className="mt-0.5 block text-xs text-[#858d87]">
                    আপনার profile information
                  </span>
                </span>

                <span className="text-lg text-[#a0a7a2]">›</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-lg">
                  ↪
                </span>

                <span className="flex-1">
                  <span className="block font-semibold">
                    {loggingOut ? "Logout হচ্ছে..." : "Sign Out"}
                  </span>

                  <span className="mt-0.5 block text-xs text-red-400">
                    আপনার account থেকে বের হন
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#101b14]/50 px-4 py-6 backdrop-blur-[3px]"
          onClick={() => {
            if (!saving && !loggingOut) setShowEdit(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
            className="my-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#008f4c] to-[#006b39] px-6 pb-7 pt-6 sm:px-7">
              <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/10" />
              <div className="absolute -bottom-16 right-16 h-32 w-32 rounded-full bg-white/10" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-2xl shadow-sm">
                    👤
                  </div>

                  <h2
                    id="edit-profile-title"
                    className="text-2xl font-bold tracking-tight text-white"
                  >
                    Edit Profile
                  </h2>

                  <p className="mt-1.5 text-sm text-white/80">
                    আপনার account information আপডেট করুন।
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  disabled={saving || loggingOut}
                  aria-label="Close edit profile"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl text-white transition hover:bg-white/20 disabled:opacity-50"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7">
              {/* Profile Preview */}
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#e7eee9] bg-[#f7faf8] p-3">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#008f4c] text-lg font-bold text-white">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#202522]">
                    {userName}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-[#737a76]">
                    {userEmail}
                  </p>
                </div>

                <span className="ml-auto shrink-0 rounded-full bg-[#e5f6eb] px-2.5 py-1 text-[10px] font-bold text-[#008f4c]">
                  PROFILE
                </span>
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-semibold text-[#303832]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-[#8a958e]">
                    ✉
                  </span>

                  <input
                    id="profile-email"
                    type="email"
                    value={userEmail}
                    disabled
                    className="h-12 w-full rounded-xl border border-[#e1e8e3] bg-[#f5f7f6] pl-11 pr-4 text-sm text-[#7c857f] outline-none disabled:cursor-not-allowed"
                  />
                </div>

                <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-[#929a94]">
                  <span>ⓘ</span>
                  <span>
                    Email address এখানে পরিবর্তন করা যাবে না।
                  </span>
                </p>
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-semibold text-[#303832]"
                >
                  আপনার নাম
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-[#8a958e]">
                    ♙
                  </span>

                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !saving && !loggingOut) {
                        event.preventDefault();
                        handleUpdateName();
                      }
                    }}
                    placeholder="আপনার নাম লিখুন"
                    maxLength={100}
                    autoComplete="name"
                    disabled={saving || loggingOut}
                    className="h-12 w-full rounded-xl border border-[#dfe7e2] bg-white pl-11 pr-4 text-sm text-[#202522] outline-none transition placeholder:text-[#a3aaa6] focus:border-[#008f4c] focus:ring-4 focus:ring-[#008f4c]/10 disabled:cursor-not-allowed disabled:bg-[#f5f7f6]"
                  />
                </div>

                <p className="mt-2 text-xs text-[#929a94]">
                  নাম কমপক্ষে ২ অক্ষরের হতে হবে।
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                {/* Cancel + Save */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    disabled={saving || loggingOut}
                    className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#dfe7e2] bg-white px-4 text-sm font-semibold text-[#515b54] transition hover:bg-[#f5f8f6] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    বাতিল করুন
                  </button>

                  <button
                    type="button"
                    onClick={handleUpdateName}
                    disabled={saving || loggingOut}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#008f4c] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#007d42] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        সংরক্ষণ হচ্ছে...
                      </>
                    ) : (
                      <>
                        <span>✓</span>
                        পরিবর্তন সংরক্ষণ
                      </>
                    )}
                  </button>
                </div>

                {/* Sign Out inside Edit Profile */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={saving || loggingOut}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loggingOut ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Sign Out হচ্ছে...
                    </>
                  ) : (
                    <>
                      <span className="text-base">↪</span>
                      Sign Out
                    </>
                  )}
                </button>
              </div>

              {/* Footer Note */}
              <p className="mt-5 text-center text-[11px] leading-relaxed text-[#a0a7a2]">
                আপনার account-এর তথ্য নিরাপদে পরিচালনা করুন।
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

