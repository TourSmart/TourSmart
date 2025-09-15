import React from "react";

export const Slider = ({ value, onValueChange, min = 0, max = 100, step = 1, className = "" }) => {
  const handleChange = (e) => {
    onValueChange([parseInt(e.target.value)]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
    />
  );
};
