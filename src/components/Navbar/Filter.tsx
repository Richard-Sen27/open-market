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
                            <SelectItem value="200">200</SelectItem>
                            <SelectItem value="400">400</SelectItem>
                            <SelectItem value="600">600</SelectItem>
                            <SelectItem value="800">800</SelectItem>
                            <SelectItem value="1000">1000+</SelectItem>
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