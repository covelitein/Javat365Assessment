import React from "react"
import { getServerSession } from "next-auth"
import authOptions from "@/auth/auth";
import { redirect } from "next/navigation";
import { Props } from "@/types";

export default async function PrivateLayout({children}: Props){
  const session = await getServerSession(authOptions);
   if(!session?.user) redirect("/auth/signin")
   return <>{children}</>
}