import { formatDuration, formatError } from "../format";
import type { CompletedBet } from "../types";

type HomeProps = {
  history: CompletedBet[];
  historyLoaded: boolean;
  onMakeBet: () => void;
  onViewHistory: () => void;
};

export default function Home({
  history,
  historyLoaded,
  onMakeBet,
  onViewHistory,
}: HomeProps) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-8 py-24">
        <header className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight">Tiny Bet</h1>
          <p className="text-lg text-zinc-600">How good is your judgment?</p>
          <div className="pt-3">
            <button
              onClick={onMakeBet}
              className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700"
            >
              Make a Bet
            </button>
          </div>
        </header>

        <section className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold">Recent calls</h2>
          {!historyLoaded ? (
            <p className="text-zinc-500">Loading...</p>
          ) : history.length === 0 ? (
            <p className="text-zinc-500">No bets yet. Make your first call.</p>
          ) : (
            <>
              <ul className="flex flex-col gap-2">
                {history.slice(0, 3).map((bet) => (
                  <li key={bet.id} className="text-zinc-700">
                    {bet.task}: {bet.estimateMinutes} min {"->"}{" "}
                    {formatDuration(bet.actualMs)}, {bet.confidence}% confidence,{" "}
                    {formatError(bet.estimateMinutes, bet.actualMs)}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onViewHistory}
                  className="rounded-lg border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-100"
                >
                  View all history
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
