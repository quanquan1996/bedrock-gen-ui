'use client'
import React from 'react'
import { memo } from "react"
import Email from "./gen-components/Email"
import CardList from './gen-components/CardList'
import ProductCard from './gen-components/ProductCard'
import { HorizontalScrollArea } from './gen-components/HorizontalScrollArea'
import { Bot } from 'lucide-react'

const componentMap = {
  Email: Email,
  CardList: CardList,
  ProductCard: ProductCard,
  HorizontalScrollArea: HorizontalScrollArea
}

function ChatAiMessage(props) {

  const renderComponent = (component) => {
    const { name, children = [], ...props } = component
    if (name) {
      return React.createElement(
        componentMap[name],
        props,
        ...children.map(item => renderComponent(item))
      )
    }
  }

  return (
    <div className="rounded-2xl py-4 pr-4 flex justify-center items-start gap-4 min-w-0">
      <div className="flex-shrink-0 rounded-full overflow-hidden">
        <Bot />
      </div>
      {/* <div className="flex-1 text-base whitespace-pre-line"> */}
      <div className="flex-1 min-w-0">
        {renderComponent(props.message.content.component)}
      </div>
    </div>
  )
}

export default memo(ChatAiMessage)
