import * as React from "react";
import { cn } from "./utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 transition-colors",
        "placeholder:text-gray-400",
        "focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
