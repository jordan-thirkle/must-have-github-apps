export function formatStars(value?: number) {
  if (value === undefined) return undefined;
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(1).replace('.0', '')}k`;
  return `${(value / 1_000_000).toFixed(1).replace('.0', '')}m`;
}
