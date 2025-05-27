'use client'
import React from 'react'
import { memo } from "react"
import Email from "./gen-components/Email"
import CardList from './gen-components/CardList'
import ProductCard from './gen-components/ProductCard'
import HotelBookingForm from "@/components/chat/gen-components/HotelBooking";
import { HorizontalScrollArea } from './gen-components/HorizontalScrollArea'
import { Bot } from 'lucide-react'
import TableComponent from './gen-components/Table'
import ToolMessage from "@/components/chat/gen-components/ToolMessage";
import WorkFlowMessage from "@/components/chat/gen-components/WorkFlowMessage";
import EChartsMessage from "@/components/chat/gen-components/EChartsMessage";
const componentMap = {
  Email: Email,
  CardList: CardList,
  ProductCard: ProductCard,
  HorizontalScrollArea: HorizontalScrollArea,
  Table: TableComponent,
  HotelBookingForm: HotelBookingForm,
  ToolMessage: ToolMessage,
  WorkFlowMessage: WorkFlowMessage,
  EChartsMessage:EChartsMessage
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
