export const ROUTES = {
  HOME: "/",

  CUSTOMER_LOGIN: "/login/customer",
  CUSTOMER_REGISTER: "/register/customer",

  VENDOR_LOGIN: "/login/vendor",
  VENDOR_REGISTER: "/register/vendor",

  FORGOT_PASSWORD: "/forgot-password",

  // ── Customer ─────────────────────────────────────────────
  CUSTOMER: "/customer",
  CUSTOMER_HOME: "/customer",
  CUSTOMER_PRODUCTS: "/customer/products",
  CUSTOMER_PRODUCT: (id) => `/customer/product/${id}`,
  CUSTOMER_CART: "/customer/cart",
  CUSTOMER_WISHLIST: "/customer/wishlist",
  CUSTOMER_CHECKOUT: "/customer/checkout",
  CUSTOMER_ORDER_SUCCESS: "/customer/order-success",
  CUSTOMER_PROFILE: "/customer/profile",
  CUSTOMER_ORDERS: "/customer/orders",

  // ── Vendor ───────────────────────────────────────────────
  VENDOR: "/vendor",
  VENDOR_DASHBOARD: "/vendor",
  VENDOR_PRODUCTS: "/vendor/products",
  VENDOR_INVENTORY: "/vendor/inventory",
  VENDOR_ADD_PRODUCT: "/vendor/products/add",
  VENDOR_EDIT_PRODUCT: (id) => `/vendor/products/edit/${id}`,
  VENDOR_ORDERS: "/vendor/orders",
  VENDOR_CUSTOMERS: "/vendor/customers",
  VENDOR_REVIEWS: "/vendor/reviews",
  VENDOR_ANALYTICS: "/vendor/analytics",
  VENDOR_PROFILE: "/vendor/profile",
  VENDOR_SETTINGS: "/vendor/settings",

  ADMIN: "/admin",
};
