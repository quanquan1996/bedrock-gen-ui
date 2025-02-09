'use client'

import { memo } from "react"

function ChatUserMessage(props) {
  const { message } = props
  return (
    <div className="whitespace-pre-line flex justify-start items-center flex-row-reverse lg:ml-48 ml-8">
      <div className="bg-secondary rounded-3xl text-base px-4 py-2">
        {message.content}
      </div>
    </div>
  )
}

export default memo(ChatUserMessage)
