import { cn } from "@/lib/utils";

export default function ChatMessasge({ message, type } : { message: string, type: "sent" | "recieved" | "error"}) {
    return (
        <div className={cn("chat-message max-w-[80%] bg-secondary rounded-2xl py-2 px-4 text-wrap", 
            type === "sent" ? "ml-auto rounded-br-none" : 
            type === "recieved" ? "mr-auto rounded-bl-none" : "mr-auto rounded-bl-none text-red-500")}>
            {message}
        </div>
    )
}