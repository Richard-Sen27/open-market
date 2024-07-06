import NavTitle from "@/components/NavTitle"
import CharactersList from "./CharactersList"

export default function CharactersPage() {
	return (
		<div className="p-8">
			<NavTitle title="Character Marketplace" />
			<CharactersList limit={10} />
		</div>
	)
}