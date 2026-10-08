"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("সবগুলো field পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("Password কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      router.push("/SignIn");
    } catch {
      toast.error("সাইন আপ করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignup(provider: "google" | "github") {
    setSocialLoading(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(`${provider} দিয়ে সাইন আপ করতে সমস্যা হয়েছে।`);
      setSocialLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-10 sm:py-14">
      <div className="mx-auto grid w-full max-w-[1000px] overflow-hidden rounded-[24px] border border-[#e5ebe7] bg-white shadow-sm md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden bg-[#008f4c] p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🛒</span>

              <span className="text-xl font-bold">বাজার দর</span>
            </div>

            <div className="mt-10">
              <p className="text-sm font-medium text-white/80">
                বাজার দর-এর সাথে থাকুন
              </p>

              <h2 className="mt-3 text-4xl font-bold leading-tight">
                আপনার বাজার,
                <br />
                আপনার তথ্য।
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
                একটি অ্যাকাউন্ট তৈরি করে প্রতিদিনের প্রয়োজনীয় পণ্যের দাম
                সহজেই দেখুন।
              </p>
            </div>
          </div>

          <p className="text-xs text-white/60">
            © ২০২৬ বাজার দর
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-9 lg:p-12">
          {/* MOBILE LOGO */}
          <div className="mb-8 flex items-center justify-center gap-2 md:hidden">
            <span className="text-2xl">🛒</span>

            <span className="text-xl font-bold text-[#202522]">
              বাজার দর
            </span>
          </div>

          {/* HEADER */}
          <div>
            <p className="text-xs font-semibold text-[#008f4c]">
              CREATE ACCOUNT
            </p>

            <h1 className="mt-2 text-[28px] font-bold tracking-[-0.5px] text-[#202522]">
              সাইন আপ করুন
            </h1>

            <p className="mt-2 text-sm text-[#737a76]">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* NAME */}
            <div>
              <label
                htmlFor="signup-name"
                className="mb-2 block text-sm font-semibold text-[#202522]"
              >
                Name
              </label>

              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                disabled={loading}
                className="h-12 w-full rounded-xl border border-[#dfe7e2] bg-white px-4 text-sm text-[#202522] outline-none transition placeholder:text-[#a3aaa6] focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/10 disabled:bg-[#f5f7f6]"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-semibold text-[#202522]"
              >
                Email
              </label>

              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="আপনার email লিখুন"
                autoComplete="email"
                disabled={loading}
                className="h-12 w-full rounded-xl border border-[#dfe7e2] bg-white px-4 text-sm text-[#202522] outline-none transition placeholder:text-[#a3aaa6] focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/10 disabled:bg-[#f5f7f6]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="signup-password"
                className="mb-2 block text-sm font-semibold text-[#202522]"
              >
                Password
              </label>

              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="new-password"
                disabled={loading}
                className="h-12 w-full rounded-xl border border-[#dfe7e2] bg-white px-4 text-sm text-[#202522] outline-none transition placeholder:text-[#a3aaa6] focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/10 disabled:bg-[#f5f7f6]"
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#008f4c] text-sm font-bold text-white transition hover:bg-[#007d42] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  <span className="ml-2">অ্যাকাউন্ট তৈরি হচ্ছে...</span>
                </>
              ) : (
                "সাইন আপ"
              )}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e8edea]" />

            <span className="text-xs text-[#9aa19d]">অথবা</span>

            <div className="h-px flex-1 bg-[#e8edea]" />
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={() => handleSocialSignup("google")}
            disabled={socialLoading !== null || loading}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#dfe7e2] bg-white text-sm font-semibold text-[#202522] transition hover:bg-[#f7faf8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "google" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <span className="text-lg font-bold">G</span>
            )}

            Google দিয়ে সাইন আপ
          </button>

          {/* GITHUB */}
          <button
            type="button"
            onClick={() => handleSocialSignup("github")}
            disabled={socialLoading !== null || loading}
            className="mt-3 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#202522] text-sm font-semibold text-white transition hover:bg-[#111411] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "github" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <span className="text-lg">●</span>
            )}

            GitHub দিয়ে সাইন আপ
          </button>

          {/* SIGN IN */}
          <p className="mt-7 text-center text-sm text-[#737a76]">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/SignIn"
              className="font-bold text-[#008f4c] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}