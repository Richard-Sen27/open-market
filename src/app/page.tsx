"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function StandardPage() {
	const router = useRouter()
	useEffect(() => {
		router.push('/browse')
	}, [router])
	return null
}