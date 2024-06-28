"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle, FaArrowRight, FaTimes } from "react-icons/fa";
import { Input } from "../components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemaValidations";
import api from "../constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [msg, setMsg] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });

  const submit = async (data: z.infer<typeof signUpSchema>) => {
    setSubmitting(true);

    try {
      const response = await api.post("signup", data);

      if (response.data.error === "Validation error") {
        setMsg({
          type: "error",
          msg: "Validation Error, please fill up fields correctly",
        });
      } else if (response.data.error) {
        setMsg({
          type: "error",
          msg: response.data.error,
        });
      } else if (response.status === 201) {
        setMsg({
          type: "success",
          msg: response.data.message,
        });
        setTimeout(() => {
          router.push("/auth/signin"); // Redirect to login page on successful signup
        }, 2000);
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle network errors or other exceptions
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseError = () => {
    setMsg({ type: "", msg: "" });
  };

  useEffect(() => {
    if (msg.type == "error" || msg.type == "success") {
      setTimeout(() => {
        handleCloseError();
      }, 3000);
    }
  }, [msg.type]);

  return (
    <div className="bg-white rounded-lg min-h-[10rem] sm:w-[25rem] w-full sm:px-5 px-2 py-14 shadow-md">
      <div className="flex items-center justify-center flex-col mt-4">
        <FaUserCircle className="text-5xl text-[#7181fd]" />
        <h2 className="text-2xl font-[700] text-[#3c3461] mt-3 font-[poppins-semibold]">
          Create account!
        </h2>
      </div>

      <div className="px-3">
        {msg.type === "error" && (
          <div className="text-sm bg-red-300 text-gray-600 p-3 mt-4 flex items-center justify-between">
            <h3>{msg.msg}</h3>
            <button className="p-2 rounded-full" onClick={handleCloseError}>
              <FaTimes className="text-xl" />
            </button>
          </div>
        )}

        {msg.type === "success" && (
          <div className="text-sm bg-green-300 text-gray-600 p-3 mt-4 flex items-center justify-between">
            <h3>{msg.msg}</h3>
            <button className="p-2 rounded-full" onClick={handleCloseError}>
              <FaTimes className="text-xl" />
            </button>
          </div>
        )}
      </div>

      <div className="px-5 mt-10">
        <form onSubmit={form.handleSubmit(submit)}>
          <Input
            label="Full Name"
            formType="register"
            control={form.control}
            error={form.formState.errors.fullName?.message}
            type="text"
            name="fullName"
            className="mb-5"
            inputClassName="border-b-2 py-2 px-2 border-gray-300 w-full focus:ring-0 focus:outline-none"
          />
          <Input
            label="E-mail"
            formType="register"
            control={form.control}
            error={form.formState.errors.email?.message}
            type="text"
            name="email"
            className="mb-5"
            inputClassName="border-b-2 py-2 px-2 border-gray-300 w-full focus:ring-0 focus:outline-none"
          />
          <Input
            label="Password"
            formType="register"
            control={form.control}
            error={form.formState.errors.password?.message}
            type="password"
            name="password"
            className="mb-5"
            inputClassName="border-b-2 py-2 px-2 border-gray-300 w-full focus:ring-0 focus:outline-none"
          />
          <button
            className={`${
              submitting ? "bg-blue-600/50" : "bg-blue-600"
            }  text-white px-8 py-3 rounded-lg flex items-center gap-3`}
            type="submit"
            disabled={submitting}
          >
            <span>{submitting ? "Creating..." : "Create"}</span>
            <FaArrowRight className="text-xl" />
          </button>
        </form>
        <div className="mt-5 text-sm flex items-center flex-wrap gap-1">
          Already have an account?{" "}
          <Link href={"/auth/signin"} className="text-blue-500 underline">
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
