import { useState } from "react";
import { Mail } from "lucide-react";

// Pexels photo by Karolina Grabowska — shopping bags / lifestyle
// https://www.pexels.com/photo/pink-shopping-bags-5632396/
const BG_IMAGE =
  "https://images.pexels.com/photos/19893521/pexels-photo-19893521.jpeg";

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      className="relative rounded-2xl overflow-hidden text-white px-6 py-14 text-center"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/50" />

      {/* content */}
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Mail size={22} />
        </div>

        <h2 className="text-2xl font-bold">Get the best deals first</h2>
        <p className="text-blue-100 text-sm max-w-sm">
          Subscribe to our newsletter and be the first to know about exclusive
          offers, new arrivals, and flash sales.
        </p>

        {submitted ? (
          <div className="bg-white/20 rounded-full px-6 py-3 text-sm font-medium">
            🎉 Thanks for subscribing!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row w-full max-w-md gap-2 mt-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 rounded-full px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-white/50 min-w-0"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-indigo-50 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-xs text-blue-200">No spam, unsubscribe at any time.</p>
      </div>
    </section>
  );
};

export default NewsletterBanner;
