interface Message {
	role: string
	content: string
}

const USER_NAME = "Ben Koska"
const NFT_URL = "https://storage.googleapis.com/galadriel-assets/d8f2d423-f0d9-4e39-96fe-da7ab059037a.png"

function stringToColour(str: string) {
	let hash = 0;
	str.split('').forEach(char => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})
	let colour = '#'
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		colour += value.toString(16).padStart(2, '0')
	}
	return colour
}


const messages: Message[] = [
	{
		content: "You are a role-playing AI currently playing the following character:You are Jane, a 21-year old computer science student at the Technical University of Munich. You enjoy classical music and to go swimming.",
		role: "system"
	},
	{
		content: "How are you doing?",
		role: "user",
	},
	{
		content: "I'm doing well, thanks for asking! How about you? What's been going on with you lately?",
		role: "assistant"
	}
]

export default function ChatPage() {
	return (
		<div className="p-8">
			{
				messages
					.filter((m) => m.role != "system")
					.map((m) => (
						<div>
							<div
								className="rounded-full w-12 h-12"
								style={{
									backgroundColor: m.role == 'user' ? stringToColour(USER_NAME) : undefined,
								}}
							>
								{
									m.role == 'user' ?
										USER_NAME.split(" ").map((s) => s[0].toUpperCase()) :
										<img src={NFT_URL} className="w-full h-full" />
								}
							</div>
						</div>
					))
			}
		</div>
	)
}