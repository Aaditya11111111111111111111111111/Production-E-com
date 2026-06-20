import { useState } from "react";
import { Bell, Store, Globe, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const STORAGE_KEY = "vendor_settings";

const DEFAULTS = {
  storeVisible:       true,
  emailNotifications: true,
  orderAlerts:        true,
  reviewAlerts:       false,
  language:           "en",
};

function loadSettings() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? { ...DEFAULTS, ...JSON.parse(s) } : DEFAULTS;
  } catch { return DEFAULTS; }
}

const Toggle = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-green-400 ${
        checked ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`} />
    </button>
  </div>
);

function VendorSettings() {
  const [settings, setSettings] = useState(loadSettings);
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  const set = (key) => (val) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!pw.current) { toast.error("Enter current password"); return; }
    if (pw.next.length < 8) { toast.error("New password must be at least 8 characters"); return; }
    if (pw.next !== pw.confirm) { toast.error("Passwords do not match"); return; }
    toast.success("Password updated (mock — no backend yet)");
    setPw({ current: "", next: "", confirm: "" });
  };

  const LANGUAGES = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "ar", label: "العربية" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your store preferences.</p>
      </div>

      {/* Store visibility */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-3">
          <Store size={16} className="text-green-600" />
          <h2 className="text-sm font-bold text-gray-800">Store</h2>
        </div>
        <Toggle
          checked={settings.storeVisible}
          onChange={set("storeVisible")}
          label="Store Visibility"
          description="When off, your store won't appear to customers"
        />
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-3">
          <Bell size={16} className="text-blue-600" />
          <h2 className="text-sm font-bold text-gray-800">Notifications</h2>
        </div>
        <Toggle
          checked={settings.emailNotifications}
          onChange={set("emailNotifications")}
          label="Email Notifications"
          description="Receive updates via email"
        />
        <Toggle
          checked={settings.orderAlerts}
          onChange={set("orderAlerts")}
          label="Order Alerts"
          description="Notified when a new order is placed"
        />
        <Toggle
          checked={settings.reviewAlerts}
          onChange={set("reviewAlerts")}
          label="Review Alerts"
          description="Notified when customers leave reviews"
        />
      </div>

      {/* Language */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-purple-600" />
          <h2 className="text-sm font-bold text-gray-800">Language</h2>
        </div>
        <select
          value={settings.language}
          onChange={(e) => set("language")(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 bg-white w-full sm:w-48"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Lock size={16} className="text-red-500" />
          <h2 className="text-sm font-bold text-gray-800">Change Password</h2>
          <span className="text-xs text-gray-400">(UI only)</span>
        </div>
        <form onSubmit={handleSavePassword} className="flex flex-col gap-3">
          {[
            { key: "current", label: "Current Password" },
            { key: "next",    label: "New Password" },
            { key: "confirm", label: "Confirm New Password" },
          ].map(({ key, label }) => (
            <div key={key} className="relative">
              <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={pw[key]}
                  onChange={(e) => setPw((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition w-fit"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default VendorSettings;
