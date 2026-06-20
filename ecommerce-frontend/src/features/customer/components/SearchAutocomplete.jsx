import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";

/**
 * Reusable search input with live autocomplete dropdown.
 *
 * Props:
 *   initialValue   – pre-fill the input (e.g. from URL ?q=)
 *   onQueryChange  – called on every keystroke (optional, for inline filtering)
 *   placeholder    – input placeholder text
 *   variant        – "navbar" (pill style) | "inline" (border style)
 */
const SearchAutocomplete = ({
  initialValue = "",
  onQueryChange,
  placeholder = "Search products...",
  variant = "navbar",
}) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // ── Compute suggestions whenever query changes ────────────
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const q = trimmed.toLowerCase();
    const matched = products
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 8); // cap at 8 suggestions
    setSuggestions(matched);
    setOpen(matched.length > 0);
    setActiveIndex(-1);
  }, [query]);

  // ── Notify parent for inline filtering ────────────────────
  useEffect(() => {
    onQueryChange?.(query);
  }, [query, onQueryChange]);

  // ── Close on outside click ────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Navigate to product detail page ───────────────────────
  const goToProduct = useCallback(
    (product) => {
      setOpen(false);
      setQuery(product.name);
      navigate(`/customer/product/${product.id}`);
    },
    [navigate]
  );

  // ── Submit full search → products page ───────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    navigate(`/customer/products?q=${encodeURIComponent(trimmed)}`);
  };

  // ── Keyboard navigation ───────────────────────────────────
  const handleKeyDown = (e) => {
    if (!open || !suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      goToProduct(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const clearQuery = () => {
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    onQueryChange?.("");
    inputRef.current?.focus();
  };

  // ── Highlight matched portion of text ─────────────────────
  const highlight = (text, q) => {
    if (!q.trim()) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-200 text-gray-900 rounded">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const isNavbar = variant === "navbar";

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 ${
          isNavbar
            ? "bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition"
            : "bg-white border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition"
        }`}
      >
        <Search size={16} className="text-gray-400 shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Search products"
          aria-autocomplete="list"
          aria-expanded={open}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
        />

        {query && (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search"
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {/* ── Dropdown ─────────────────────────────────────────── */}
      {open && (
        <ul
          role="listbox"
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {suggestions.map((product, i) => (
            <li
              key={product.id}
              role="option"
              aria-selected={activeIndex === i}
              onMouseDown={() => goToProduct(product)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                activeIndex === i ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              {/* Thumbnail */}
              <img
                src={product.image}
                alt=""
                className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0"
              />

              <div className="flex flex-col min-w-0">
                <span className="text-sm text-gray-800 line-clamp-1">
                  {highlight(product.name, query.trim())}
                </span>
                <span className="text-xs text-gray-400 capitalize">
                  {product.category.replace("-", " ")} · ${product.price.toFixed(2)}
                </span>
              </div>
            </li>
          ))}

          {/* Footer: "See all results" */}
          <li
            onMouseDown={handleSubmit}
            className="flex items-center gap-2 px-4 py-2.5 border-t border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <Search size={14} className="text-blue-500 shrink-0" />
            <span className="text-sm text-blue-600 font-medium">
              See all results for "<span className="font-semibold">{query.trim()}</span>"
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchAutocomplete;
