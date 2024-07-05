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


export default function ModelCard({ title, author, description, price, downloads, image} : 
    { 
        title: string, author: string, description: string, price: number, downloads: number, image: string 
    }) {
    return (
        <Card className="flex flex-grow">
            <div className="h-full w-64 flex items-center justify-center relative overflow-hidden rounded-l-[calc(var(--radius)-1px)]">
                <Image src={image} alt="" width={150} height={150} className="z-10 aspect-square"/>
                <Image src={image} alt="" width={150} height={150} className="z-0 h-full aspect-square absolute top-0 left-1/2 -translate-x-1/2 blur-2xl"/>
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
                    <div className="mr-6 flex gap-1">
                        {downloads}
                        <IoMdDownload className="text-2xl text-green-500"/>
                    </div>
                </div>
                <CardContent>
                    <p>{description}</p>
                    <div className="flex gap-4 items-center justify-between mt-6">
                        <Badge variant="secondary" className="text-nowrap mr-auto text-md gap-2">{price} <FaEthereum /></Badge>
                        <Button variant="default" className="max-w-32 bg-green-500 hover:bg-green-700 w-full">Get Model</Button>
                    </div>
                </CardContent>

            </div>
        </Card>
    )
}