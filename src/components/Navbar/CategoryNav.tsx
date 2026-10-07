"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Category } from "@/types";

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({
  categories,
}: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-[#edf1ee] bg-white">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <nav className="scrollbar-hide flex h-[38px] items-center justify-center gap-1 overflow-x-auto sm:gap-2">
          {categories.map((category) => {
            const href = `/category/${category.slug}`;

            const isActive =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={category.id}
                href={href}
                className={`
                  flex h-[28px] shrink-0
                  items-center gap-1.5
                  rounded-full
                  px-2.5
                  text-[10px]
                  font-medium
                  transition-all
                  duration-200
                  sm:px-3
                  sm:text-[11px]
                  ${
                    isActive
                      ? "bg-[#e6f5ec] text-[#008f4c]"
                      : "text-[#555d58] hover:bg-[#f2f5f3] hover:text-[#008f4c]"
                  }
                `}
              >
                <span className="text-[11px]">
                  {category.icon}
                </span>

                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

