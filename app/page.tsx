"use client";

import { useState } from "react";
import ActiveBet from "./components/ActiveBet";
import CreateBet from "./components/CreateBet";
import Home from "./components/Home";
import Locked from "./components/Locked";
import type { Bet } from "./types";

type Screen = "home" | "create" | "locked" | "active" | "result";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [currentBet, setCurrentBet] = useState<Bet | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);

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

  function handleResultBack() {
    setStartTime(null);
    setElapsedMs(null);
    setScreen("home");
  }

  if (screen === "create") {
    return (
      <CreateBet onLockIn={handleLockIn} onBack={() => setScreen("home")} />
    );
  }

  if (screen === "locked" && currentBet) {
    return (
      <Locked
        bet={currentBet}
        onStart={() => {
          setStartTime(Date.now());
          setScreen("active");
        }}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "active" && currentBet && startTime !== null) {
    return (
      <ActiveBet
        bet={currentBet}
        startTime={startTime}
        onFinish={(ms) => {
          setElapsedMs(ms);
          setScreen("result");
        }}
        onCancel={() => {
          setStartTime(null);
          setScreen("home");
        }}
      />
    );
  }

  if (screen === "result" && currentBet && elapsedMs !== null) {
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor(elapsedMs / 1000) % 60;
    return (
      <div className="min-h-screen bg-white text-zinc-900">
        <main className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-8 py-24">
          <p className="text-lg">Result screen coming next</p>
          <ul className="flex flex-col gap-1 text-zinc-700">
            <li>Task: {currentBet.task}</li>
            <li>You called {currentBet.estimateMinutes} min</li>
            <li>
              Actual: {minutes}m {seconds}s
            </li>
          </ul>
          <button
            onClick={handleResultBack}
            className="rounded-lg border border-zinc-300 px-5 py-2 font-medium hover:bg-zinc-100"
          >
            Back to Home
          </button>
        </main>
      </div>
    );
  }

  return <Home onMakeBet={() => setScreen("create")} />;
}
