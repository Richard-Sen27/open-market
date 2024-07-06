"use client"

import React from "react";
import Profile from "./Profile";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useGlobalState } from "@/app/GlobalContext";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
  
export default function Header() {
	const { navTitle, breadcrumb } = useGlobalState()
	return (
		<div className="flex relative w-full">
			<Link href="/browse" className=""><h2 className="p-4 text-2xl font-bold w-[350px]">Open Market</h2></Link>
			<Separator orientation="vertical"/>
			<div className="flex justify-between items-center p-3 w-full">
				{ breadcrumb ? 
					<Breadcrumb className="text-lg ml-2">
						<BreadcrumbList>
							{ breadcrumb.map((item, index) => 
								<BreadcrumbItem key={index}>
									<BreadcrumbLink href={ item.href }>{ item.label }</BreadcrumbLink>
									{ index < breadcrumb.length-1 && <BreadcrumbSeparator/> }
								</BreadcrumbItem>
							)}
						</BreadcrumbList>
					</Breadcrumb> 
					: <h2 className="font-bold text-xl">{ navTitle }</h2> }
				<Profile />
			</div>
			<Separator orientation="horizontal" className="absolute bottom-0 left-0"/>
		</div>
	)
}