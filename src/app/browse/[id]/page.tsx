import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCircleInfo } from "react-icons/fa6";
import { BsCpuFill } from "react-icons/bs";


export default function Page({ params } : { params: { id: string }}) {
    return (
        <main className="flex flex-col h-full p-4">
            <h2 className="font-bold text-xl mb-5">{params.id}</h2>
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-4 items-center">
                            <FaCircleInfo/> General Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit dolore ducimus eius minus earum, qui aliquid maiores provident architecto nulla voluptates unde asperiores beatae officia tempora! Odit eum porro nesciunt?
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-4 items-center">
                            <BsCpuFill />
                            Technical Aspects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li>Input:</li>
                            <li>Output:</li>
                            <li>Neurons:</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}