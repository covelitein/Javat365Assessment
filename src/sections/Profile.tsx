"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-5">
      {session ? (
        <>
          <h3 className="">
            <span className="font-semibold">Email</span>: {session.user?.email}
          </h3>
          <h3 className="">
            <span className="font-semibold">Name</span>: {session.user?.name}
          </h3>
          <div className="mt-5">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white p-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <p>User is not authenticated</p>
      )}
    </div>
  );
}
