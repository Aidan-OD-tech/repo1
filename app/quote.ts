const QUOTE_URL = "https://motivational-spark-api.vercel.app/api/quotes/random";

export async function fetchQuote(): Promise<{ quote: string; author: string }> {
  const response = await fetch(QUOTE_URL);
  if (!response.ok) {
    throw new Error(`Quote request failed: ${response.status}`);
  }
  const data = await response.json();
  if (typeof data.quote !== "string" || data.quote === "") {
    throw new Error("Quote response had no quote");
  }
  return {
    quote: data.quote,
    author: typeof data.author === "string" ? data.author : "",
  };
}
