import Link from "next/link";

import { getProducts } from "@/lib/api";
import type { Product } from "@/types";

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
   PRODUCT DETAIL PAGE
   ========================================= */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.pct === 0;

  const changeText = isFlat
    ? `—${toBanglaNumber(Math.abs(product.change.pct))}%`
    : `${isUp ? "▲" : "▼"} ${toBanglaNumber(Math.abs(product.change.pct))}%`;

  return (
    <main className="min-h-screen bg-[#f5f8f5]">
      <section className="w-full">
        <div className="mx-auto w-[90%] py-8 sm:py-10 md:py-14">
          {/* BACK BUTTON */}
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-1 text-[11px] font-medium text-[#737a76] transition-colors hover:text-[#008f4c]"
          >
            ← সব পণ্যে ফিরে যান
          </Link>

          {/* PRODUCT DETAIL CARD */}
          <div className="overflow-hidden rounded-[20px] border border-[#edf1ee] bg-white shadow-sm">
            <div className="grid md:grid-cols-2">
              {/* =====================================
                  PRODUCT IMAGE
                  ===================================== */}
              <div className="flex min-h-[280px] items-center justify-center bg-[#f8faf8] p-8 sm:min-h-[350px] md:min-h-[450px]">
                <span className="text-[90px] sm:text-[110px] md:text-[130px]">
                  {product.image || product.categoryIcon || "🛒"}
                </span>
              </div>

              {/* =====================================
                  PRODUCT INFO
                  ===================================== */}
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                {/* CATEGORY */}
                {product.category && (
                  <p className="text-[10px] font-semibold text-[#008f4c] sm:text-[11px]">
                    {product.category}
                  </p>
                )}

                {/* PRODUCT NAME */}
                <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.7px] text-[#202522] sm:text-[34px] md:text-[40px]">
                  {product.nameBn}
                </h1>

                {/* UNIT */}
                <p className="mt-2 text-[11px] text-[#737a76] sm:text-[12px]">
                  প্রতি {getUnitName(product.unit)}
                </p>

                {/* PRICE */}
                <div className="mt-8">
                  <p className="text-[11px] text-[#737a76]">আজকের দাম</p>

                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <p className="text-[30px] font-bold text-[#202522] sm:text-[36px]">
                      {toBanglaNumber(product.today)} টাকা
                    </p>

                    {/* CHANGE */}
                    <span
                      className={`badge h-auto min-h-0 rounded-full border-0 px-3 py-1.5 text-[10px] font-bold ${
                        isUp
                          ? "bg-[#e8f7ee] text-[#079447]"
                          : isDown
                            ? "bg-[#fff0ee] text-[#e74c3c]"
                            : "bg-[#f1f3f2] text-[#737a76]"
                      }`}
                    >
                      {changeText}
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                {product.description && (
                  <div className="mt-7 border-t border-[#edf1ee] pt-6">
                    <h2 className="text-[13px] font-bold text-[#202522]">
                      পণ্য সম্পর্কে
                    </h2>

                    <p className="mt-2 text-[11px] leading-6 text-[#737a76] sm:text-[12px]">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* BACK HOME */}
                <Link
                  href="/"
                  className="btn mt-8 h-[42px] min-h-[42px] w-full rounded-full border-0 bg-[#008f4c] text-[11px] font-semibold text-white hover:bg-[#007d42] sm:w-fit sm:px-7"
                >
                  ← সব পণ্য দেখুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
