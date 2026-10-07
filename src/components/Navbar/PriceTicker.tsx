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

export default function PriceTicker({ products }: PriceTickerProps) {
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
              {/* PRODUCT ICON */}
              <span className="text-[11px]">
                {product.image || product.categoryIcon || "🛒"}
              </span>

              {/* PRODUCT NAME */}
              <span className="whitespace-nowrap font-medium">
                {product.nameBn}
              </span>

              {/* PRICE */}
              <span className="whitespace-nowrap">
                {product.today} টাকা/
                {getUnitName(product.unit)}
              </span>

              {/* PRICE CHANGE */}
              <span
                className={`badge badge-ghost h-auto min-h-0 border-0 bg-transparent p-0 text-[9px] font-bold sm:text-[10px] ${
                  isDown ? "text-[#e74c3c]" : "text-[#079447]"
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
