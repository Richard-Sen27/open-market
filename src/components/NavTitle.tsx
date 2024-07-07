"use client"

import { useGlobalState } from "@/app/GlobalContext"

export default function NavTitle({ title, breadcrumb, showNav = true} : 
    { title: string, breadcrumb?: { label: string, href: string }[], showNav?: boolean}) {
    const { setNavTitle, setBreadcrumb, setShowNav } = useGlobalState()
    setNavTitle(title)
    setShowNav(showNav)
    if (breadcrumb) setBreadcrumb(breadcrumb) 
    else setBreadcrumb(null)
    return null
}