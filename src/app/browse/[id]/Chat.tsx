"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FormEvent, useEffect, useState } from "react";
import { IoChatboxEllipses, IoSend } from "react-icons/io5";

import ChatMessasge from "./ChatMessage";
import LoadingComponent from "@/components/LoadingComponent";


export default function Chat() {
    const [chat, setChat] = useState<{message: string, type: "sent" | "recieved" | "error"}[]>([])
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSend = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (prompt === '') return

        setChat([...chat, {message: prompt, type: "sent"}])
        
        setLoading(true)
        await requestMessage()
        setLoading(false)
        
        setPrompt('')
    }

    const requestMessage = async () => {

        const key = process.env.NEXT_PUBLIC_REP_API_TOKEN

        if (!key) {
            setChat((old) => [...old, {message: "API key not found", type: "error"}])
            return
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",  key);

        const raw = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                "role": "user",
                "content": prompt
                }
            ],
            "temperature": 1
        });

        try {
            const res = await fetch("https://api.red-pill.ai/v1/chat/completions", {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            })
            const data = await res.json()
            const message = data.choices[0].message.content
            console.log(data)
            setChat((old) => [...old, {message: message, type: "recieved"}])
        } catch (error) {
            console.error(error)
            setChat((old) => [...old, {message: "error", type: "recieved"}])
        }

    }

    const scroll = () => {
        const messages = document.querySelectorAll('.chat-message')
        const last = messages[messages.length - 1]
        if (last) last.scrollIntoView()
    }    

    useEffect(() => {
        scroll()
    }, [chat])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-4 items-center"><IoChatboxEllipses/>Dataset Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <ScrollArea id="chat-area" className="h-96 scroll-smooth">
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
                    <Button className="text-xl" type="submit" disabled={prompt.length === 0}>
                        {
                            loading ? 
                                <LoadingComponent /> :
                                <IoSend />
                        }
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}