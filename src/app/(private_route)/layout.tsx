import React, {ReactNode } from "react"
import { getServerSession } from "next-auth"
import authOptions from "../../auth/auth";
import { redirect } from "next/navigation";
import { AuthProvider } from "@//auth";

interface Props {
    children: ReactNode;
}

export default async function PrivateLayout({children}: Props){
  const session = await getServerSession(authOptions);
   if(!session?.user) redirect("/auth/signin")
   return <><AuthProvider>{children}</AuthProvider></>
}