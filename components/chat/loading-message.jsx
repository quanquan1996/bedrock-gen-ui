'use client'
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"

export default function ChatLoadingMessage() {
  return (
    <div className="rounded-2xl py-4 px-4 flex items-center space-x-4">
      {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
      <div className="rounded-full overflow-hidden">
        <Image
          src='/godfather.jpg'
          alt='Godfather Image'
          width={32}
          height={32}
        />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
