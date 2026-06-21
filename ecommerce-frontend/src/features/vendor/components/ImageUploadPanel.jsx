import { useState } from "react";
import { X, Star, PlusCircle, ImageIcon } from "lucide-react";

/**
 * Multi-image upload UI (mock — no backend).
 * Props:
 *   images: string[]         – current image URLs
 *   onChange(images: string[]) – called on any change
 */
const ImageUploadPanel = ({ images = [], onChange }) => {
  const [urlInput, setUrlInput] = useState("");

  const addImage = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (images.includes(url)) { setUrlInput(""); return; }
    onChange([...images, url]);
    setUrlInput("");
  };

  const removeImage = (idx) => {
    const next = images.filter((_, i) => i !== idx);
    onChange(next);
  };

  const setPrimary = (idx) => {
    if (idx === 0) return;
    const next = [...images];
    const [item] = next.splice(idx, 1);
    next.unshift(item);
    onChange(next);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...images];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };

  const moveDown = (idx) => {
    if (idx === images.length - 1) return;
    const next = [...images];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-gray-700">Product Images</p>

      {/* Previews */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((url, idx) => (
            <div
              key={url + idx}
              className={`relative rounded-xl overflow-hidden border-2 aspect-square group ${
                idx === 0 ? "border-green-500" : "border-gray-200"
              }`}
            >
              <img src={url} alt={`Product image ${idx + 1}`} className="w-full h-full object-cover bg-gray-100" />

              {/* Primary badge */}
              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  Primary
                </span>
              )}

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => setPrimary(idx)}
                    title="Set as primary"
                    className="w-7 h-7 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg flex items-center justify-center"
                  >
                    <Star size={12} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  title="Remove"
                  className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Order indicator */}
              <span className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded">
                {idx + 1}/{images.length}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-10 gap-2 text-gray-400">
          <ImageIcon size={28} />
          <p className="text-sm">No images added yet</p>
        </div>
      )}

      {/* Add by URL */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
          placeholder="Paste image URL and press Add..."
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="button"
          onClick={addImage}
          disabled={!urlInput.trim()}
          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition"
        >
          <PlusCircle size={15} /> Add
        </button>
      </div>
      <p className="text-xs text-gray-400">First image is the primary/thumbnail. Hover an image to reorder or remove.</p>
    </div>
  );
};

export default ImageUploadPanel;
