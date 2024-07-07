"use client"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Placeholder from "../../../../public/placeholder.jpeg"

// import SimpleMDE from 'react-simplemde-editor';
// import 'easymde/dist/easymde.min.css';
import { FormEvent, useEffect, useState } from "react"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button } from "@/components/ui/button"
import { MdSave, MdUpload } from "react-icons/md"
import { Badge } from "@/components/ui/badge"
import { FaEthereum } from "react-icons/fa"
import { useAccount } from "wagmi"
import { uploadModel } from "./upload"
import ComboBox from "@/components/Form/ComboBox"
import { useGlobalState } from "../../GlobalContext"
import ListBadge from "@/components/Form/ListBadge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ModelForm() {
	const [title, setTitle] = useState("");
	const [markdown, setMarkdown] = useState("")
	const [price, setPrice] = useState(0);
	const [modelFile, setModelFile] = useState<File | null>(null)
	const [categories, setCategories] = useState<string[]>([])
	const [thumbnail, setThumbnail] = useState<null | File>(null)

	const { allCategories } = useGlobalState()
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

	const router = useRouter()


	useEffect(() => {
		if (thumbnail instanceof File) {
			const url = URL.createObjectURL(thumbnail);
			setThumbnailUrl(url);
			// Clean up the URL object when the component unmounts
			return () => URL.revokeObjectURL(url);
		} else {
			setThumbnailUrl(null);
		}
	}, [thumbnail]);

	const mdParser = new MarkdownIt();

	const { address, isConnected } = useAccount();

	const handleUpload = async (e: FormEvent) => {
		e.preventDefault();

		//   modelFormSchema.parse(data);
		if (!isConnected) {
			alert("Please connect your wallet first");
			return;
		}

		console.log(
			title,
			markdown,
			price,
			modelFile,
			thumbnail,
			categories
		)

		if (!modelFile) {
			alert("Please upload a model file");
			return;
		}

		if (!thumbnail) {
			alert("Please upload a thumbnail");
			return
		}

		const formData = new FormData()
		formData.append('file', thumbnail)
		const { uuid } = await fetch('http://10.190.26.74:5000/single_image', {
			method: 'POST',
			body: formData
		})
		.then((x) => x.json())

		console.log('uuid', uuid)

		const data = await uploadModel({
			title: title,
			description: markdown,
			price: price,
			thumbnail: `http://10.190.26.74:5000/retrieve_img_by_uuid?uuid=${uuid}`,
			authorId: address?.toString()!
		})
		router.push(`/browse/${data.id}`)
	}

	return (
		<form className="w-full grid grid-cols-2 gap-6" onSubmit={handleUpload}>
			<Card>
				<CardHeader>
					<CardTitle>Title</CardTitle>
				</CardHeader>
				<CardContent>
					<Input placeholder="Title" name="title" onChange={e => setTitle(e.target.value)} value={title} />
				</CardContent>
			</Card>

			<Card className="flex">
				<div className="h-full w-64 flex items-center justify-center relative overflow-hidden rounded-l-[calc(var(--radius)-1px)]">
					<img src={thumbnailUrl ? thumbnailUrl : Placeholder.src} alt="" width={150} height={150} className="z-10 aspect-square" />
					<img src={thumbnailUrl ? thumbnailUrl : Placeholder.src} alt="" width={150} height={150} className="z-0 h-full aspect-square absolute top-0 left-1/2 -translate-x-1/2 blur-3xl opacity-80" />
				</div>
				<Separator orientation="vertical" />
				<div>
					<CardHeader>
						<CardTitle>Thumbnail</CardTitle>
					</CardHeader>
					<CardContent>
						<Input
							placeholder="Title" type="file"
							className="file:text-muted-foreground"
							accept=".png, .webp, .jpg, .jpeg" max={1}
							onChange={(e) => setThumbnail(e.target.files![0])}
						/>
					</CardContent>
				</div>
			</Card>

			<Card className="col-span-2">
				<CardHeader>
					<CardTitle>Description</CardTitle>
				</CardHeader>
				<CardContent>
					<MdEditor
						value={markdown}
						style={{ height: '500px' }}
						renderHTML={(text) => mdParser.render(text)}
						onChange={e => setMarkdown(e.text)}
						name="markdown"
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>File</CardTitle>
				</CardHeader>
				<CardContent>
					<Input
						placeholder="Title" type="file"
						className="file:text-muted-foreground"
						accept=".pickle, .pkl, .pth, .onnx" max={1}
						onChange={(e) => setModelFile(e.target.files![0])}
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Categories</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-4">
						<ComboBox options={allCategories} selection={categories} setSelection={setCategories} />
					</div>
					<ScrollArea className="overflow-x-auto">
						<div className="mt-2 mb-3 flex gap-x-4 gap-y-2 text-nowrap">
							{categories.map((category, i) => (
								<ListBadge name={category} list={categories} setList={setCategories} key={i} />
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</CardContent>
			</Card>

			<Card className="col-span-2">
				<CardHeader>
					<CardTitle>Price</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<Input placeholder="Net Price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} name="price" />
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

			<div className="col-span-2 flex gap-6 mb-6">
				<Button asChild variant="secondary" className="flex gap-4 items-center justify-center flex-1">
					<Link href="/browse">
						Cancel
					</Link>
				</Button>
				<Button type="submit" className="flex gap-4 items-center justify-center flex-1"><MdUpload className="text-xl" /> Upload </Button>
			</div>
		</form>
	)
}