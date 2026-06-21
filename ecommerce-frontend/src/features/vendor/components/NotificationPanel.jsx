import { useEffect, useRef } from "react";
import { Bell, X, Check, Trash2, Package, ShoppingBag, AlertTriangle, Info } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

const TYPE_CONFIG = {
  success: { icon: <Check size={14} />,          bg: "bg-green-100 text-green-600" },
  warning: { icon: <AlertTriangle size={14} />,  bg: "bg-yellow-100 text-yellow-600" },
  error:   { icon: <X size={14} />,              bg: "bg-red-100 text-red-600" },
  info:    { icon: <Info size={14} />,            bg: "bg-blue-100 text-blue-600" },
};

/**
 * Notification bell button + dropdown panel.
 * Props: open, onToggle, onClose
 */
const NotificationPanel = ({ open, onToggle, onClose }) => {
  const { notifications, unreadCount, markAllRead, remove, clearAll } = useNotifications();
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  return (
    <div className="relative" ref={ref}>
      {/* Bell button */}
      <button
        onClick={onToggle}
        className="relative text-gray-500 hover:text-gray-700 transition p-1"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden max-w-[calc(100vw-2rem)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">
              Notifications {unreadCount > 0 && <span className="text-green-600">({unreadCount})</span>}
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-green-600 hover:underline font-medium">
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={clearAll} className="text-xs text-red-400 hover:underline font-medium">
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="py-10 text-center text-gray-400">
                <Bell size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => {
                const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.info;
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition ${!n.read ? "bg-green-50/40" : ""}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${cfg.bg}`}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 leading-snug">{n.message}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{n.date} · {n.time}</p>
                    </div>
                    <button
                      onClick={() => remove(n.id)}
                      className="text-gray-300 hover:text-red-400 transition shrink-0 mt-0.5"
                      aria-label="Remove"
                    >
                      <X size={13} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
