import React from "react";

export const Badge = ({ children, className = "", variant = "default", ...props }) => {
  let variants = {
    default: "bg-blue-600 text-white",
    outline: "border border-gray-300 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
