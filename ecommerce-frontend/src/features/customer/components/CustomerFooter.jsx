import { Link } from "react-router-dom";

// Inline SVGs for brand icons (lucide-react v1 dropped brand icons)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const CustomerFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-white text-lg">ECommerce</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop marketplace for everything you need, delivered fast.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition" aria-label="YouTube">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Company</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/customer/about"   className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/customer/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="/customer/blog"    className="hover:text-white transition">Blog</Link></li>
              <li><Link to="/customer/press"   className="hover:text-white transition">Press</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Support</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/customer/contact"  className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/customer/faq"      className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/customer/shipping" className="hover:text-white transition">Shipping Info</Link></li>
              <li><Link to="/customer/returns"  className="hover:text-white transition">Returns</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Legal</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/customer/privacy"  className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/customer/terms"    className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/customer/cookies"  className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {year} ECommerce. All rights reserved.</p>
          <p>Made with ❤️ for great shopping experiences.</p>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;
