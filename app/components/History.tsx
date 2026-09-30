import { formatDuration, formatError } from "../format";
import type { CompletedBet } from "../types";

type HistoryProps = {
  history: CompletedBet[];
  onBack: () => void;
};

export default function History({ history, onBack }: HistoryProps) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-8 py-24">
        <h1 className="text-3xl font-bold tracking-tight">Your calls</h1>

        {history.length === 0 ? (
          <p className="text-zinc-500">No bets yet. Make your first call.</p>
        ) : (
          <ul className="flex w-full flex-col gap-3">
            {history.map((bet) => (
              <li
                key={bet.id}
                className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4"
              >
                <p className="font-semibold">{bet.task}</p>
                <p className="text-zinc-600">
                  Estimate: {bet.estimateMinutes} min · Actual:{" "}
                  {formatDuration(bet.actualMs)}
                </p>
                <p className="text-zinc-600">
                  {bet.confidence}% confidence · Error:{" "}
                  {formatError(bet.estimateMinutes, bet.actualMs)}
                </p>
                <p className="text-zinc-500">
                  {bet.completed ? "Finished" : "Not finished"}
                </p>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100"
        >
          Back to Home
        </button>
      </main>
    </div>
  );
}
