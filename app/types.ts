export type Bet = {
  id: string;
  task: string;
  estimateMinutes: number;
  confidence: number;
  createdAt: number;
};

export type CompletedBet = Bet & { actualMs: number; completed: boolean };
