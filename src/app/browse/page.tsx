import ModelCard from "@/components/ModelCard";
import NavTitle from "@/components/NavTitle";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import prisma from "@/lib/prisma";

export default async function Home({ searchParams } : {searchParams: { [key: string]: string | string[] | undefined}}) {
	const contents = await prisma.dataset.findMany({
		where: { 
			published: true,
			AND: [
				searchParams.maxPrice ? { price: { lte: parseInt(searchParams.maxPrice as string) } } : {},
				searchParams.search ? {
					OR: [
						{ description: { contains: searchParams.search as string | undefined, mode: "insensitive"} },
						{ title: { contains: searchParams.search as string | undefined, mode: "insensitive"} },
					]
				} : {}
			]
		},
		include: {
			author: {
				select: { id: true }
			}
		}
	})

	return (
		<main className="flex flex-col h-full">
			<NavTitle title="Browse" />
			<div className="flex flex-wrap mt-5 gap-5">
				{
					contents
					.filter((model) => model.published)
					.map((model) => (
						<ModelCard key={model.id} title={model.title} author={model.author!.id} description={model.description} downloads={model.downloads} price={model.price / 100} image={model.image} />
					))
				}
			</div>
		</main>
	);
}
