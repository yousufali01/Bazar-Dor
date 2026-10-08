import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-[#e3ebe6] bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mb-5 text-6xl">🔎</div>

        <p className="mb-2 text-sm font-semibold text-[#008f4c]">
          404 Error
        </p>

        <h1 className="text-2xl font-bold text-[#202522] sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#737a76]">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো মুছে ফেলা হয়েছে অথবা ঠিকানা
          পরিবর্তন করা হয়েছে।
        </p>

        <Link
          href="/"
          className="btn mt-7 w-full border-0 bg-[#008f4c] text-white hover:bg-[#007d42] sm:w-auto"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}