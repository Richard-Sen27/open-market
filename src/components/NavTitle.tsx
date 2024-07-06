"use client"

import { useGlobalState } from "@/app/GlobalContext"

export default function NavTitle({ title }: { title: string }) {
    const { setNavTitle} = useGlobalState()
    setNavTitle(title)
    return null
}