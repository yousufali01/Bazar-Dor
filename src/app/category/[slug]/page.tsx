"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Product } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

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

  if (normalized === "dozen" || normalized === "doz") {
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
   IMAGE URL
   ========================================= */
function getImageUrl(image: string) {
  if (!image) return "";

  // Already a complete URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Absolute path
  if (image.startsWith("/")) {
    return image;
  }

  // Relative API image path
  return `${API_BASE_URL}/${image}`;
}

/* =========================================
   CATEGORY PAGE
   ========================================= */
export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================
     GET SLUG
     ========================================= */
  useEffect(() => {
    params.then((value) => {
      setSlug(value.slug);
    });
  }, [params]);

  /* =========================================
     FETCH PRODUCTS
     ========================================= */
  useEffect(() => {
    if (!slug) return;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/products`);

        if (!response.ok) {
          throw new Error(`Products API failed: ${response.status}`);
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("পণ্য লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [slug]);

  /* =========================================
     FILTER CATEGORY
     ========================================= */

  const categoryProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === slug.toLowerCase()
  );

  /* =========================================
     CATEGORY INFO
     ========================================= */

  const categoryName =
    categoryProducts.length > 0
      ? categoryProducts[0].categoryNameBn
      : "পণ্য";

  const categoryIcon =
    categoryProducts.length > 0
      ? categoryProducts[0].categoryIcon
      : "🛒";

  /* =========================================
     LOADING
     ========================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7faf8]">
        <div className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-7">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-[#e6ece8]" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-[#e6ece8]" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#edf1ee] bg-white p-3 shadow-sm sm:p-4"
              >
                <div className="h-[120px] animate-pulse rounded-xl bg-[#f0f4f1] sm:h-[150px]" />

                <div className="mt-3 h-4 w-24 animate-pulse rounded bg-[#e6ece8]" />

                <div className="mt-2 h-3 w-16 animate-pulse rounded bg-[#e6ece8]" />

                <div className="mt-4 h-5 w-20 animate-pulse rounded bg-[#e6ece8]" />
              </div>
            ))}
          </div>

        </div>
      </main>
    );
  }

  /* =========================================
     API ERROR
     ========================================= */

  if (error) {
    return (
      <main className="min-h-screen bg-[#f7faf8]">
        <div className="mx-auto max-w-[1120px] px-4 py-16 text-center sm:px-6 lg:px-8">

          <div className="rounded-2xl border border-[#edf1ee] bg-white px-6 py-12 shadow-sm">

            <div className="text-4xl">⚠️</div>

            <h1 className="mt-4 text-lg font-bold text-[#202522]">
              {error}
            </h1>

            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary mt-5 rounded-full"
            >
              আবার চেষ্টা করুন
            </button>

          </div>

        </div>
      </main>
    );
  }

  /* =========================================
     CATEGORY PAGE
     ========================================= */

  return (
    <main className="min-h-screen bg-[#f7faf8]">

      <div className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================================
            HEADER
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

            {categoryProducts.map((product) => {

              const isUp = product.change.dir === "up";

              const imageUrl = getImageUrl(product.image);

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group rounded-2xl border border-[#edf1ee] bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-4"
                >

                  {/* PRODUCT IMAGE */}

                  <div className="flex h-[120px] items-center justify-center overflow-hidden rounded-xl bg-[#f7faf8] sm:h-[150px]">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.nameBn}
                        className="h-full w-full object-contain p-3 transition-transform duration-200 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                          const fallback =
                            event.currentTarget.parentElement?.querySelector(
                              "[data-image-fallback]"
                            );

                          if (fallback) {
                            fallback.classList.remove("hidden");
                          }
                        }}
                      />
                    ) : null}

                    {/* IMAGE FALLBACK */}

                    <span
                      data-image-fallback
                      className={`text-5xl ${
                        imageUrl ? "hidden" : ""
                      }`}
                    >
                      {product.categoryIcon}
                    </span>

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

