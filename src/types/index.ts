import { ReactNode } from "react";
import { Control } from "react-hook-form";

export type InputProp = {
  name: "fullName" | "email" | "password";
  error: string | undefined;
  className: string;
  inputClassName: string;
  control: Control<{ fullName: string; email: string; password: string }>;
  type: string;
  label: string;
};

export type LoginInputProp = {
  name: "email" | "password";
  error: string | undefined;
  className: string;
  inputClassName: string;
  control: Control<{ email: string; password: string }>;
  type: string;
  label: string;
};

export interface SignUpBody {
  fullName: string;
  email: string;
  password: string;
}

export type User = {
  email: string;
  password: string;
};

export interface Props {
  children: ReactNode;
}
