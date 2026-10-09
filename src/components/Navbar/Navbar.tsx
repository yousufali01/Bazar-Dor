import Link from "next/link";
import { Suspense } from "react";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import AuthButtons from "./AuthButtons";
import BanglaDate from "./BanglaDate";
import { getCategories, getProducts } from "@/lib/api";

/* STATIC NAVBAR SHELL */
function NavbarShell() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* TOP HEADER */}
      <div className="border-b border-[#edf1ee]">
        <div className="navbar mx-auto min-h-[66px] h-auto w-[90%] max-w-[90%] gap-2 px-3 py-2 sm:px-6 sm:py-0 lg:px-8">
          {/* LOGO */}
          <div className="navbar-start min-w-0 flex-1">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2 sm:gap-2.5"
            >
              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[9px] bg-[#008f4c] shadow-sm sm:h-[50px] sm:w-[50px]">
                <span className="text-[23px] sm:text-[25px]">🛒</span>
              </div>

              <div className="min-w-0">
                <h1 className="whitespace-nowrap text-[16px] font-bold leading-none tracking-[-0.4px] text-[#202522] sm:text-[18px]">
                  বাজার দর
                </h1>

                <p className="mt-[5px] whitespace-nowrap text-[8px] font-medium leading-none text-[#737a76] sm:text-[9px]">
                  <BanglaDate />
                </p>
              </div>
            </Link>
          </div>

          {/* AUTH */}
          <div className="navbar-end min-w-0 flex-none">
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}

/* DYNAMIC NAVBAR DATA */
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

/* NAVBAR */
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
