import { cn } from "@/lib/utils";

export default function ChatMessasge({ message, type } : { message: string, type: "sent" | "recieved"}) {
    return (
        <div className={cn("chat-message max-w-[80%] bg-secondary rounded-2xl py-2 px-4 text-wrap", type === "sent" ? "ml-auto rounded-br-none" : "mr-auto rounded-bl-none")}>
            {message}
        </div>
    )
}