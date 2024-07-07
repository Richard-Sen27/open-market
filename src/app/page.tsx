import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { IconType } from "react-icons/lib";

import { SiHiveBlockchain } from "react-icons/si";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsGlobe2 } from "react-icons/bs";


function Home() {
  return (
    <main className="h-screen flex flex-col">
      <nav className="border-b border-2 flex justify-between items-center p-4">
        <h1 className="text-4xl font-bold">Open Market</h1>
        <Link href="/browse">Browse Market</Link>
      </nav>

      <ScrollArea className="flex-1 overflow-auto">
        <ScrollBar orientation="vertical" />

        <div className="h-full my-52 w-full flex flex-col gap-6 relative">
          <h1 className="text-6xl mx-auto -translate-x-1/2">Decentralizing AI</h1>
          <h2 className="text-4xl mx-auto translate-x-1/2">with Open Market</h2>
          <div className="absolute rotate-12 -z-10 left-1/2 -translate-x-1/2 rounded-3xl w-96 h-28 bg-green-500 blur-3xl"></div>
        </div>

        <div className="my-52 mx-32 text-2xl flex flex-col gap-4">
          <p className="max-w-1/2 text-wrap">
            Join our mission to democratize AI technology, making it accessible and governed by the community, not just big corporations.
          </p>
          <Button variant="default" className="w-32 p-3 text-lg bg-green-500 hover:bg-green-700">Get Started</Button>
        </div>

		<div className="my-52 mx-32 grid grid-cols-3 gap-12">
			<AdvantageCard 
				title="Blockchain Authentication" 
				description="Utilize cryptographic keys for seamless and secure access without traditional logins." 
				Icon={SiHiveBlockchain}
			/>
			<AdvantageCard 
				title="Web3 Payments" 
				description="All transactions are conducted using Ethereum, ensuring a secure and decentralized payment gateway." 
				Icon={RiSecurePaymentLine}
			/>
			<AdvantageCard 
				title="Community-Driven Superdatasets" 
				description="Contribute to or utilize superdatasets that compensate contributors fairly, promoting a collaborative AI development environment." 
				Icon={BsGlobe2}
			/>
		</div>

		<section className="my-52 mx-32">
			<p className="text-md w-1/2">
				Vision was founded with the aim of shifting the control of AI technologies from big tech firms to the hands of individual developers and researchers. We are proud to have started this project at a hackathon, rapidly evolving to a fully functional marketplace within 48 hours.
			</p>
		</section>

        <section className="p-4 flex flex-col gap-2 items-center border-y border-2">
          <h2 className="text-xl font-bold">Get in Touch</h2>
          <p>Any questions? Reach out to our team or join our community forum to get more involved.</p>
        </section>
        
        <footer className="text-center py-4">
          © 2024 OpenMarket: Vision. All rights reserved.
        </footer>
      </ScrollArea>
    </main>
  );
}

function AdvantageCard({ title, description, Icon } : { title: string, description: string, Icon: IconType | null}) {
	return (
		<div className="p-6 rounded-lg border border-border bg-secondary shadow-sm flex flex-col gap-4 text-green-500">
			<div className="flex items-center gap-2">
				{ Icon && <Icon className="text-2xl"/> }
				<h4 className="text-xl font-bold">{title}</h4>
			</div>
			<p className="text-opacity-80 text-md text-white">{description}</p>
		</div>
	)
}

export default Home;
