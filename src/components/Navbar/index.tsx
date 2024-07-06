"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Filter from "./Filter";
import { MdFileUpload, MdDashboard } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/app/GlobalContext";
import { Label } from "../ui/label";


export default function Navbar() {
    const { search, setSearch, categories } = useGlobalState()    
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const search = searchParams.get("search")        
        if (search) setSearch(search)
    }, [])

    useEffect(() => {
        const currentSearchParams = new URLSearchParams(window.location.search)
        if (search) {
            currentSearchParams.set("search", search)
        } else {
            currentSearchParams.delete("search")
        }
        router.push(`/browse?${currentSearchParams.toString()}`)
    }, [search])

    return (
        <nav className="w-[430px] flex flex-col justify-between gap-4 h-full relative">
            <div>
                <Link href="/browse"><h2 className="p-4 text-2xl font-bold">Open Market</h2></Link>
                <Separator orientation="horizontal" className="h-[1.5px]"/>
                <ul className="p-4 mt-2 flex flex-col gap-4">
                    <div>
                        <Label htmlFor="search" className="text-[16px]">Search</Label>
                        <Input id="search" name="search" type="text" placeholder="Search for models" value={search} onChange={e => setSearch(e.target.value)}/>
                    </div>
                    <Filter />
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 mx-4 mb-2">
                    <Button variant="outline" asChild>
                        <Link href="/upload" className="w-full flex justify-center gap-2">
                            <MdFileUpload className="text-primary text-lg"/> 
                            Upload Model
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/my-uploads" className="w-full flex justify-center gap-2">
                            <MdDashboard className="text-primary text-lg"/>
                            View Uploads
                        </Link>
                    </Button>
                </div>
                <Separator orientation="horizontal" className="h-[1.5px]"/>
                <div className="p-4">
                    &copy; 2024 Open Market
                </div>
            </div>
            {/* <div className="-z-10 absolute w-1/3 h-2/3 top-1/2 left-1/2 rotate-6 blur-3xl -translate-x-1/2 -translate-y-1/2 bg-green-500"/> */}
        </nav>
    );
}