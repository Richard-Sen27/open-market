import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCircleInfo, FaDatabase } from "react-icons/fa6";
import prisma from "@/lib/prisma";
import NavTitle from "@/components/NavTitle";
import Image from "next/image";
import { IoMdDownload } from "react-icons/io";
import { numberDots } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaEthereum } from "react-icons/fa";
import PurchaseButton from "@/components/PurchaseButton";
import Link from "next/link";

export default async function Page({ params } : { params: { id: string }}) {
    const model = await prisma.superDataset.findUnique({
        where: { id: params.id },
		include: {
			datasets: {
				select: { id: true, image: true, title: true, authorId: true, price: true, downloads: true }
			}
		}
    })

    return (
        <main className="flex flex-col h-full p-6 mt-4 gap-6">
            <NavTitle 
                title={model?.title || ""} 
                breadcrumb={[
                    {label: "Browse", href: "/browse"},
                    {label: model?.title || "", href: model?.id || ""}
                ]}
            />

            <div className="flex gap-6">
                <Card>
                    <div className="h-full p-4 w-64 flex items-center justify-center relative overflow-hidden rounded-l-[calc(var(--radius)-1px)]">
                        <img src={model?.image || ""} alt="" width={150} height={150} className="z-10 aspect-square object-contain" />
                        <img src={model?.image || ""} alt="" width={150} height={150} className="z-0 h-full aspect-square absolute top-0 left-1/2 -translate-x-1/2 blur-3xl opacity-80" />
                    </div>
                </Card>
                <Card className="flex-grow flex flex-col justify-between">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <CardTitle>{model?.title}</CardTitle>
                                <p className="opacity-40">by {model?.authorId}</p> 
                            </div>
                            <div className="flex items-center gap-1 text-2xl">
                                {numberDots(model?.downloads || 0)}
                                <IoMdDownload className="text-3xl text-green-500"/>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-auto">
                        <div className="flex justify-between">
                            <Badge variant="secondary" className="text-nowrap px-4 text-md gap-2">{(model?.price ?? 0) / 100} <FaEthereum /></Badge>
							<PurchaseButton
								text={`Get Super Dataset`}
								price={(model?.price ?? 0) / 100}
								type={'super_dataset'}
								id={params.id}
							/>
                        </div>  
                    </CardContent>
                </Card>
            </div>
			
			<Card>
				<CardHeader>
					<CardTitle className="flex gap-4 items-center">
						<FaCircleInfo/> General Info
					</CardTitle>
				</CardHeader>
				<CardContent>
					{model?.description || ""}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex gap-4 items-center">
						<FaDatabase /> Datasets
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					{
						model?.datasets.map((dataset: any) => (
							<Link href={`/browse/${dataset.id}`}>
								<div className="flex gap-4 items-center">
									<img src={dataset.image} className="h-20 w-20 rounded-xl" />
									<div className="flex-1">
										<p className="font-bold text-xl">{dataset.title}</p>
										<p className="opacity-40">{dataset.authorId}</p>
									</div>
									<Badge variant="secondary" className="text-nowrap px-4 text-md gap-2">{dataset.price / 100} <FaEthereum /></Badge>
									<Badge variant="secondary" className="text-nowrap mr-auto text-md gap-2">{numberDots(dataset.downloads)} <IoMdDownload /></Badge>
								</div>
							</Link>
						))
					}
				</CardContent>
			</Card>
        </main>
    )
}