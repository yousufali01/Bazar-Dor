"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setToday(date);
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[90%] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="hero min-h-[420px] overflow-hidden rounded-[24px] bg-[#eaf7f0]">
          <div className="hero-content w-full flex-col justify-between gap-10 p-6 sm:p-10 lg:flex-row lg:p-14">
            {/* LEFT CONTENT */}
            <div className="w-full max-w-[520px] text-center lg:text-left">
              {/* EYEBROW */}
              <div className="mb-4">
                <span className="badge badge-outline h-auto rounded-full border-[#008f4c] px-3 py-2 text-[10px] font-semibold text-[#008f4c] sm:text-[11px]">
                  📅 {today || "আজকের বাজারের আপডেট"}
                </span>
              </div>

              {/* MAIN HEADING */}
              <h2 className="text-[32px] font-bold leading-[1.15] tracking-[-1px] text-[#202522] sm:text-[42px] lg:text-[48px]">
                আজকের বাজার দর
                <br />
                <span className="text-[#008f4c]">এক নজরেই জানুন</span>
              </h2>

              {/* SUBTITLE */}
              <p className="mx-auto mt-5 max-w-[470px] text-[13px] leading-6 text-[#737a76] sm:text-[15px] lg:mx-0">
                আপনার প্রয়োজনীয় সব পণ্যের সর্বশেষ বাজার মূল্য জানুন সহজেই।
                প্রতিদিনের আপডেটেড দাম ও বাজারের তথ্য থাকুক আপনার হাতের মুঠোয়।
              </p>

              {/* CTA */}
              <div className="mt-7">
                <a
                  href="#সব-পণ্য"
                  className="btn h-[42px] min-h-[42px] rounded-full border-0 bg-[#008f4c] px-6 text-[12px] font-semibold normal-case text-white shadow-sm hover:bg-[#007d42] sm:h-[46px] sm:min-h-[46px] sm:px-7 sm:text-[13px]"
                >
                  সব পণ্য দেখুন
                  <span className="text-[14px]">↓</span>
                </a>
              </div>
            </div>

            {/* RIGHT HERO IMAGE */}
            <div className="flex w-full max-w-[470px] items-center justify-center lg:w-[46%]">
              <div className="relative w-full">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর - বাজারের পণ্যের ছবি"
                  width={600}
                  height={450}
                  priority
                  className="h-auto w-full object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
