export type Bet = {
  id: string;
  task: string;
  estimateMinutes: number;
  confidence: number;
  createdAt: number;
};

export type QuoteState = {
  status: "idle" | "loading" | "success" | "error";
  quote: string;
  author: string;
};

export type CompletedBet =Bet & { actualMs: number; completed: boolean };
