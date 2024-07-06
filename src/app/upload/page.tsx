"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import ModelForm from "./ModelForm";
import DatasetForm from "./DatasetForm";
  
export default function Page() {
    const [selected, setSelected] = useState("model");
    return (
        <main className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl">Upload</h2>
                <Select defaultValue="model" onValueChange={setSelected} value={selected}>
                    <SelectTrigger className="w-[180px]" >
                        <SelectValue placeholder="Select Upload"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="model">Model</SelectItem>
                        <SelectItem value="dataset">Dataset</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <ScrollArea className="h-full">
                <ScrollBar orientation="vertical"/>
                <div className="flex flex-wrap mt-3 gap-5">
                    {
                        selected === "model" && <ModelForm />
                    }
                    {
                        selected === "dataset" && <DatasetForm />
                    }
                </div>
            </ScrollArea>
        </main>
    )
}