import ProfileIcon from "@/components/ProfileIcon";
import { Separator } from "@/components/ui/separator";
import { FaPaperPlane } from "react-icons/fa6";

import { useAccount, useBalance, useChainId, useReadContract } from 'wagmi'
import ChatList from "./ChatList";

export default async function ChatPage({ params } : { params: { id: string }}) {
	return (
		<ChatList id={params.id} />
	)
}