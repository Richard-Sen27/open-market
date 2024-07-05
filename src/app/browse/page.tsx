import ModelCard from "@/components/ModelCard";
import Pager from "@/components/Pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const content = [
  {
    title: "Model 1",
    author: "Author 1",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    price: 5,
    downloads: 234,
    image: "https://cdn2.iconfinder.com/data/icons/communication-media-vol-1/512/cpu_hardware_computer_processor-1024.png",
  },
  {
    title: "Model 2",
    author: "Author 2",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    price: 7,
    downloads: 544,
    image: "https://cdn4.iconfinder.com/data/icons/it-components-2/24/microchip_processor_chip_cpu_protect-512.png",
  },
  {
    title: "Model 3",
    author: "Author 3",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    price: 6,
    downloads: 125,
    image: "https://cdn3.iconfinder.com/data/icons/artificial-intelligence-ai-flat/64/cpu-die-main-board-performance-logic-256.png",
  },
  {
    title: "Model 4",
    author: "Author 4",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    price: 4,
    downloads: 312,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Model 5",
    author: "Author 5",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    price: 12,
    downloads: 95,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Model 6",
    author: "Author 6",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    price: 8,
    downloads: 316,
    image: "https://via.placeholder.com/150",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col h-full p-4">
      <h2 className="font-bold text-xl">Browse Models</h2>
      <ScrollArea className="h-full">
        <ScrollBar orientation="vertical"/>
        <div className="flex flex-wrap mt-5 gap-5">
          {
            content.map((model) => (
              <ModelCard key={model.title} {...model}/>
            ))
          }
        </div>
      </ScrollArea>
      <Pager />
    </main>
    );
}
