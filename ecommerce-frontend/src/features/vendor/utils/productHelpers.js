/** Returns stock status string for a product */
export function stockStatus(stock) {
  if (stock === 0)  return "out";
  if (stock < 10)   return "low";
  return "ok";
}

/** Returns Tailwind classes for a stock status */
export function stockBadgeClass(stock) {
  if (stock === 0)  return "bg-red-100 text-red-600";
  if (stock < 10)   return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
}

export function stockLabel(stock) {
  if (stock === 0)  return "Out of Stock";
  if (stock < 10)   return `Low Stock (${stock})`;
  return String(stock);
}
