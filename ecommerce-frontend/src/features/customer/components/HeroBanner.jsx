import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";


const HERO_IMAGE_URL =
  "https://images.pexels.com/photos/18265010/pexels-photo-18265010.jpeg";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        aria-hidden="true"
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" aria-hidden="true" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-14 md:px-16">
        {/* Text */}
        <div className="flex flex-col gap-5 max-w-lg">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit">
            🔥 Summer Sale — Up to 50% Off
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Shop Smarter, <br /> Live Better
          </h1>
          <p className="text-blue-100 text-base md:text-lg leading-relaxed">
            Discover thousands of products across all categories. Free shipping on orders over $50.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              to="/customer/products"
              className="flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition shadow"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link
              to="/customer/products"
              className="flex items-center gap-2 border border-white/50 text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition"
            >
              Browse Deals
            </Link>
          </div>
        </div>

        {/* Illustration / stats */}
        <div className="hidden md:flex flex-col items-center gap-4">
          <div className="text-7xl select-none">🛍️</div>
          <div className="flex gap-6 mt-2">
            {[
              { value: "50K+", label: "Products" },
              { value: "10K+", label: "Brands" },
              { value: "2M+",  label: "Customers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-blue-200 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
