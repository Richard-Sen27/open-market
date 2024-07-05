import { 
    Card, 
    CardHeader, 
    CardContent, 
    CardTitle
} from "./ui/card";
import Image from "next/image";
import { IoMdDownload } from "react-icons/io";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";


export default function ModelCard({ title, author, description, image} : { title: string, author: string, description: string, image: string }) {
    return (
        <Card className="flex flex-grow">
            <div className="h-full flex items-center justify-center relative overflow-hidden rounded-l-[calc(var(--radius)-1px)]">
                <Image src={image} alt="" width={150} height={150} className="z-10 aspect-square"/>
                <Image src={image} alt="" width={150} height={150} className="z-0 h-full aspect-square absolute top-0 left-1/2 -translate-x-1/2 blur-2xl"/>
            </div>
            <Separator orientation="vertical"/>
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                    <CardHeader className="flex flex-col">
                        <div className="flex flex-col">
                            <CardTitle>{title}</CardTitle>
                            <p className="opacity-40">{author}</p>    
                        </div>
                    </CardHeader>
                    <div className="mr-6 flex gap-1">
                        12
                        <IoMdDownload className="text-2xl text-green-500"/>
                    </div>
                </div>
                <CardContent>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <Button variant="secondary" className="w-full mt-2">Get Model</Button>
                </CardContent>

            </div>
        </Card>
    )
}