"use client";

import dynamic from "next/dynamic";

const MobileStickyCTA = dynamic(() => import("./MobileStickyCTA"), {
  ssr: false,
});

export default function MobileCTALoader() {
  return <MobileStickyCTA />;
}
