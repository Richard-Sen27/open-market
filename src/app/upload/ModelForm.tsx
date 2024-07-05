"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Placeholder from "../../../public/placeholder.jpeg"

// import SimpleMDE from 'react-simplemde-editor';
// import 'easymde/dist/easymde.min.css';
import { useState } from "react"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button } from "@/components/ui/button"
import { MdAdd, MdSave, MdUpload } from "react-icons/md"
import { Badge } from "@/components/ui/badge"
import { FaEthereum } from "react-icons/fa"
  

export default function ModelForm() {
    const [markdown, setMarkdown] = useState("")
    const [price, setPrice] = useState(0);
    const mdParser = new MarkdownIt();

    const handleEditorChange = ({ text } : { text: string}) => {
        setMarkdown(text);
    };
    return (
        <div className="w-full grid grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input placeholder="Title" />
                </CardContent>
            </Card>

            <Card className="flex">
                <div className="h-full w-64 flex items-center justify-center relative overflow-hidden rounded-l-[calc(var(--radius)-1px)]">
                    <Image src={Placeholder} alt="" width={150} height={150} className="z-10 aspect-square"/>
                    <Image src={Placeholder} alt="" width={150} height={150} className="z-0 h-full aspect-square absolute top-0 left-1/2 -translate-x-1/2 blur-2xl opacity-50"/>
                </div>
                <Separator orientation="vertical"/>
                <div>
                    <CardHeader>
                        <CardTitle>Thumbnail</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input placeholder="Title" type="file" className="file:text-muted-foreground" accept=".png, .webp, .jpg"/>
                    </CardContent>
                </div>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <MdEditor
                        value={markdown}
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </CardContent>
            </Card>

            <div className="w-full grid grid-rows-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>File</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input placeholder="Title" type="file" className="file:text-muted-foreground" accept=".pickle, .pkl, .pth, .onnx"/>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Input placeholder="Categories" />
                            <Button><MdAdd className="text-xl"/></Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <Input placeholder="Net Price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/>
                            <div className="mt-2 flex justify-between gap-x-24">
                                <div className="flex gap-2 text-nowrap">
                                    <Badge variant="outline">+ 10% Service Fee</Badge>
                                    <Badge variant="outline">+ 20% Tax</Badge>
                                </div>
                                <Badge variant="secondary" className="text-nowrap text-md gap-2">{(price * 1.1 * 1.2).toFixed(3)} <FaEthereum /></Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Button variant="secondary" className="flex gap-4 items-center justify-center">
                <MdSave className="text-xl"/> Save
            </Button>
            <Button className="flex gap-4 items-center justify-center"><MdUpload className="text-xl"/> Upload </Button>
        </div>
    )
}