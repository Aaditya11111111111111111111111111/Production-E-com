import { Trash2, ToggleRight, ToggleLeft, X } from "lucide-react";

/**
 * Bulk action bar — shown when selectedIds.length > 0.
 * Props:
 *   count         – number of selected items
 *   onClear       – deselect all
 *   onDelete      – bulk delete
 *   onActivate    – bulk activate
 *   onDeactivate  – bulk deactivate
 */
const BulkActions = ({ count, onClear, onDelete, onActivate, onDeactivate }) => {
  if (count === 0) return null;

  return (
    <div className="flex items-center gap-3 flex-wrap bg-green-50 border border-green-200 rounded-xl px-4 py-3">
      <span className="text-sm font-semibold text-green-700">
        {count} selected
      </span>

      <div className="flex items-center gap-2 flex-wrap ml-2">
        <button
          onClick={onActivate}
          className="flex items-center gap-1.5 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition"
        >
          <ToggleRight size={13} /> Activate
        </button>
        <button
          onClick={onDeactivate}
          className="flex items-center gap-1.5 text-xs font-semibold bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition"
        >
          <ToggleLeft size={13} /> Deactivate
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>

      <button
        onClick={onClear}
        className="ml-auto text-green-600 hover:text-green-800 transition"
        aria-label="Clear selection"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default BulkActions;
