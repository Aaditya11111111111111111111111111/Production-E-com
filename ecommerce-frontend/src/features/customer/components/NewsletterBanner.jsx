import { useState } from "react";
import { Mail } from "lucide-react";

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
    <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-12 text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Mail size={22} />
        </div>
        <h2 className="text-2xl font-bold">Get the best deals first</h2>
        <p className="text-blue-100 text-sm">
          Subscribe to our newsletter and be the first to know about exclusive offers, new arrivals, and flash sales.
        </p>

        {submitted ? (
          <div className="bg-white/20 rounded-full px-6 py-3 text-sm font-medium">
            🎉 Thanks for subscribing!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md gap-2 mt-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 rounded-full px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition shrink-0"
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
