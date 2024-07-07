import ModelCard from "@/components/ModelCard";
import NavTitle from "@/components/NavTitle";
import prisma from "@/lib/prisma";

function convertToType(type: string) {
	if (type == 'datasets') {
		return 'DATASET'
	} else if (type == 'models') {
		return 'MODEL'
	}
}

export default async function Home({ searchParams } : {searchParams: { [key: string]: string | string[] | undefined}}) {
	const contents = searchParams.type == 'super_datasets' ? [] : await prisma.dataset.findMany({
		where: { 
			published: true,
			AND: [
				searchParams.maxPrice ? { price: { lte: parseInt(searchParams.maxPrice as string) } } : {},
				searchParams.search ? {
					OR: [
						{ description: { contains: searchParams.search as string | undefined, mode: "insensitive"} },
						{ title: { contains: searchParams.search as string | undefined, mode: "insensitive"} },
					]
				} : {},
				(
					searchParams.type == 'datasets' ||
					searchParams.type == 'models'
				) ? { type: { equals: convertToType(searchParams.type) } } : {}
			]
		},
		include: {
			author: {
				select: { id: true }
			}
		}
	})

	const superContents = (searchParams.type == null || searchParams.type == 'super_datasets') ? await prisma.superDataset.findMany({
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
	}) : []

	const mergedContents = superContents.map((x) => ({ type: 'super', data: x })).concat(contents.map((x) => ({ type: 'normal', data: x })))

	return (
		<main className="flex flex-col h-full p-6">
			<NavTitle title="" breadcrumb={[{label: "Browse", href: "/browse"}]}/>
			<div className="grid grid-cols-1 no-min-[1700px]:grid-cols-2 mt-4 gap-5">
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
