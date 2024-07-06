"use client"

import { Button } from "@/components/ui/button"
import { ChangeEvent, Fragment, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { useGlobalState } from "@/app/GlobalContext"


export default function SearchCategory() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const { categories, setCategories, allCategories } = useGlobalState()
  const [filteredCategories, setFilteredCategories] = useState(allCategories)

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
      allCategories.filter(category =>
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
