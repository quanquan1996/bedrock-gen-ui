import { ScrollArea } from "@/components/ui/scroll-area"

export default function CardList({ children }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
      {children}
    </div>
  )
}
