import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full">
			<Header />
			<div className="flex flex-grow h-full overflow-y-auto">
				<Navbar />				
				<Separator orientation="vertical" />
				<ScrollArea className="w-full h-full">
					<ScrollBar orientation="vertical"/>
					{children}
				</ScrollArea>
			</div>
		</div>
    )
}