const SidebarSection = ({ title, children }) => (
  <div className="flex flex-col gap-1">
    {title && (
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-3 mb-1">
        {title}
      </p>
    )}
    {children}
  </div>
);

export default SidebarSection;
