import { FaEthereum } from "react-icons/fa";

export default function LoadingComponent() {
	return (
		<div className="animate-pulse duration-1000">
			<FaEthereum className="text-2xl animate-spin"/>
		</div>
	)	
}