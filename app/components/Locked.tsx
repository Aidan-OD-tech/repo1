import type { Bet, QuoteState } from "../types";

type LockedProps = {
  bet: Bet;
  quote: QuoteState;
  onStart: () => void;
  onBack: () => void;
};

export default function Locked({ bet, quote, onStart, onBack }: LockedProps) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-8 py-24">
        <h1 className="text-3xl font-bold tracking-tight">Locked in</h1>
        <ul className="flex flex-col gap-1 text-zinc-700">
          <li>Task: {bet.task}</li>
          <li>Estimate: {bet.estimateMinutes} minutes</li>
          <li>Confidence: {bet.confidence}%</li>
        </ul>
        {quote.status === "loading" && (
          <p className="text-zinc-500">Loading a quote...</p>
        )}
        {quote.status === "success" && (
          <p className="text-zinc-700">
            &ldquo;{quote.quote}&rdquo;
            {quote.author && ` - ${quote.author}`}
          </p>
        )}
        {quote.status === "error" && (
          <p className="text-sm text-zinc-500">
            Couldn&apos;t load a quote. You can still start your timer.
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onStart}
            className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700"
          >
            Start Timer
          </button>
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
