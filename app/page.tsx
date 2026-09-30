"use client";

import { useState } from "react";
import CreateBet from "./components/CreateBet";
import Home from "./components/Home";
import type { Bet } from "./types";

type Screen = "home" | "create" | "locked";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [currentBet, setCurrentBet] = useState<Bet | null>(null);

  function handleLockIn(
    task: string,
    estimateMinutes: number,
    confidence: number,
  ) {
    setCurrentBet({
      id: crypto.randomUUID(),
      task,
      estimateMinutes,
      confidence,
      createdAt: Date.now(),
    });
    setScreen("locked");
  }

  if (screen === "home") {
    return <Home onMakeBet={() => setScreen("create")} />;
  }

  if (screen === "create") {
    return (
      <CreateBet onLockIn={handleLockIn} onBack={() => setScreen("home")} />
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-8 py-24">
        <p className="text-lg">Locked screen coming next</p>
        {currentBet && (
          <ul className="flex flex-col gap-1 text-zinc-700">
            <li>Task: {currentBet.task}</li>
            <li>Estimate: {currentBet.estimateMinutes} minutes</li>
            <li>Confidence: {currentBet.confidence}%</li>
          </ul>
        )}
        <button
          onClick={() => setScreen("home")}
          className="rounded-lg border border-zinc-300 px-5 py-2 font-medium hover:bg-zinc-100"
        >
          Back to Home
        </button>
      </main>
    </div>
  );
}
