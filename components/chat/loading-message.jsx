'use client'
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import { Bot } from "lucide-react"

export default function ChatLoadingMessage() {
  return (
    <div className="rounded-2xl py-4 pr-4 flex justify-center items-start gap-4 min-w-0">
      {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
      <div className="flex-shrink-0 rounded-full overflow-hidden">
        <Bot />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
