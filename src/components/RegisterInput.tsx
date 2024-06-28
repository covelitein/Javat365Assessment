import React from "react";
import { InputProp } from "@/types";
import { Control, Controller } from "react-hook-form";

export default function RegisterInput({
  className,
  inputClassName,
  name,
  error,
  type,
  control,
  label,
}: InputProp) {
  return (
    <div className={className}>
      <label>{label}</label>
      <Controller
        control={control}
        name={name as "fullName" | "email" | "password"}
        render={({ field }) => {
          return <input type={type} {...field} className={inputClassName} />;
        }}
      />
      <span className="text-sm text-red-500">{error}</span>
    </div>
  );
}
