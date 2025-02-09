'use client'
import { Bot } from "lucide-react"
import Image from "next/image"
// import Markdown from '@/components/Markdown'
import { memo } from "react"

function ChatAiMessage(props) {
  console.log(111)
  const { message } = props
  return (
    <div className="rounded-2xl py-4 pr-4 flex justify-center items-start gap-4 min-w-0">
      <div className="flex-shrink-0 rounded-full overflow-hidden">
        <Bot />
        {/* <Image */}
        {/*   src='/godfather.jpg' */}
        {/*   alt='Godfather Image' */}
        {/*   width={32} */}
        {/*   height={32} */}
        {/* /> */}
      </div>
      {/* <div className="flex-1 text-base whitespace-pre-line"> */}
      <div className="flex-1 min-w-0">
        {message.content}
      </div>
    </div>
  )
}

export default memo(ChatAiMessage)
