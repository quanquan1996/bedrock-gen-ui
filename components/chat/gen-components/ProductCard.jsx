import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from 'next/image'

export default function ProductCard({ id, image, title, price, description }) {
  console.log({ id, image, title, price, description })
  return (
    <Card key={id} className="flex flex-col">
      <CardHeader className="p-4">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-2">
        <CardTitle className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">{title}</CardTitle>
        <CardDescription className="mt-1 text-xs line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <span className="text-sm font-bold">${price}</span>
        <Button size="sm">Add</Button>
      </CardFooter>
    </Card>
  )
}
