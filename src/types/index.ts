import { ReactNode } from "react";
import { Control } from "react-hook-form";

export type InputProp = {
  name: "fullName" | "email" | "password";
  error: string | undefined;
  className: string;
  inputClassName: string;
  control: any;
  type: string;
  label: string;
  formType: string;
};

export type RegisterFieldValues = {
  control: Control<{ fullName: string; email: string; password: string }>;
};

export type LoginFieldValues = {
  control: Control<{ fullName: string; email: string; password: string }>;
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