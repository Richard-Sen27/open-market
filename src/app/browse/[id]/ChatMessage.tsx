import { cn } from "@/lib/utils";

export default function ChatMessasge({ message, type } : { message: string, type: "sent" | "recieved"}) {
    return (
        <div className={cn("max-w-[80%] bg-secondary rounded-xl p-2", type === "sent" ? "ml-auto rounded-br-none" : "mr-auto rounded-bl-none")}>
            {message}
        </div>
    )
}