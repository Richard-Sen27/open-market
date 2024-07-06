"use client"

import React from "react";
import Profile from "./Profile";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useGlobalState } from "@/app/GlobalContext";

export default function Header() {
	const { navTitle } = useGlobalState()
	return (
		<div className="flex relative w-full">
			<Link href="/browse" className=""><h2 className="p-4 text-2xl font-bold w-[351.86px]">Open Market</h2></Link>
			<Separator orientation="vertical"/>
			<div className="flex justify-between items-center p-3 w-full">
				<h2 className="font-bold text-xl">{ navTitle }</h2>
				<Profile />
			</div>
			<Separator orientation="horizontal" className="absolute bottom-0 left-0"/>
		</div>
	)
}