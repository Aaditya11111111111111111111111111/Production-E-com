import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(null);

const STORAGE_KEY = "vendor_notifications";

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []; }
  catch { return []; }
}

function save(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(load);

  const push = useCallback((type, message) => {
    const item = {
      id: Date.now(),
      type,   // "success" | "warning" | "error" | "info"
      message,
      read: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString(),
    };
    setNotifications((prev) => {
      const updated = [item, ...prev].slice(0, 50); // cap at 50
      save(updated);
      return updated;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      save(updated);
      return updated;
    });
  }, []);

  const remove = useCallback((id) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      save(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    save([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, push, markAllRead, remove, clearAll, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be inside <NotificationProvider>");
  return ctx;
}
