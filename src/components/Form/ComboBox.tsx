"use client"

import { Button } from "@/components/ui/button"
import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { useGlobalState } from "@/app/GlobalContext"

type ComboBoxProps = {
    options: KeyValuePair[];
    selection: string[];
    setSelection: (value: string[]) => void;
}

type KeyValuePair = {
    label: string;
    value: string;
}

export default function ComboBox({ options, selection, setSelection} : ComboBoxProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [filteredCategories, setFilteredCategories] = useState<KeyValuePair[] | null>(null)

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setOpen(true)
    }

    const handleSelect = (label: string) => {
        setValue("")
        setOpen(false)
        setSelection([...selection, label])
    }

    useEffect(() => {
        if (!open) setValue("")
        if (open && value === "") setOpen(false)

        if (open && value !== "") {
            setFilteredCategories(
                options.filter(category =>
                    category.label.toLowerCase().includes(value) && selection.indexOf(category.label) === -1
                )
            )
        } else if (open && value === "") {
            setFilteredCategories(options)
        }
    }, [open, value])

    return (
        <div className="w-full relative">
            <Input type="text" placeholder="Search Category..." onInput={handleInput} value={value} onFocus={() => setOpen(true)}/>
            <div className="absolute bg-background border-border border-[1px] rounded-lg -bottom-2 translate-y-full w-full h-64" style={{display: open ? "block" : "none"}}>
                <ScrollArea className="h-full">
                <ScrollBar/>
                    {filteredCategories?.map((category, i) => (
                    <>
                        <Button key={category.value} variant="link" className="w-full justify-start" onClick={(e) => {e.preventDefault(); handleSelect(category.label)}}>
                            {category.label}
                        </Button>
                        {
                            (i !== filteredCategories.length - 1) && <Separator orientation="horizontal"/>    
                        }
                    </>
                    ))}
                </ScrollArea>
            </div>
        </div>
    )
}