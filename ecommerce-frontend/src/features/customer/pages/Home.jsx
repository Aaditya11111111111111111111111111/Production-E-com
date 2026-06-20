import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import NewsletterBanner from "../components/NewsletterBanner";
import { featuredProducts, newArrivals, bestSellers } from "@/data/products";

function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <HeroBanner />

      {/* Categories */}
      <CategoryGrid />

      {/* Featured Products */}
      <ProductGrid
        title="Featured Products"
        products={featuredProducts}
        viewAllTo="/customer/products"
      />

      {/* New Arrivals */}
      <ProductGrid
        title="New Arrivals"
        products={newArrivals}
        viewAllTo="/customer/products?filter=new"
      />

      {/* Best Sellers */}
      <ProductGrid
        title="Best Sellers"
        products={bestSellers}
        viewAllTo="/customer/products?filter=best"
      />

      {/* Newsletter */}
      <NewsletterBanner />
    </div>
  );
}

export default Home;
