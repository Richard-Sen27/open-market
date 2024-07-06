import ProfileIcon from "@/components/ProfileIcon";
import { Separator } from "@/components/ui/separator";
import { FaPaperPlane } from "react-icons/fa6";

import { useAccount, useBalance, useChainId, useReadContract } from 'wagmi'
import ChatList from "./ChatList";

export default async function ChatPage({ params } : { params: { id: string }}) {
	return (
		<div className="h-full flex flex-col">
			<ChatList id={params.id} />
		</div>
	)
}