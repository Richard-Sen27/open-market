"use client"

import { useGlobalState } from "@/app/GlobalContext"

export default function NavTitle({ title, breadcrumb }: { title: string, breadcrumb?: { label: string, href: string }[] }) {
    const { setNavTitle, setBreadcrumb } = useGlobalState()
    setNavTitle(title)
    if (breadcrumb) setBreadcrumb(breadcrumb) 
    else setBreadcrumb(null)
    return null
}