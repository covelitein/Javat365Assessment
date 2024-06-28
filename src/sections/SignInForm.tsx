"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { signInSchema } from "../schemaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaArrowRight, FaTimes, FaSignInAlt } from "react-icons/fa";
import { Input } from "../components";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [msg, setMsg] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });

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

  const submit = async (data: z.infer<typeof signInSchema>) => {
    setSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(res);

      if (res?.status == 200 && !res.error) {
        setMsg({
          type: "success",
          msg: "login successful, you will be redirected",
        });
        setTimeout(() => {
          router.push("/profile"); // Redirect to login page on successful signup
        }, 2000);
        return;
      }

      if (res?.status == 401) {
        setMsg({
          type: "error",
          msg: "server error",
        });
        return;
      }

      setMsg({
        type: "error",
        msg: "Invalid email or password",
      });
      return;
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg min-h-[10rem] max-sm:min-h-screen sm:w-[25rem] w-full sm:px-5 px-2 py-14 shadow-md">
      <div className="flex items-center justify-center flex-col mt-4">
        <FaSignInAlt className="text-5xl text-[#7181fd]" />
        <h2 className="text-2xl font-[700] text-[#3c3461] mt-3 font-[poppins-semibold]">
          Welcome!
        </h2>
        <h5>Sign in to your account</h5>
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
            label="E-mail"
            formType="login"
            control={form.control}
            error={form.formState.errors.email?.message}
            type="text"
            name="email"
            className="mb-5"
            inputClassName="border-b-2 py-2 px-2 border-gray-300 w-full focus:ring-0 focus:outline-none"
          />
          <Input
            label="Password"
            formType="login"
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
            <span>{submitting ? "logging in..." : "Login"}</span>
            <FaArrowRight className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
