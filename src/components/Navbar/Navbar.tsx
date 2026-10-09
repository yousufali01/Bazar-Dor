import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
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
      {/* TOP HEADER */}
      <div className="border-b border-[#edf1ee]">
        <div className="navbar mx-auto h-[66px] max-w-[90%] px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <div className="navbar-start">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[9px] bg-[#008f4c] shadow-sm">
                <span className="text-[25px]">🛒</span>
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
          </div>

          {/* AUTH */}
          <div className="navbar-end">
            <AuthButtons />
          </div>
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
      <CategoryNav categories={categories} />
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
            <div className="h-[38px] border-b border-[#edf1ee] bg-white" />

            <div className="h-[30px] w-full border-b border-[#dfe6e1] bg-[#f8faf8]" />
          </>
        }
      >
        <NavbarData />
      </Suspense>
    </>
  );
}
