"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const splitPathname = pathname.split("/");

  const constructLink = (endIndex: number) => {
    return splitPathname.slice(0, endIndex + 1).join("/");
  };

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList className="flex items-center">
        {splitPathname.map((text, index) => (
          <div key={text} className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={constructLink(index)}>
                  {text.charAt(0).toUpperCase() + text.slice(1)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== 0 && index !== splitPathname.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
