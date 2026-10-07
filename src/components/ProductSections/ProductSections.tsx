import Image from "next/image";
import Link from "next/link";

import { getProducts } from "@/lib/api";
import type { Product } from "@/types";

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
   PRODUCT IMAGE
   ========================================= */
function ProductVisual({ product }: { product: Product }) {
  const image = product.image || product.categoryIcon || "🛒";

  // Image path হলে actual image দেখাবে
  if (
    typeof image === "string" &&
    (image.startsWith("/") ||
      image.startsWith("http://") ||
      image.startsWith("https://"))
  ) {
    return (
      <Image
        src={image}
        alt={product.nameBn}
        width={100}
        height={100}
        className="h-[52px] w-[52px] object-contain transition-transform duration-200 group-hover:scale-110 sm:h-[62px] sm:w-[62px] md:h-[68px] md:w-[68px]"
      />
    );
  }

  // Emoji হলে
  return (
    <span className="text-[38px] transition-transform duration-200 group-hover:scale-110 sm:text-[46px] md:text-[52px]">
      {image}
    </span>
  );
}

/* =========================================
   PRODUCT CARD
   ========================================= */
function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.pct === 0;

  const changeText = isFlat
    ? `—${toBanglaNumber(Math.abs(product.change.pct))}%`
    : `${isUp ? "▲" : "▼"} ${toBanglaNumber(
        Math.abs(product.change.pct)
      )}%`;

  return (
    <Link
      href={`/products/${product.id}`}
      className="card group w-full min-w-0 border border-[#edf1ee] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#cfe8da] hover:shadow-md"
    >
      <div className="card-body min-w-0 p-3 sm:p-4 md:p-4 lg:p-5">
        {/* =====================================
            PRODUCT IMAGE / EMOJI
            ===================================== */}
        <div className="flex h-[78px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#f8faf8] sm:h-[90px] md:h-[100px] lg:h-[110px]">
          <ProductVisual product={product} />
        </div>

        {/* =====================================
            PRODUCT NAME
            ===================================== */}
        <h3 className="mt-2.5 line-clamp-1 text-[13px] font-bold leading-5 text-[#202522] sm:mt-3 sm:text-[14px] md:text-[15px]">
          {product.nameBn}
        </h3>

        {/* =====================================
            UNIT
            ===================================== */}
        <p className="mt-0.5 text-[9px] text-[#737a76] sm:text-[10px] md:text-[11px]">
          প্রতি {getUnitName(product.unit)}
        </p>

        {/* =====================================
            PRICE ROW
            ===================================== */}
        <div className="mt-2.5 flex min-w-0 items-end justify-between gap-2 sm:mt-3">
          {/* PRICE */}
          <div className="min-w-0">
            <p className="text-[8px] text-[#737a76] sm:text-[9px] md:text-[10px]">
              আজকের দাম
            </p>

            <p className="mt-0.5 truncate text-[15px] font-bold text-[#202522] sm:text-[17px] md:text-[18px] lg:text-[19px]">
              {toBanglaNumber(product.today)} টাকা
            </p>
          </div>

          {/* CHANGE BADGE */}
          <span
            className={`badge h-auto min-h-0 shrink-0 rounded-full border-0 px-1.5 py-1 text-[8px] font-bold sm:px-2 sm:text-[9px] md:text-[10px] ${
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
    </Link>
  );
}

/* =========================================
   PRODUCT GRID
   ========================================= */
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-2.5
        sm:grid-cols-2 sm:gap-4
        md:grid-cols-3 md:gap-5
        lg:grid-cols-4 lg:gap-5
        xl:gap-6
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

/* =========================================
   SECTION HEADER
   ========================================= */
function SectionHeader({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 sm:mb-6 md:mb-7">
      <h2 className="text-[19px] font-bold tracking-[-0.4px] text-[#202522] sm:text-[21px] md:text-[23px] lg:text-[24px]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1 max-w-[600px] text-[9px] leading-5 text-[#737a76] sm:text-[10px] md:text-[11px] lg:text-[12px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* =========================================
   MAIN PRODUCT SECTIONS
   ========================================= */
export default async function ProductSections() {
  const products = await getProducts();

  /* =====================================
     SECTION A — TOP 6 RISERS
     ===================================== */
  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  /* =====================================
     SECTION B — TOP 6 FALLERS
     ===================================== */
  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  return (
    <section className="w-full bg-white">
      {/* =====================================
          90% WIDTH CONTAINER
          ===================================== */}
      <div
        className="
          mx-auto
          w-[90%]
          py-8
          sm:py-10
          md:py-12
          lg:py-14
        "
      >
        {/* =====================================
            SECTION A — PRICE UP
            ===================================== */}
        {risers.length > 0 && (
          <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <SectionHeader
              title={
                <>
                  <span className="text-[#079447]">▲</span>{" "}
                  আজ দাম বেড়েছে
                </>
              }
            />

            <ProductGrid products={risers} />
          </div>
        )}

        {/* =====================================
            SECTION B — PRICE DOWN
            ===================================== */}
        {fallers.length > 0 && (
          <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <SectionHeader
              title={
                <>
                  <span className="text-[#e74c3c]">▼</span>{" "}
                  আজ দাম কমেছে
                </>
              }
            />

            <ProductGrid products={fallers} />
          </div>
        )}

        {/* =====================================
            SECTION C — ALL PRODUCTS
            ===================================== */}
        <div
          id="সব-পণ্য"
          className="scroll-mt-[120px] sm:scroll-mt-[140px]"
        >
          <SectionHeader
            title="সব পণ্য"
            subtitle="সকল পণ্যের সর্বশেষ আপডেটেড বাজার মূল্য একসাথে দেখুন"
          />

          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}

