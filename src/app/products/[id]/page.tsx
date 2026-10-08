import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getProducts } from "@/lib/api";
import { auth } from "@/lib/auth";

/* =========================================
   BANGLA NUMBER
   ========================================= */
function toBanglaNumber(value: number | string) {
  return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
}

/* =========================================
   UNIT NAME
   ========================================= */
function getUnitName(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    piece: "পিস",
    pcs: "পিস",
    dozen: "ডজন",
    gram: "গ্রাম",
    gm: "গ্রাম",
  };

  return units[unit.toLowerCase()] || unit;
}

/* =========================================
   FORMAT PRICE
   ========================================= */
function formatPrice(value: number) {
  return Number.isInteger(value)
    ? toBanglaNumber(value)
    : toBanglaNumber(value.toFixed(2).replace(/\.?0+$/, ""));
}

/* =========================================
   CHECK IMAGE URL
   ========================================= */
function isImageUrl(value: string) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/")
  );
}

/* =========================================
   LOADING UI
   ========================================= */
function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen bg-[#f5f8f5]">
      <div className="mx-auto w-[90%] max-w-[1200px] py-8 sm:py-10 md:py-12">
        <div className="mb-8 h-4 w-52 animate-pulse rounded bg-[#e1e8e3]" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="h-4 w-20 animate-pulse rounded bg-[#e1e8e3]" />
            <div className="mt-4 h-10 w-72 animate-pulse rounded bg-[#e1e8e3]" />
            <div className="mt-5 h-4 w-40 animate-pulse rounded bg-[#e1e8e3]" />
          </div>

          <div className="h-36 w-72 animate-pulse rounded-2xl bg-[#e1e8e3]" />
        </div>

        <div className="mt-10 rounded-2xl border border-[#edf1ee] bg-white p-6">
          <div className="h-7 w-48 animate-pulse rounded bg-[#e1e8e3]" />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="h-24 animate-pulse rounded-xl bg-[#f0f4f1]" />
            <div className="h-24 animate-pulse rounded-xl bg-[#f0f4f1]" />
            <div className="h-24 animate-pulse rounded-xl bg-[#f0f4f1]" />
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#edf1ee] bg-white p-6">
          <div className="h-7 w-72 animate-pulse rounded bg-[#e1e8e3]" />
          <div className="mt-6 h-64 animate-pulse rounded-xl bg-[#f0f4f1]" />
        </div>
      </div>
    </main>
  );
}

/* =========================================
   PRODUCT DETAIL CONTENT
   ========================================= */
async function ProductDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /* =========================================
     PROTECTED ROUTE
     ========================================= */
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signup");
  }

  /* =========================================
     GET PRODUCT
     ========================================= */
  const products = await getProducts();

  const product = products.find((item) => String(item.id) === String(id));

  /* =========================================
     PRODUCT NOT FOUND
     ========================================= */
  if (!product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f5f8f5] px-4">
        <div className="text-center">
          <div className="text-[50px]">🔍</div>

          <h1 className="mt-4 text-[24px] font-bold text-[#202522]">
            পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-[12px] text-[#737a76]">
            আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          </p>

          <Link
            href="/"
            className="btn mt-6 h-[40px] min-h-[40px] rounded-full border-0 bg-[#008f4c] px-5 text-[11px] font-semibold text-white hover:bg-[#007d42]"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================
     BASIC DATA
     ========================================= */

  const unit = getUnitName(product.unit);

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.pct === 0;

  const priceDifference = Math.abs(product.today - product.yesterday);

  const changeText = isFlat
    ? "গতকালের তুলনায় কোনো পরিবর্তন নেই"
    : `গতকালের তুলনায় আজ দাম ${
        isUp ? "বেড়েছে" : "কমেছে"
      } · ${toBanglaNumber(priceDifference)} টাকা`;

  /* =========================================
     MARKET DATA
     ========================================= */

  const markets = product.markets || [];

  const allMinimumPrices = markets.map((market) => market.min);
  const allMaximumPrices = markets.map((market) => market.max);

  const minimumPrice =
    allMinimumPrices.length > 0 ? Math.min(...allMinimumPrices) : product.today;

  const maximumPrice =
    allMaximumPrices.length > 0 ? Math.max(...allMaximumPrices) : product.today;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : product.today;

  const lowestMarket =
    markets.length > 0
      ? markets.reduce((lowest, market) =>
          market.min < lowest.min ? market : lowest,
        )
      : null;

  const highestMarket =
    markets.length > 0
      ? markets.reduce((highest, market) =>
          market.max > highest.max ? market : highest,
        )
      : null;

  /* =========================================
     PRODUCT IMAGE
     ========================================= */

  const productImage = product.image;
  const imageIsUrl = isImageUrl(productImage);

  return (
    <main className="min-h-screen bg-[#f5f8f5]">
      <div className="mx-auto w-[90%] max-w-[1200px] py-7 sm:py-9 md:py-12">
        {/* =========================================
            BREADCRUMB
            ========================================= */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] sm:text-[12px]">
          <Link
            href="/"
            className="text-[#737a76] transition hover:text-[#008f4c]"
          >
            হোম
          </Link>

          <span className="text-[#b3bbb6]">›</span>

          <span className="text-[#737a76]">{product.categoryNameBn}</span>

          <span className="text-[#b3bbb6]">›</span>

          <span className="font-semibold text-[#202522]">{product.nameBn}</span>
        </nav>

        {/* =========================================
    TOP SUMMARY
    ========================================= */}
        <section className="rounded-[18px] border border-[#e7ece9] bg-white p-5 shadow-sm sm:p-7 md:p-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            {/* =====================================
        LEFT SIDE
        IMAGE + PRODUCT NAME
        ===================================== */}
            <div className="flex items-center gap-4">
              {/* IMAGE / EMOJI */}
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[16px] bg-[#f5f8f5] sm:h-[84px] sm:w-[84px]">
                {isImageUrl(product.image) ? (
                  <img
                    src={product.image}
                    alt={product.nameBn}
                    className="h-[58px] w-[58px] object-contain sm:h-[68px] sm:w-[68px]"
                  />
                ) : (
                  <span className="text-[42px] sm:text-[48px]">
                    {product.image || product.categoryIcon || "🛒"}
                  </span>
                )}
              </div>

              {/* PRODUCT TEXT */}
              <div>
                {/* PRODUCT NAME */}
                <h1 className="text-[25px] font-bold leading-tight tracking-[-0.5px] text-[#202522] sm:text-[32px]">
                  {product.nameBn}
                </h1>

                {/* TODAY PRICE */}
                <p className="mt-2 text-[11px] font-medium text-[#737a76] sm:text-[12px]">
                  আজকের দাম
                </p>

                {/* CATEGORY + UNIT */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-[#737a76]">
                    প্রতি {unit} · {product.categoryNameBn}
                  </span>
                </div>
                <span
                  className={
                    isUp
                      ? "text-[11px] font-medium text-[#e74c3c]"
                      : isDown
                        ? "text-[11px] font-medium text-[#079447]"
                        : "text-[11px] font-medium text-[#737a76]"
                  }
                >
                  {changeText}
                </span>
              </div>
            </div>

            {/* =====================================
        RIGHT SIDE
        PRICE + CHANGE
        ===================================== */}
            <div className="flex p-4 rounded-2xl bg-[#f7faf8] flex-col items-start md:items-end">
              {/* PRICE */}
              <div className="flex items-baseline gap-2">
                <span className="text-[40px] font-bold leading-none tracking-[-1px] text-[#202522] sm:text-[48px]">
                  {toBanglaNumber(product.today)}
                </span>

                <span className="text-[11px] font-medium text-[#737a76]">
                  টাকা / {unit}
                </span>
              </div>

              {/* CHANGE + PERCENTAGE */}
              <div className="mt-3 flex flex-wrap items-center gap-3 md:justify-end">
                <span
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
                    isUp
                      ? "bg-[#fff0ee] text-[#e74c3c]"
                      : isDown
                        ? "bg-[#e8f7ee] text-[#079447]"
                        : "bg-[#f1f3f2] text-[#737a76]"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            PRICE SUMMARY
            ========================================= */}
        <section className="mt-10 rounded-[18px] border border-[#e7ece9] bg-white p-5 shadow-sm sm:p-7 md:p-8">
          <h2 className="text-[18px] font-bold text-[#202522] sm:text-[20px]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* MINIMUM */}
            <div className="rounded-[14px] border bg-[#f7faf8] p-5">
              <p className="text-[11px] ">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-[25px] font-bold text-[#43cf80]">
                {formatPrice(minimumPrice)}
                <span className="ml-1 text-[11px] font-medium">টাকা</span>
              </p>

              {lowestMarket && (
                <p className="mt-2 text-[10px] text-[#737a76]">
                  {lowestMarket.market}
                </p>
              )}
            </div>

            {/* MAXIMUM */}
            <div className="rounded-[14px] border border-[#f2dddd] bg-[#fffafa] p-5">
              <p className="text-[11px] text-[#202522]">সর্বাধিক দাম</p>

              <p className="mt-2 text-[25px] font-bold text-[#e74c3c]">
                {formatPrice(maximumPrice)}
                <span className="ml-1 text-[11px] font-medium text-[#e74c3c]">
                  টাকা
                </span>
              </p>

              {highestMarket && (
                <p className="mt-2 text-[10px] text-[#737a76]">
                  {highestMarket.market}
                </p>
              )}
            </div>

            {/* AVERAGE */}
            <div className="rounded-[14px] border bg-[#f7faf8] p-5">
              <p className="text-[11px] ">গড় দাম</p>

              <p className="mt-2 text-[#229956] text-[25px] font-bold">
                {formatPrice(averagePrice)}
                <span className="ml-1 text-[#229956] text-[11px] font-medium text-[#737a76]">
                  টাকা
                </span>
              </p>

              <p className="mt-2 text-[10px] text-[#737a76]">
                প্রতি {unit}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        {/* =========================================
            MARKET PRICE
            ========================================= */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-[20px] font-bold text-[#202522] sm:text-[22px]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-[11px] text-[#737a76]">
              প্রতি {unit}-এর হিসাবে
            </p>
          </div>

          <div className="overflow-hidden rounded-[18px] border border-[#e7ece9] bg-white shadow-sm">
            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-[#88918b] border-[#e7ece9] bg-[#f8faf8]">
                    <th className="px-6 py-4 text-left text-[11px] font-bold ">
                      বাজার
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold">
                      বিভাগ
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-bold">
                      সর্বনিম্ন
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-bold">
                      সর্বাধিক
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-bold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-b border-[#edf1ee] last:border-b-0"
                      >
                        <td className="px-6 py-4 text-left text-[11px] font-medium text-[#202522]">
                          {market.market}
                        </td>

                        <td className="px-6 py-4 text-left text-[11px] text-[#202522]">
                          {market.division}
                        </td>

                        {/* MIN RED */}
                        <td className="px-6 py-4 text-right text-[11px] font-semibold">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-6 py-4 text-right text-[11px] text-[#202522]">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="px-6 py-4 text-right text-[11px] font-bold text-[#202522]">
                          {formatPrice(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}
            <div className="divide-y divide-[#edf1ee] md:hidden">
              {markets.map((market, index) => {
                const marketAverage = (market.min + market.max) / 2;

                return (
                  <div key={`${market.market}-${index}`} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[13px] font-bold text-[#202522]">
                          {market.market}
                        </h3>

                        <p className="mt-1 text-[10px] text-[#737a76]">
                          {market.division}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] text-[#737a76]">গড়</p>

                        <p className="mt-1 text-[15px] font-bold text-[#202522]">
                          {formatPrice(marketAverage)} টাকা
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {/* MIN RED */}
                      <div className="rounded-lg bg-[#fffafa] p-3">
                        <p className="text-[9px] text-[#737a76]">সর্বনিম্ন</p>

                        <p className="mt-1 text-[12px] font-semibold text-[#e74c3c]">
                          {formatPrice(market.min)} টাকা
                        </p>
                      </div>

                      <div className="rounded-lg bg-[#f8faf8] p-3">
                        <p className="text-[9px] text-[#737a76]">সর্বাধিক</p>

                        <p className="mt-1 text-[12px] font-semibold text-[#202522]">
                          {formatPrice(market.max)} টাকা
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {markets.length === 0 && (
              <div className="p-8 text-center text-[12px] text-[#737a76]">
                বাজারের তথ্য পাওয়া যায়নি।
              </div>
            )}
          </div>
        </section>

        {/* =========================================
            BACK
            ========================================= */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#008f4c] transition hover:text-[#007d42]"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}

/* =========================================
   PRODUCT DETAIL PAGE
   ========================================= */
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
