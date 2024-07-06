"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IoClose } from "react-icons/io5";
import { Badge } from "../ui/badge";
import SearchCategory from "./SearchCategory";
import { useGlobalState } from "@/app/GlobalContext";
import CategoryBadge from "./CategoryBadge";
import { FaEthereum } from "react-icons/fa";

function roundTo(num: number, decimal: number): string {
	return (Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal)
}

export default function Filter() {
    const { categories }  = useGlobalState()
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex gap-2">
                <div className="w-full flex flex-col">
                    <h2>Max Price</h2>
                    <Select defaultValue="n/a">
                        <SelectTrigger>
                            <SelectValue placeholder="Select Price"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="n/a">N/A</SelectItem>
                            <SelectItem value="0">Free</SelectItem>
                            <SelectItem value="20">
								<div className="flex gap-2 items-center">
									{roundTo(20/100, 2)} <FaEthereum />
								</div>
							</SelectItem>
                            <SelectItem value="40">
								<div className="flex gap-2 items-center">
									{roundTo(40/100, 2)} <FaEthereum />
								</div>
							</SelectItem>
                            <SelectItem value="60">
								<div className="flex gap-2 items-center">
									{roundTo(60/100, 2)} <FaEthereum />
								</div>
							</SelectItem>
                            <SelectItem value="80">
								<div className="flex gap-2 items-center">
									{roundTo(80/100, 2)}
									<FaEthereum />
								</div>
							</SelectItem>
                            <SelectItem value="100">
								<div className="flex gap-2 items-center">
									{roundTo(100/100, 2)} <FaEthereum />
								</div>
							</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full flex flex-col">
                    <h2>Type</h2>
                    <Select defaultValue="n/a">
                        <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="n/a">N/A</SelectItem>
                            <SelectItem value="datasets">Datasets</SelectItem>
                            <SelectItem value="models">Models</SelectItem>
                            <SelectItem value="notebooks">Anything</SelectItem>                            
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <div className="w-full flex flex-col">
                <h2>Categories</h2>
                <SearchCategory />
                <div className="flex flex-wrap mt-2 gap-1">
                    {categories.map((category) => (
                        <CategoryBadge key={category} name={category}/>
                    ))}
                </div>
            </div>
        </div>
    )
}