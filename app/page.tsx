"use client";

import { useState } from "react";
import ActiveBet from "./components/ActiveBet";
import CreateBet from "./components/CreateBet";
import Home from "./components/Home";
import Locked from "./components/Locked";
import Result from "./components/Result";
import { fetchQuote } from "./quote";
import type { Bet, CompletedBet, QuoteState } from "./types";

type Screen = "home" | "create" | "locked" | "active" | "result";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [currentBet, setCurrentBet] = useState<Bet | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);
  const [history, setHistory] = useState<CompletedBet[]>([]);

  const [quoteState, setQuoteState] = useState<QuoteState>({
    status: "idle",
    quote: "",
    author: "",
  });

  async function loadQuote() {
    setQuoteState({ status: "loading", quote: "", author: "" });
    try {
      const data = await fetchQuote();
      setQuoteState({ status: "success", quote: data.quote, author: data.author });
    } catch {
      setQuoteState({ status: "error", quote: "", author: "" });
    }
  }

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
    loadQuote();
  }

  function handleSave(completed: boolean) {
    if (!currentBet || elapsedMs === null) return;
    const record: CompletedBet = { ...currentBet, actualMs: elapsedMs, completed };
    setHistory((prev) => [record, ...prev]);
    console.log("Saved result:", record);
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
        quote={quoteState}
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
    return (
      <Result bet={currentBet} elapsedMs={elapsedMs} onSave={handleSave} />
    );
  }

  return <Home onMakeBet={() => setScreen("create")} />;
}
