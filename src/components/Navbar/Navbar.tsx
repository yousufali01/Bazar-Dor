import Link from "next/link";
import { Suspense } from "react";

import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import AuthButtons from "./AuthButtons";
import BanglaDate from "./BanglaDate";

import { getCategories, getProducts } from "@/lib/api";

/* =========================================
   STATIC NAVBAR SHELL
   ========================================= */
function NavbarShell() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* =========================================
          TOP HEADER
          ========================================= */}
      <div className="border-b border-[#edf1ee]">
        <div className="mx-auto flex h-[66px] max-w-[1120px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] bg-[#008f4c] shadow-sm">
              <span className="text-[18px]">🛒</span>
            </div>

            <div>
              <h1 className="text-[17px] font-bold leading-none tracking-[-0.4px] text-[#202522] sm:text-[18px]">
                বাজার দর
              </h1>

              <p className="mt-[5px] text-[8px] font-medium leading-none text-[#737a76] sm:text-[9px]">
                <BanglaDate />
              </p>
            </div>
          </Link>

          {/* AUTH */}
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}

/* =========================================
   DYNAMIC NAVBAR DATA
   ========================================= */
async function NavbarData() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <>
      {/* CATEGORY NAVIGATION */}
      <CategoryNav categories={categories} />

      {/* PRICE TICKER */}
      <PriceTicker products={products} />
    </>
  );
}

/* =========================================
   NAVBAR
   ========================================= */
export default function Navbar() {
  return (
    <>
      <NavbarShell />

      <Suspense
        fallback={
          <>
            {/* Category navigation loading space */}
            <div className="h-[38px] border-b border-[#edf1ee] bg-white" />

            {/* Price ticker loading space */}
            <div className="h-[30px] w-full border-b border-[#dfe6e1] bg-[#f8faf8]" />
          </>
        }
      >
        <NavbarData />
      </Suspense>
    </>
  );
}

