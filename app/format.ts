export function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  const totalMinutes = Math.floor(totalSeconds / 60);
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
}

export function formatError(estimateMinutes: number, actualMs: number): string {
  const actualMinutes = actualMs / 60000;
  const percent =
    Math.round(((actualMinutes - estimateMinutes) / estimateMinutes) * 100) || 0;
  return `${percent > 0 ? "+" : ""}${percent}%`;
}
