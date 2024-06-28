"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function Profile() {
  const { data } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/auth/signin",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-5">
      <h3 className="">
        <span className="font-semibold">Email</span>: {data?.user?.email}
      </h3>
      <h3 className="">
        <span className="font-semibold">Name</span>: {data?.user?.name}
      </h3>
      <div className="mt-5">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white p-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
