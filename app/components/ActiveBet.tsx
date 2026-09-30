"use client";

import { useEffect, useState } from "react";
import type { Bet } from "../types";

type ActiveBetProps = {
  bet: Bet;
  startTime: number;
  onFinish: (elapsedMs: number) => void;
  onCancel: () => void;
};

function formatElapsed(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ss = String(seconds).padStart(2, "0");
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${ss}`;
  }
  return `${String(minutes).padStart(2, "0")}:${ss}`;
}

export default function ActiveBet({
  bet,
  startTime,
  onFinish,
  onCancel,
}: ActiveBetProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsedMs = Math.max(0, now - startTime);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-8 py-24">
        <h1 className="text-3xl font-bold tracking-tight">{bet.task}</h1>
        <p className="text-zinc-600">
          You called {bet.estimateMinutes} min / {bet.confidence}% confidence
        </p>
        <p className="text-6xl font-bold tabular-nums">
          {formatElapsed(elapsedMs)}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onFinish(Date.now() - startTime)}
            className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700"
          >
            Finish
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100"
          >
            Cancel bet
          </button>
        </div>
      </main>
    </div>
  );
}
