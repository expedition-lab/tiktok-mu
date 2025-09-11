"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Unlock() {
  const [code, setCode] = useState("");
  const router = useRouter();

  return (
    <main className="min-h-screen grid place-items-center bg-[#0e0f12] text-white p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(`/dashboard?passcode=${encodeURIComponent(code)}`);
        }}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-4"
      >
        <h1 className="text-lg font-semibold mb-3">Enter passcode</h1>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Passcode"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <button
          type="submit"
          className="mt-3 w-full rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90"
        >
          Unlock
        </button>
      </form>
    </main>
  );
}
