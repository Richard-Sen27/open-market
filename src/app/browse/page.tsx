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

	const superContents = await prisma.superDataset.findMany({
		where: { 
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

	const mergedContents = superContents.map((x) => ({ type: 'super', data: x })).concat(contents.map((x) => ({ type: 'normal', data: x })))
	console.log('mergedContents', mergedContents)
	console.log('superContents', superContents)

	return (
		<main className="flex flex-col h-full p-6">
			<NavTitle title="" breadcrumb={[{label: "Browse", href: "/browse"}]}/>
			<div className="grid grid-cols-1 min-[1700px]:grid-cols-2 mt-4 gap-5">
				{
					mergedContents
						.filter((model: any) => model.data.published || true)
						.map((model: any) => (
							<ModelCard
								key={model.data.id} 
								id={model.data.id} 
								title={model.data.title} 
								author={model.data.author!.id} 
								description={model.data.description} 
								downloads={model.data.downloads} 
								price={model.data.price / 100} 
								type={model.type == 'normal' ? model.data.type : 'Super Dataset'}
								image={model.data.image}
								href={model.type == 'normal' ? `/browse/${model.data.id}` : `/browse/super/${model.data.id}`}
							/>
						))
				}
			</div>
		</main>
	);
}
