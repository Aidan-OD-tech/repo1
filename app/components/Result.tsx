"use client";

import { useState } from "react";
import type { Bet } from "../types";

type ResultProps = {
  bet: Bet;
  elapsedMs: number;
  onSave: (completed: boolean) => void;
};

function formatTime(totalMinutes: number) {
  const totalSeconds = Math.round(totalMinutes * 60);
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  const rounded = Math.round(totalMinutes);
  if (rounded >= 60) {
    return `${Math.floor(rounded / 60)}h ${rounded % 60}m`;
  }
  return `${rounded}m`;
}

export default function Result({ bet, elapsedMs, onSave }: ResultProps) {
  const [completed, setCompleted] = useState<boolean | null>(null);

  const actualMinutes = elapsedMs / 60000;
  const diffMinutes = Math.round(actualMinutes - bet.estimateMinutes);
  const diffText = `${diffMinutes > 0 ? "+" : ""}${diffMinutes} min`;

  const percent = Math.round(
    ((actualMinutes - bet.estimateMinutes) / bet.estimateMinutes) * 100,
  );
  let errorText = "Right on";
  if (percent > 0) errorText = `Over by ${percent}%`;
  if (percent < 0) errorText = `Under by ${Math.abs(percent)}%`;

  const choiceClass = (selected: boolean) =>
    `rounded-lg border px-6 py-3 font-medium ${
      selected
        ? "border-zinc-900 bg-zinc-900 text-white"
        : "border-zinc-300 hover:bg-zinc-100"
    }`;

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-8 py-24">
        <h1 className="text-3xl font-bold tracking-tight">Reality Check</h1>
        <dl className="flex flex-col gap-2">
          <div className="flex gap-2">
            <dt className="text-zinc-500">You called:</dt>
            <dd className="font-medium">{formatTime(bet.estimateMinutes)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-zinc-500">Reality:</dt>
            <dd className="font-medium">{formatTime(actualMinutes)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-zinc-500">Difference:</dt>
            <dd className="font-medium">{diffText}</dd>
          </div>
        </dl>
        <p className="text-xl font-semibold">{errorText}</p>

        <p>Did you finish what you intended?</p>
        <div className="flex gap-3">
          <button
            type="button"
            aria-pressed={completed === true}
            onClick={() => setCompleted(true)}
            className={choiceClass(completed === true)}
          >
            Yes
          </button>
          <button
            type="button"
            aria-pressed={completed === false}
            onClick={() => setCompleted(false)}
            className={choiceClass(completed === false)}
          >
            No
          </button>
        </div>

        <button
          type="button"
          disabled={completed === null}
          onClick={() => {
            if (completed !== null) onSave(completed);
          }}
          className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:hover:bg-zinc-300"
        >
          Save Result
        </button>
      </main>
    </div>
  );
}
