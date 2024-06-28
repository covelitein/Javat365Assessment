import React from "react";
import { InputProp, RegisterFieldValues, LoginFieldValues } from "../types";
import { Control, Controller } from "react-hook-form";

export default function Input({
  className,
  inputClassName,
  name,
  error,
  type,
  control,
  label,
  formType
}: InputProp) {
  return (
    formType == "register" ? (
    <div className={className}>
      <label>{label}</label>
      <Controller
        control={control as Control<RegisterFieldValues>}
        name={name as "fullName" | "email" | "password"}
        render={({ field }) => {
          return <input type={type} {...field} className={inputClassName} />;
        }}
      />
      <span className="text-sm text-red-500">{error}</span>
    </div>

    ) : (
      <div className={className}>
      <label>{label}</label>
      <Controller
        control={control as Control<LoginFieldValues>}
        name={name as "fullName" | "email" | "password"}
        render={({ field }) => {
          return <input type={type} {...field} className={inputClassName} />;
        }}
      />
      <span className="text-sm text-red-500">{error}</span>
    </div>
    )
  );
}
