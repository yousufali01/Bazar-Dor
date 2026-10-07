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
          className="btn btn-ghost btn-xs h-[30px] min-h-[30px] rounded-full border border-[#dfe6e1] px-3 text-[10px] font-medium normal-case text-[#202522] hover:border-[#008f4c] hover:bg-transparent hover:text-[#008f4c] sm:h-[32px] sm:min-h-[32px] sm:px-3.5 sm:text-[11px]"
        >
          প্রোফাইল
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-xs h-[30px] min-h-[30px] rounded-full border-0 bg-[#008f4c] px-3 text-[10px] font-medium normal-case text-white hover:bg-[#007d42] sm:h-[32px] sm:min-h-[32px] sm:px-3.5 sm:text-[11px]"
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
        className="btn btn-ghost btn-xs h-[30px] min-h-[30px] rounded-full border border-[#dfe6e1] px-3 text-[10px] font-medium normal-case text-[#202522] hover:border-[#008f4c] hover:bg-transparent hover:text-[#008f4c] sm:h-[32px] sm:min-h-[32px] sm:px-3.5 sm:text-[11px]"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="btn btn-xs h-[30px] min-h-[30px] rounded-full border-0 bg-[#008f4c] px-3 text-[10px] font-medium normal-case text-white hover:bg-[#007d42] sm:h-[32px] sm:min-h-[32px] sm:px-3.5 sm:text-[11px]"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
