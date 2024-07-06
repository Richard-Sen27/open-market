"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FormEvent, useState } from "react";
import { IoChatboxEllipses, IoSend } from "react-icons/io5";

import Replicate from "replicate";
import ChatMessasge from "./ChatMessage";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const requestChat = async (prompt: string) => {
    // e.preventDefault()
    const input = {
        top_k: 0,
        top_p: 0.95,
        prompt: prompt,
        max_tokens: 512,
        temperature: 0.7,
        system_prompt: "You are a helpful assistant",
        length_penalty: 1,
        max_new_tokens: 512,
        stop_sequences: "<|end_of_text|>,<|eot_id|>",
        prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
        presence_penalty: 0,
        log_performance_metrics: false
      };

      let result = ''
      
      for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", { input })) {
        console.log(event.toString());
        result += event.toString()
        // process.stdout.write(event.toString());
      };

      console.log("result: ",result)
}

const testString = "Johnny has 8 billion parameters. His friend Tommy has 70 billion parameters. What does this mean when it comes to speed?"

export default function Chat() {
    const [chat, setChat] = useState<{message: string, type: "sent" | "recieved"}[]>([])
    const [prompt, setPrompt] = useState('')

    const handleSend = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setChat([...chat, {message: prompt, type: "sent"}])
        setPrompt('')
        // requestChat(testString)
        setTimeout(echo, 1000)
    }

    const echo = () => {
        setChat((old) => [...old, {message: "ECHO", type: "recieved"}])
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-4 items-center"><IoChatboxEllipses/>Dataset Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <ScrollArea className="h-96">
                    <ScrollBar orientation="vertical"/>
                    <div className="flex flex-col gap-y-2">
                        {
                            chat.map((message, index) => (
                                <ChatMessasge key={index} message={message.message} type={message.type}/>
                            ))
                        }
                    </div>
                </ScrollArea>
                <form className="flex gap-4" onSubmit={handleSend}>
                    <Input id="prompt" name="prompt" placeholder="Type a message..." className="w-full" value={prompt} onChange={e => setPrompt(e.target.value)}/>
                    <Button className="text-xl" type="submit"><IoSend /></Button>
                </form>
            </CardContent>
        </Card>
    )
}