import CharactersList from "./CharactersList"

export default function CharactersPage() {
	return (
		<div className="p-8">
			<CharactersList limit={10} />
		</div>
	)
}