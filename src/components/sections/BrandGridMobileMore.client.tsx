"use client";

import { useState } from "react";
import Link from "next/link";
import { Brand } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function BrandGridMobileMore({
  brands,
  basePath,
  linkMode,
}: {
  brands: Brand[];
  basePath: string;
  linkMode: "canonical" | "geo";
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {brands.map((brand, idx) => (
        <div
          key={`${brand.slug}-${brand.type}-${idx}`}
          className={cn(
            "p-1.5 md:p-2 lg:p-2.5",
            "w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6",
            !expanded ? "hidden md:block" : "block"
          )}
        >
          <Link
            href={
              linkMode === "canonical"
                ? `/servis/${brand.slug}-${brand.type}-servisi`
                : `${basePath}/${brand.slug}-${brand.type}-servisi`
            }
            className="flex items-center justify-center text-center px-3 py-3 md:py-5 min-h-[56px] md:min-h-[72px] bg-white border border-gray-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-brand-red/40 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:text-brand-red font-semibold text-gray-700 transition-all text-xs md:text-base group h-full w-full"
          >
            <span className="transition-transform group-hover:scale-105">{brand.name}</span>
          </Link>
        </div>
      ))}

      <div className="flex justify-center mt-10 md:hidden w-full">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "group flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm border",
            expanded
              ? "bg-white border-gray-200 text-gray-500"
              : "bg-white border-gray-200 text-brand-dark hover:border-brand-red/30 hover:shadow-md"
          )}
        >
          {expanded ? (
            <>
              Daha Az Göster{" "}
              <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </>
          ) : (
            <>
              Tümünü Gör{" "}
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </>
          )}
        </button>
      </div>
    </>
  );
}
