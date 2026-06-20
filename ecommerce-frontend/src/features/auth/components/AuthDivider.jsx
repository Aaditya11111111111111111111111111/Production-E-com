const AuthDivider = () => {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-300" />
      <span className="text-sm text-gray-400 whitespace-nowrap">OR</span>
      <div className="flex-1 h-px bg-gray-300" />
    </div>
  );
};

export default AuthDivider;
