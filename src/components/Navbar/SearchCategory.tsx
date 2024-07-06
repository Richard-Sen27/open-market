"use client"

import { Button } from "@/components/ui/button"
import { ChangeEvent, Fragment, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { useGlobalState } from "@/app/GlobalContext"

// apply content of categories to categories
const catValues = [
  { label: "Voice Recognition", value: "voice-recognition" },
  { label: "Image Recognition", value: "image-recognition" },
  { label: "Text Recognition", value: "text-recognition" },
  { label: "Data Analysis", value: "data-analysis" },
  { label: "Data Visualization", value: "data-visualization" },
  { label: "Data Preprocessing", value: "data-preprocessing" },
  { label: "Image Generation", value: "image-generation" },
  { label: "Text Generation", value: "text-generation" },
]

export default function SearchCategory() {
  const [open, setOpen] = useState(true)
  const [value, setValue] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(catValues)
  const { categories, setCategories } = useGlobalState()

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setOpen(true)
  }

  const handleSelect = (label: string) => {
    setValue("")
    setOpen(false)
    console.log(`Selected: ${label} - ${value}`)
    setCategories([...categories, label])
  }

  useEffect(() => {
    if (!open) setValue("")
    if (open && value === "") setOpen(false)
  }, [open, value])

  useEffect(() => {
    setFilteredCategories(
      catValues.filter(category =>
        category.label.toLowerCase().includes(value) && categories.indexOf(category.label) === -1
      )
    )
  }, [value])

  return (
    <div className="w-full relative">
      <Input type="text" placeholder="Search Category..." onInput={handleInput} value={value}/>
      <div className="absolute bg-background border-border border-[1px] rounded-lg -bottom-2 translate-y-full w-full h-64" style={{display: open ? "block" : "none"}}>
        <ScrollArea className="h-full">
          <ScrollBar/>
            {filteredCategories.map((category, i) => (
              <Fragment key={category.value}>
                <Button variant="link" className="w-full justify-start" onClick={() => handleSelect(category.label)}>
                  {category.label}
                </Button>
                {
                  (i !== filteredCategories.length - 1) && <Separator orientation="horizontal"/>    
                }
              </Fragment>
            ))}
        </ScrollArea>
      </div>
    </div>
  )
}
