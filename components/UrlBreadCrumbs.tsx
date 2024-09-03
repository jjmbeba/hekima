"use client";
import React from 'react'
import {usePathname} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const UrlBreadCrumbs = () => {
    const pathname = usePathname();
    const pathArray = pathname.split("/").filter(Boolean);

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {pathArray.map((path, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className={'capitalize'} href={`/${path}`}>{path}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index !== pathArray.length - 1 && <BreadcrumbSeparator/>}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default UrlBreadCrumbs
