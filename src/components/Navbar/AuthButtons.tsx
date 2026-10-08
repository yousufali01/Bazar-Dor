"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  const [showProfile, setShowProfile] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // =========================
  // LOADING
  // =========================
  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
      </div>
    );
  }

  // =========================
  // LOGOUT
  // =========================
  async function handleLogout() {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout করতে সমস্যা হয়েছে।");
        return;
      }

      toast.success("সফলভাবে Logout হয়েছে।");

      setShowProfile(false);
      setShowEdit(false);
    } catch (error) {
      console.error(error);
      toast.error("Logout করতে সমস্যা হয়েছে।");
    } finally {
      setLoggingOut(false);
    }
  }

  // =========================
  // OPEN EDIT PROFILE
  // =========================
  function openEditProfile() {
    setName(session?.user.name || "");
    setShowEdit(true);
  }

  // =========================
  // UPDATE NAME
  // =========================
  async function handleUpdateName() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("নাম লিখুন।");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "Profile update করা যায়নি।");
        return;
      }

      toast.success("Profile name সফলভাবে update হয়েছে।");

      setShowEdit(false);
      setShowProfile(false);
    } catch (error) {
      console.error(error);
      toast.error("Profile update করতে সমস্যা হয়েছে।");
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // NOT LOGGED IN
  // =========================
  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="btn btn-sm border border-[#008f4c] bg-white text-[#008f4c] hover:bg-[#008f4c] hover:text-white"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="btn btn-sm border-[#008f4c] bg-[#008f4c] text-white hover:bg-[#007a40]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  // =========================
  // LOGGED IN
  // =========================
  const userName = session.user.name || "User";
  const userEmail = session.user.email || "";
  const userImage = session.user.image;

  return (
    <div className="relative">
      {/* PROFILE BUTTON */}
      <button
        type="button"
        onClick={() => setShowProfile((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-[#e1e8e3] bg-white px-2 py-1.5 transition hover:bg-[#f5faf7]"
      >
        {/* PROFILE IMAGE / INITIAL */}
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

        {/* USER NAME */}
        <div className="hidden text-left sm:block">
          <p className="max-w-[130px] truncate text-sm font-bold text-[#202522]">
            {userName}
          </p>

          <p className="max-w-[130px] truncate text-[11px] text-[#737a76]">
            {userEmail}
          </p>
        </div>

        <span className="text-xs text-[#737a76]">▼</span>
      </button>

      {/* PROFILE DROPDOWN */}
      {showProfile && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[280px] overflow-hidden rounded-2xl border border-[#e3e9e5] bg-white shadow-xl">
          {/* USER INFO */}
          <div className="border-b border-[#edf1ee] p-4">
            <div className="flex items-center gap-3">
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

                <p className="truncate text-xs text-[#737a76]">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* PROFILE ACTIONS */}
          <div className="p-2">
            <button
              type="button"
              onClick={openEditProfile}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#202522] transition hover:bg-[#f3f8f5]"
            >
              <span>✏️</span>
              <span>প্রোফাইল Edit করুন</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
            >
              {loggingOut ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  <span>Logout হচ্ছে...</span>
                </>
              ) : (
                <>
                  <span>↪</span>
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#202522]">Edit Profile</h2>

              <p className="mt-1 text-sm text-[#737a76]">
                আপনার profile name পরিবর্তন করুন।
              </p>
            </div>

            {/* EMAIL - READ ONLY */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-[#202522]">
                Email
              </label>

              <input
                type="email"
                value={userEmail}
                disabled
                className="h-11 w-full rounded-xl border border-[#dfe7e2] bg-[#f4f6f5] px-4 text-sm text-[#737a76]"
              />

              <p className="mt-1.5 text-xs text-[#9aa19d]">
                Email পরিবর্তন এই profile editor থেকে করা হচ্ছে না।
              </p>
            </div>

            {/* NAME */}
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-[#202522]"
              >
                Name
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
                disabled={saving}
                className="h-11 w-full rounded-xl border border-[#dfe7e2] bg-white px-4 text-sm text-[#202522] outline-none transition placeholder:text-[#a3aaa6] focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/10"
              />
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                disabled={saving}
                className="btn flex-1 border border-[#dfe7e2] bg-white text-[#202522] hover:bg-[#f5f7f6]"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={handleUpdateName}
                disabled={saving}
                className="btn flex-1 border-[#008f4c] bg-[#008f4c] text-white hover:bg-[#007d42]"
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Save হচ্ছে...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
