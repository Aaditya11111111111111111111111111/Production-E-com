/**
 * Full-page auth wrapper.
 * Renders a centered card with a decorative brand panel on larger screens.
 *
 * Props:
 *   accent  — "blue" | "violet"  (default "blue")
 *   panel   — optional JSX for the left brand panel (desktop only)
 */
import logo from "@/assets/images/logo.png";

const HERO_IMAGE =
  "https://images.pexels.com/photos/18265010/pexels-photo-18265010.jpeg";

const AuthCard = ({ children, accent = "blue", panel }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden flex min-h-[540px]">

          {/* ── Left brand panel (desktop) ─────────────────── */}
          <div
            className="hidden lg:flex flex-col justify-between w-[42%] relative overflow-hidden"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
              aria-hidden="true"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 60%, rgba(15,23,42,0.50) 100%)" }}
              aria-hidden="true"
            />
            {/* Content on top */}
            <div className="relative z-10 flex flex-col justify-between h-full p-10 text-white">
              {panel ?? <DefaultPanel />}
            </div>
          </div>

          {/* ── Right form panel ──────────────────────────── */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10 lg:px-10">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

const DefaultPanel = () => (
  <>
    <div>
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-10 w-auto object-contain brightness-0 invert" />
      </div>
      <h2 className="text-2xl font-bold leading-snug">
        The smarter way<br />to shop & sell.
      </h2>
      <p className="mt-3 text-sm text-white/70 leading-relaxed">
        Join thousands of customers and vendors building their experience on our platform.
      </p>
    </div>
    <p className="text-xs text-white/40">© 2025 ECommerce. All rights reserved.</p>
  </>
);

export default AuthCard;
