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
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const splitPathname = pathname.split("/");

  const constructLink = (endIndex: number) => {
    return splitPathname.slice(0, endIndex + 1).join('/');
  };

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {splitPathname.map((text, index) => (
          <>
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
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
