import ModelCard from "@/components/ModelCard";
import NavTitle from "@/components/NavTitle";
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
			<NavTitle title="" breadcrumb={[{label: "Browse", href: "/browse"}]}/>
			<div className="grid grid-cols-1 min-[1700px]:grid-cols-2 mt-6 gap-5">
				{
					contents
						.filter((model) => model.published)
						.map((model) => (
							<ModelCard 
								key={model.id} 
								id={model.id} 
								title={model.title} 
								author={model.author!.id} 
								description={model.description} 
								downloads={model.downloads} 
								price={model.price / 100} 
								image={model.image} 
							/>
						))
				}
			</div>
		</main>
	);
}
