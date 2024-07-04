import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { IoClose } from "react-icons/io5";
import { Badge } from "../ui/badge";


const categories = [
    "Voice Recognition",
    "Image Recognition",
    "Text Recognition",
    "Data Analysis",
    "Data Visualization",
    "Data Preprocessing",
    "Image Generation",
    "Text Generation",
]

export default function Filter() {
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
                <Input placeholder="Search Categories" />
                <div className="flex flex-wrap mt-2 gap-1">
                    {categories.map((category) => (
                        <Category key={category} name={category}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

function Category({ name }: { name: string }) {
    return (
        <Badge variant="secondary" className="p-2 flex items-center gap-2">
            {name}
            <button role="button" aria-label={"remove "+name} className="hover:ring-8 hover:bg-destructive group outline-none focus:ring-4 ring-destructive rounded-full">
                <IoClose className="text-destructive group-hover:text-destructive-foreground"/>
            </button>
        </Badge>
    )
}