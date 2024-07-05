import Header from "@/components/Header";
import ModelCard from "@/components/ModelCard";
import Pager from "@/components/Pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import prisma from "@/lib/prisma";

export default async function Home() {
	const contents = await prisma.dataset.findMany({
		where: { published: true },
		include: {
			author: {
				select: { id: true }
			}
		}
	})

	return (
		<main className="flex flex-col h-full p-4">
			<Header>
				<h2 className="font-bold text-xl">Browse Models</h2>
			</Header>
			<ScrollArea className="h-full">
				<ScrollBar orientation="vertical" />
				<div className="flex flex-wrap mt-5 gap-5">
					{
						contents.map((model) => (
							<ModelCard key={model.id} title={model.title} author={model.author!.id} description={model.description} downloads={model.downloads} price={model.price / 100} image={model.image} />
						))
					}
				</div>
			</ScrollArea>
			<Pager />
		</main>
	);
}
