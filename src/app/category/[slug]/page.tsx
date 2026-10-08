import Link from "next/link";

import { getProducts } from "@/lib/api";
import type { Product } from "@/types";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================
   BANGLA NUMBER
   ========================================= */
function toBanglaNumber(value: number | string) {
  return String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

/* =========================================
   UNIT NAME
   ========================================= */
function getBanglaUnit(unit: string) {
  const normalized = unit.toLowerCase();

  if (
    normalized === "kg" ||
    normalized === "kilogram" ||
    normalized === "kilograms"
  ) {
    return "কেজি";
  }

  if (
    normalized === "liter" ||
    normalized === "litre" ||
    normalized === "liters" ||
    normalized === "litres" ||
    normalized === "l"
  ) {
    return "লিটার";
  }

  if (
    normalized === "piece" ||
    normalized === "pieces" ||
    normalized === "pcs" ||
    normalized === "pc"
  ) {
    return "পিস";
  }

  if (
    normalized === "dozen" ||
    normalized === "doz"
  ) {
    return "ডজন";
  }

  if (
    normalized === "gram" ||
    normalized === "grams" ||
    normalized === "g" ||
    normalized === "gm"
  ) {
    return "গ্রাম";
  }

  return unit;
}

/* =========================================
   CATEGORY PAGE
   ========================================= */
export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const products = await getProducts();

  /* =========================================
     FILTER PRODUCTS BY CATEGORY
     ========================================= */

  const categoryProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === slug.toLowerCase()
  );

  /* =========================================
     CATEGORY INFORMATION
     ========================================= */

  const categoryName =
    categoryProducts.length > 0
      ? categoryProducts[0].categoryNameBn
      : "পণ্য";

  const categoryIcon =
    categoryProducts.length > 0
      ? categoryProducts[0].categoryIcon
      : "🛒";

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <div className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================================
            PAGE HEADER
            ========================================= */}

        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">
              {categoryIcon}
            </span>

            <h1 className="text-2xl font-bold tracking-tight text-[#202522] sm:text-3xl">
              {categoryName}
            </h1>
          </div>

          <p className="text-sm text-[#737a76]">
            এই ক্যাটাগরির সকল পণ্যের আজকের বাজার দর
          </p>
        </div>


        {/* =========================================
            NO PRODUCTS
            ========================================= */}

        {categoryProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#edf1ee] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-3 text-4xl">
              📦
            </div>

            <h2 className="text-lg font-semibold text-[#202522]">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-1 text-sm text-[#737a76]">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
            </p>

            <Link
              href="/"
              className="btn btn-primary mt-5 rounded-full"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        ) : (

          /* =========================================
             PRODUCT GRID
             ========================================= */

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">

            {categoryProducts.map((product: Product) => {
              const isUp = product.change.dir === "up";

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group rounded-2xl border border-[#edf1ee] bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-4"
                >

                  {/* PRODUCT IMAGE */}
                  <div className="flex h-[120px] items-center justify-center rounded-xl bg-[#f7faf8] sm:h-[150px]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.nameBn}
                        className="h-full w-full rounded-xl object-contain p-3"
                      />
                    ) : (
                      <span className="text-5xl">
                        {product.categoryIcon}
                      </span>
                    )}
                  </div>


                  {/* PRODUCT INFO */}
                  <div className="mt-3">

                    <h2 className="line-clamp-1 text-sm font-bold text-[#202522] sm:text-base">
                      {product.nameBn}
                    </h2>

                    <p className="mt-1 text-[11px] text-[#737a76] sm:text-xs">
                      প্রতি {getBanglaUnit(product.unit)}
                    </p>


                    {/* PRICE */}
                    <div className="mt-3 flex items-end justify-between gap-2">

                      <div>
                        <p className="text-[10px] text-[#737a76]">
                          আজকের দাম
                        </p>

                        <p className="mt-0.5 text-base font-bold text-[#202522] sm:text-lg">
                          ৳{toBanglaNumber(product.today)}
                        </p>
                      </div>


                      {/* CHANGE */}
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold sm:text-xs ${
                          isUp
                            ? "bg-[#ffe8e8] text-[#e74c3c]"
                            : "bg-[#e6f5ec] text-[#008f4c]"
                        }`}
                      >
                        {isUp ? "▲" : "▼"}{" "}
                        {toBanglaNumber(product.change.pct)}%
                      </span>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}

