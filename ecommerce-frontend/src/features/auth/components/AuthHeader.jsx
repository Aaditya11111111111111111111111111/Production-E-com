const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6 text-center">
      {/* Logo */}
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">E</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        {title || "Welcome Back"}
      </h1>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default AuthHeader;
