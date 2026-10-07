import Hero from "@/components/Hero/Hero";
import ProductSections from "@/components/ProductSections/ProductSections";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8f5]">
      <Hero />
      <ProductSections />
    </main>
  );
}
