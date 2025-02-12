import * as React from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function HorizontalScrollArea({ children }) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
