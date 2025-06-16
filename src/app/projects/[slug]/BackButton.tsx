
"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-block border-primary bg-[#072d7f] text-white hover:bg-white hover:text-[#072d7f] hover:border-[#072d7f] border-2 border-[#072d7f] transition-colors duration-300  font-medium px-6 py-3 rounded-full"
    >
      ← Back to Portfolio
    </button>
  );
}
