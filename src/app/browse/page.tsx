import ModelCard from "@/components/ModelCard";

const content = [
  {
    title: "Model 1",
    author: "Author 1",
    description: "This is a model",
    image: "https://cdn2.iconfinder.com/data/icons/communication-media-vol-1/512/cpu_hardware_computer_processor-1024.png",
  },
  {
    title: "Model 2",
    author: "Author 2",
    description: "This is a model",
    image: "https://cdn4.iconfinder.com/data/icons/it-components-2/24/microchip_processor_chip_cpu_protect-512.png",
  },
  {
    title: "Model 3",
    author: "Author 3",
    description: "This is a model",
    image: "https://cdn3.iconfinder.com/data/icons/artificial-intelligence-ai-flat/64/cpu-die-main-board-performance-logic-256.png",
  },
  {
    title: "Model 4",
    author: "Author 4",
    description: "This is a model",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Model 5",
    author: "Author 5",
    description: "This is a model",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Model 6",
    author: "Author 6",
    description: "This is a model",
    image: "https://via.placeholder.com/150",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      <h2 className="font-bold text-xl">Browse Models</h2>
      <div className="flex flex-wrap mt-5 gap-5">
        {
          content.map((model) => (
            <ModelCard key={model.title} {...model}/>
          ))
        }
      </div>
    </main>
    );
}
