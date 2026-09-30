"use client";

import { useState } from "react";
import Home from "./components/Home";

type Screen = "home" | "create";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");

  if (screen === "home") {
    return <Home onMakeBet={() => setScreen("create")} />;
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-8 py-24">
        <p className="text-lg">Create screen coming next</p>
        <button
          onClick={() => setScreen("home")}
          className="rounded-lg border border-zinc-300 px-5 py-2 font-medium hover:bg-zinc-100"
        >
          Back
        </button>
      </main>
    </div>
  );
}
