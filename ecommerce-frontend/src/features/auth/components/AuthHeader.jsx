/**
 * Auth page header — title, subtitle, and optional back link.
 */
const AuthHeader = ({ title, subtitle, tag }) => (
  <div className="mb-7">
    {tag && (
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
        {tag}
      </span>
    )}
    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title ?? "Welcome Back"}</h1>
    {subtitle && (
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    )}
  </div>
);

export default AuthHeader;
