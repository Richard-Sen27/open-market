import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Filter from "./Filter";
import { MdFileUpload, MdDashboard } from "react-icons/md";


export default function Navbar() {
    return (
        <nav className="w-[430px] flex flex-col justify-between gap-4 h-full relative">
            <div>
                <h1 className="p-4 text-2xl font-bold">Open Market</h1>
                <Separator orientation="horizontal" className="h-[1.5px]"/>
                <ul className="p-4 mt-2 flex flex-col gap-4">
                    <Input type="text" placeholder="Search for models" />
                    <Filter />
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 mx-4 mb-2">
                    <Button className="w-full flex justify-center gap-2" variant="outline">
                        <MdFileUpload className="text-primary text-lg"/> 
                        Upload Model
                    </Button>
                    <Button className="w-full flex justify-center gap-2" variant="outline">
                    <MdDashboard className="text-primary text-lg"/>
                        View Uploads
                    </Button>
                </div>
                <Separator orientation="horizontal" className="h-[1.5px]"/>
                <div className="p-4">
                    &copy; 2024 Open Market
                </div>
            </div>
            {/* <div className="-z-10 absolute w-1/3 h-2/3 top-1/2 left-1/2 rotate-6 blur-3xl -translate-x-1/2 -translate-y-1/2 bg-green-500"/> */}
        </nav>
    );
}