import { FaEthereum } from "react-icons/fa";

export default function LoadingComponent() {
	return (
		<div className="animate-pulse duration-1000 w-full h-full flex items-center justify-center">
			<FaEthereum className="text-4xl animate-spin"/>
		</div>
	)	
}