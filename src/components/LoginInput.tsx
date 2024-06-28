import React from "react";
import { LoginInputProp } from "@/types";
import { Control, Controller } from "react-hook-form";

export default function LoginInput({
  className,
  inputClassName,
  name,
  error,
  type,
  control,
  label,
}: LoginInputProp) {
  return (
    <div className={className}>
      <label>{label}</label>
      <Controller
        control={control}
        name={name as "email" | "password"}
        render={({ field }) => {
          return <input type={type} {...field} className={inputClassName} />;
        }}
      />
      <span className="text-sm text-red-500">{error}</span>
    </div>
  );
}
