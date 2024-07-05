"use client"

import { IoClose } from "react-icons/io5";
import { Badge } from "../ui/badge";
import { useGlobalState } from "@/app/GlobalContext";

export default function CategoryBadge({ name }: { name: string }) {
    const { categories, setCategories } = useGlobalState()
    const removeCategory = () => {
        setCategories(categories.filter(c => c !== name))
    }
    return (
        <Badge variant="secondary" className="p-2 flex items-center gap-2 justify-between">
            {name}
            <button role="button" onClick={removeCategory} aria-label={"remove "+name} className="hover:ring-8 hover:bg-destructive group outline-none focus:ring-4 ring-destructive rounded-full">
                <IoClose className="text-red-500 group-hover:text-destructive-foreground"/>
            </button>
        </Badge>
    )
}