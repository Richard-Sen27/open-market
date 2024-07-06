import { 
    Card, 
    CardHeader, 
    CardContent, 
    CardTitle
} from "./ui/card";
import Image from "next/image";
import { IoMdDownload } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { numberDots } from "@/lib/utils";

function capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
}

export default function ModelCard({ id, title, author, description, price, downloads, image, type } : 
    { 
        id: string, title: string, author: string, description: string, price: number, downloads: number, image: string, type: string
    }) {
    return (
        <Card className="flex">
            <div className="h-full w-64 shrink-0 flex items-center justify-center relative overflow-hidden rounded-l-[calc(var(--radius)-1px)]">
                <Image src={image} alt="" width={150} height={150} className="z-10 aspect-square"/>
                <Image src={image} alt="" width={150} height={150} className="z-0 h-full aspect-square absolute top-0 left-1/2 -translate-x-1/2 blur-2xl opacity-50"/>
            </div>
            <Separator orientation="vertical"/>
            <div className="flex flex-col w-full gap-4">
                <div className="flex justify-between items-center">
                    <CardHeader className="flex flex-col pb-0">
                        <div className="flex flex-col">
                            <CardTitle>{title}</CardTitle>
                            <p className="opacity-40">{author}</p>    
                        </div>
                    </CardHeader>
					<Badge variant="secondary" className="text-nowrap text-md gap-2 mr-6">{capitalize(type.toLowerCase())}</Badge>
                </div>
                <CardContent className="flex flex-col justify-between h-full">
                    <p>{ description.slice(0, 150) }{ description.length > 50 ? "..." : "" }</p>
                    <div className="flex gap-4 items-center mt-6">
                        <Badge variant="secondary" className="text-nowrap mr-auto text-md gap-2">{price} <FaEthereum /></Badge>
						<Badge variant="secondary" className="text-nowrap mr-auto text-md gap-2">{numberDots(downloads)} <IoMdDownload /></Badge>
						<div className="flex-1" />
                        <Button variant="default" asChild className="max-w-32 bg-green-500 hover:bg-green-700 w-full">
                            <Link href={`/browse/${id}`}>Get Model</Link>
                        </Button>
                    </div>
                </CardContent>

            </div>
        </Card>
    )
}