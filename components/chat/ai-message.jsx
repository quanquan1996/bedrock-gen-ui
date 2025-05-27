'use client'
import { Bot } from "lucide-react"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'  // 引入react-markdown
import { memo } from "react"

function ChatAiMessage(props) {
    console.log(111)
    const { message } = props
    return (
        <div className="rounded-2xl py-4 pr-4 flex justify-center items-start gap-4 min-w-0">
            <div className="flex-shrink-0 rounded-full overflow-hidden">
                <Bot />
            </div>
            <div className="flex-1 min-w-0">
                <ReactMarkdown>
                    {message.content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default memo(ChatAiMessage)
