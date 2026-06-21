import { useState, useMemo } from "react";

/**
 * Pagination hook.
 * @param {any[]} items   - full list to paginate
 * @param {number} pageSize - items per page (default 10)
 * @returns {{ page, totalPages, paginated, setPage, goNext, goPrev, reset }}
 */
export function usePagination(items, pageSize = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // If filters change and the current page goes out of bounds, clamp
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, safePage, pageSize]
  );

  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const reset  = () => setPage(1);

  return { page: safePage, totalPages, paginated, setPage, goNext, goPrev, reset };
}
