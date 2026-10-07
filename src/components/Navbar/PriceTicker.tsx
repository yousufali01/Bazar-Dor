import type { Product } from "@/types";

interface PriceTickerProps {
  products: Product[];
}

function getUnitName(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    piece: "টি",
    pcs: "টি",
    dozen: "ডজন",
    gram: "গ্রাম",
    gm: "গ্রাম",
  };

  return units[unit.toLowerCase()] || unit;
}

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  /*
   * Duplicate the complete product list.
   * This creates a seamless infinite marquee.
   */
  const tickerProducts = [...products, ...products];

  return (
    <div className="w-full overflow-hidden border-b border-[#dfe6e1] bg-[#f8faf8]">
      <div className="ticker-track flex w-max">
        {tickerProducts.map((product, index) => {
          const isDown = product.change.dir === "down";
          const percentage = Math.abs(product.change.pct);

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex h-[30px] shrink-0 items-center gap-1.5 border-r border-[#e1e6e2] px-4 text-[9px] text-[#505752] sm:px-5 sm:text-[10px]"
            >
              {/* Product Emoji */}
              <span className="text-[11px]">
                {product.image ||
                  product.categoryIcon ||
                  "🛒"}
              </span>

              {/* Product Name */}
              <span className="whitespace-nowrap font-medium">
                {product.nameBn}
              </span>

              {/* Price */}
              <span className="whitespace-nowrap">
                {product.today} টাকা/
                {getUnitName(product.unit)}
              </span>

              {/* Change */}
              <span
                className={`whitespace-nowrap font-bold ${
                  isDown
                    ? "text-[#e74c3c]"
                    : "text-[#079447]"
                }`}
              >
                {isDown ? "▼" : "▲"} {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

