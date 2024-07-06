import { IoClose } from "react-icons/io5";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export default function ListBadge({ name, list, setList, className } : { name: string, list: string[], setList: (value: string[]) => void, className?: string}) {
    const removeCategory = () => {
        setList(list.filter(i => i !== name))
    }    
    return (
        <Badge variant="secondary" className={cn("p-2 flex items-center gap-4 w-fit", className)}>
            {name}
            <button role="button" type="button" onClick={removeCategory} aria-label={"remove "+name} className="hover:ring-8 hover:bg-destructive group outline-none focus:ring-4 ring-destructive rounded-full">
                <IoClose className="text-red-500 group-hover:text-destructive-foreground"/>
            </button>
        </Badge>
    )
}