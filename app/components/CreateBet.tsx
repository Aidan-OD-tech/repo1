"use client";

import { useState } from "react";

const CONFIDENCE_OPTIONS = [50, 60, 70, 80, 90];

type CreateBetProps = {
  onLockIn: (task: string, estimateMinutes: number, confidence: number) => void;
  onBack: () => void;
};

export default function CreateBet({ onLockIn, onBack }: CreateBetProps) {
  const [task, setTask] = useState("");
  const [minutes, setMinutes] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);

  const minutesNum = Number(minutes);
  const taskOk = task.trim() !== "";
  const minutesOk =
    minutes.trim() !== "" && Number.isInteger(minutesNum) && minutesNum > 0;
  const confidenceOk = confidence !== null;
  const canLockIn = taskOk && minutesOk && confidenceOk;

  const missing: string[] = [];
  if (!taskOk) missing.push("a task");
  if (!minutesOk) missing.push("whole minutes above 0");
  if (!confidenceOk) missing.push("a confidence");

  function handleLockIn() {
    if (!canLockIn || confidence === null) return;
    onLockIn(task.trim(), minutesNum, confidence);
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-8 py-24">
        <h1 className="text-3xl font-bold tracking-tight">Make a Bet</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="task" className="font-medium">
            Task
          </label>
          <input
            id="task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What are you going to do?"
            className="rounded-lg border border-zinc-300 px-4 py-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="minutes" className="font-medium">
            Estimated minutes
          </label>
          <input
            id="minutes"
            type="number"
            min={1}
            step={1}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="30"
            className="w-40 rounded-lg border border-zinc-300 px-4 py-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Confidence</span>
          <div className="flex gap-2">
            {CONFIDENCE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setConfidence(option)}
                aria-pressed={confidence === option}
                className={
                  confidence === option
                    ? "rounded-lg border border-zinc-900 bg-zinc-900 px-4 py-2 font-medium text-white"
                    : "rounded-lg border border-zinc-300 px-4 py-2 font-medium hover:bg-zinc-100"
                }
              >
                {option}%
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleLockIn}
              disabled={!canLockIn}
              className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:hover:bg-zinc-300"
            >
              Lock It In
            </button>
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100"
            >
              Back
            </button>
          </div>
          {!canLockIn && (
            <p className="text-sm text-zinc-500">
              Still needed: {missing.join(", ")}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
