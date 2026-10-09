"use client";

import { useEffect, useState } from "react";

function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function BanglaDate() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(getBanglaDate());
  }, []);

  return (
    <span className="block max-w-full text-[10px] font-medium leading-relaxed text-gray-600 sm:text-[12px]">
      {today}
    </span>
  );
}
