import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ProductCard({ id, image, title, price, description }) {
  return (
    <Card key={id} className="flex flex-col w-[200px] shrink-0">
      <CardHeader className="p-4">
        <div className="w-full aspect-square mb-4 overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-2">
        <CardTitle className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">{title}</CardTitle>
        <CardDescription className="mt-1 text-xs line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <span className="text-sm font-bold">{price}</span>
        <Button size="sm">Add</Button>
      </CardFooter>
    </Card>
  )
}
