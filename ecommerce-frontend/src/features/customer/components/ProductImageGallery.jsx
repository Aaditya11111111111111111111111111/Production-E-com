import { useState } from "react";

const ProductImageGallery = ({ images = [], name = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border">
        <img
          src={images[activeIndex]}
          alt={`${name} — view ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === i
                  ? "border-blue-600 scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
