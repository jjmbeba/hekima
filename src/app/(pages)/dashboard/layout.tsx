// import { checkUserRole } from "@/lib/auth";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Layout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {


  //   const role = checkUserRole();
  const role: string = "admin";
  return <>{role === "admin" ? admin : user}</>;
}
