"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");

    setIsLoggedIn(!!authUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");

    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className="flex h-[30px] items-center rounded-full border border-[#dfe6e1] px-3 text-[10px] font-medium text-[#202522] transition-colors hover:border-[#008f4c] hover:text-[#008f4c] sm:h-[32px] sm:px-3.5 sm:text-[11px]"
        >
          প্রোফাইল
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex h-[30px] items-center rounded-full bg-[#008f4c] px-3 text-[10px] font-medium text-white transition-colors hover:bg-[#007d42] sm:h-[32px] sm:px-3.5 sm:text-[11px]"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="flex h-[30px] items-center rounded-full border border-[#dfe6e1] px-3 text-[10px] font-medium text-[#202522] transition-colors hover:border-[#008f4c] hover:text-[#008f4c] sm:h-[32px] sm:px-3.5 sm:text-[11px]"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="flex h-[30px] items-center rounded-full bg-[#008f4c] px-3 text-[10px] font-medium text-white transition-colors hover:bg-[#007d42] sm:h-[32px] sm:px-3.5 sm:text-[11px]"
      >
        সাইন আপ
      </Link>
    </div>
  );
}

