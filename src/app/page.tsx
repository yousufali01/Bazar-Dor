import { Suspense } from "react";

import Hero from "@/components/Hero/Hero";
import ProductSections from "@/components/ProductSections/ProductSections";

function ProductSectionsFallback() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-[90%] py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="h-6 w-40 animate-pulse rounded bg-[#edf1ee]" />

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-[220px] animate-pulse rounded-xl bg-[#f5f8f5]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8f5]">
      <Hero />

      <Suspense fallback={<ProductSectionsFallback />}>
        <ProductSections />
      </Suspense>
    </main>
  );
}
